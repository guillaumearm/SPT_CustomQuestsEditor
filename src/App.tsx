import { dropLast, equals, move, remove } from 'ramda';
import { Component, createEffect, createMemo, createSignal, Show } from 'solid-js';
import { createStore, DeepReadonly, SetStoreFunction, Store } from 'solid-js/store';

import packageJson from '../package.json';

import { AppTitle } from './components/AppTitle';
import DndJsonHandler from './components/DndJsonHandler';
import { DownloadButton } from './components/DownloadButton';
import { QuestForm } from './components/QuestForm';
import QuestsFiles from './components/QuestsFiles';
import QuestsList from './components/QuestsList';

import { checkQuestJsonData, isStoryCustomQuest } from './helpers/validation';

import { LoadedJsonFile, QuestUpdator } from './types';

const createEmptyQuest = () => ({
  id: '',
  trader_id: 'prapor',
});

const greyColor = '#737373';
const lightGreyColor = '#b3b3b3';

type State = {
  selections: {
    file: number | null;
    quest: number | null;
  };
  files: LoadedJsonFile[];
};

const initialState: State = {
  selections: {
    file: null,
    quest: 0,
  },
  files: [],
};

const getAllQuestIds = (files: DeepReadonly<LoadedJsonFile[]>): string[] => {
  const result: Record<string, boolean> = {};

  files.forEach(file => {
    file.data.forEach(quest => {
      result[quest.id] = true;
      quest.locked_by_quests?.forEach(qId => {
        result[qId] = true;
      });

      quest.unlock_on_quest_start?.forEach(qId => {
        result[qId] = true;
      });
    });
  });

  return Object.keys(result);
};

// Used for quest duplication

const getQuestNum = (questId: string) => {
  const splitted = questId.split('_');
  const lastString = splitted[splitted.length - 1];

  if (!equals(NaN, Number(lastString))) {
    return Number(lastString);
  }
  return null;
};

const getQuestIdWithoutNum = (questId: string) => {
  const splitted = questId.split('_');
  const lastString = splitted[splitted.length - 1];

  if (!equals(NaN, Number(lastString))) {
    return dropLast(1, splitted).join('_');
  }
  return null;
};

const getNewId = (id: string, questIds: string[]) => {
  let n = 0;
  const splitted = id.split('_');

  const lastString = splitted[splitted.length - 1];

  if (!equals(NaN, Number(lastString))) {
    const questIdWithoutNum = dropLast(1, splitted).join('_');
    n = Number(lastString);

    questIds.forEach(questId => {
      if (getQuestIdWithoutNum(questId) === questIdWithoutNum) {
        const num = getQuestNum(questId);
        if (num !== null && num > n) {
          n = num;
        }
      }
    });

    return questIdWithoutNum ? `${questIdWithoutNum}_${n + 1}` : String(n + 1);
  } else {
    questIds.forEach(questId => {
      if (getQuestIdWithoutNum(questId) === id) {
        const num = getQuestNum(questId);
        if (num !== null && num >= n) {
          n = num + 1;
        }
      }
    });
  }

  return id ? `${id}_${n}` : String(n);
};

function createLocalStore<T>(initState: T): [Store<T>, SetStoreFunction<T>] {
  const [state, setState] = createStore(initState);
  if (localStorage.CustomQuestsEditor) setState(JSON.parse(localStorage.CustomQuestsEditor));
  createEffect(() => (localStorage.CustomQuestsEditor = JSON.stringify(state)));
  return [state, setState];
}

const App: Component = () => {
  const [state, setState] = createLocalStore<State>(initialState);
  const isDraggingSignal = createSignal(false);
  const [isDragging] = isDraggingSignal;

  const getSelectedQuestIndex = createMemo(() => {
    return state.selections.quest;
  });

  const selectedFile = createMemo(() => {
    return state.files[state.selections.file ?? 0];
  });

  const selectedQuest = createMemo(() => {
    const f = selectedFile();

    if (f) {
      return f.data[state.selections.quest ?? 0];
    }
    return undefined;
  });

  const nbQuests = createMemo(() => {
    const file = selectedFile();

    if (file) {
      return file.data.length;
    }
    return 0;
  });

  const fileIsSelected = createMemo(() => {
    return state.selections.file !== null;
  });

  const updateQuest = createMemo(() => {
    const q = selectedQuest();
    const selectedFileIndex = state.selections.file;
    const selectedQuestIndex = state.selections.quest;

    if (q && selectedFileIndex !== null && selectedQuestIndex !== null) {
      const questUpdator: QuestUpdator = fn => {
        setState('files', selectedFileIndex, 'data', selectedQuestIndex, fn);
      };

      return questUpdator;
    }

    return undefined;
  });

  const addEmptyQuest = () => {
    const selectedFileIndex = state.selections.file;

    if (selectedFileIndex !== null) {
      const lastIndex = state.files[selectedFileIndex].data.length;

      setState('files', selectedFileIndex, 'data', quests => [...quests, createEmptyQuest()]);
      setState('selections', 'quest', lastIndex);
    }
  };

  const moveUp = () => {
    const questIndex = getSelectedQuestIndex();
    const selectedFileIndex = state.selections.file;

    if (selectedFileIndex !== null && questIndex !== null && questIndex > 0) {
      const savedQuestIndex = questIndex;

      setState('files', selectedFileIndex, 'data', quests => {
        setState('selections', 'quest', () => savedQuestIndex - 1);
        return move(questIndex, questIndex - 1)(quests);
      });
    }
  };

  const moveDown = () => {
    const questIndex = getSelectedQuestIndex();
    const selectedFileIndex = state.selections.file;

    if (selectedFileIndex !== null && questIndex !== null && questIndex < nbQuests() - 1) {
      const savedQuestIndex = questIndex;

      setState('files', selectedFileIndex, 'data', quests => {
        setState('selections', 'quest', () => savedQuestIndex + 1);
        return move(questIndex, questIndex + 1)(quests);
      });
    }
  };

  const removeQuest = () => {
    const questIndex = getSelectedQuestIndex();
    const selectedFileIndex = state.selections.file;

    if (selectedFileIndex !== null && questIndex !== null) {
      const savedQuestIndex = questIndex;

      setState('files', selectedFileIndex, 'data', quests => {
        if (savedQuestIndex === quests.length - 1) {
          const newQuestIndex = savedQuestIndex === 0 ? null : savedQuestIndex - 1;
          setState('selections', 'quest', () => newQuestIndex);
        }
        return remove(savedQuestIndex, 1, quests);
      });
    }
  };

  const duplicateQuest = () => {
    const questIndex = getSelectedQuestIndex();
    const selectedFileIndex = state.selections.file;

    if (selectedFileIndex !== null && questIndex !== null) {
      const quest = state.files[selectedFileIndex].data[questIndex];
      if (quest) {
        const allQuestIds = state.files[selectedFileIndex].data.map(q => q.id);
        const newId = getNewId(quest.id, allQuestIds);

        setState('files', selectedFileIndex, 'data', quests => [
          ...quests,
          { ...quest, id: newId },
        ]);
      }
    }
  };

  const removeQuestFile = () => {
    const selectedFileIndex = state.selections.file;

    if (selectedFileIndex !== null) {
      setState('files', files => {
        if (selectedFileIndex === files.length - 1) {
          const newFileIndex = selectedFileIndex === 0 ? null : selectedFileIndex - 1;
          setState('selections', 'file', () => newFileIndex);
        }
        return remove(selectedFileIndex, 1, files);
      });
    }
  };

  const editFilename = (newFilename: string, index: number) => {
    if (newFilename) {
      setState('files', index, 'name', `${newFilename}.json`);
    }
  };

  const createNewFile = () => {
    const lastIndex = state.files.length;

    setState('files', files => [...files, { name: 'new_quest_file.json', data: [] }]);
    setState('selections', 'file', lastIndex);
  };

  const allQuestIds = createMemo(() => {
    return getAllQuestIds(state.files);
  });

  const selectFile = (i: number) => {
    setState('selections', 'file', i);
  };

  const selectQuest = (i: number) => {
    setState('selections', 'quest', i);
  };

  return (
    <div
      style={{
        'overflow-x': 'scroll',
        'background-color': isDragging() ? greyColor : lightGreyColor,
        height: '100vh',
      }}
    >
      <AppTitle
        customQuestsVersion={packageJson.custom_quests_target_version}
      >{`Custom Quests Editor v${packageJson.version}`}</AppTitle>
      <DndJsonHandler
        isDraggingSignal={isDraggingSignal}
        onDropJson={(fileName, rawData) => {
          const files = state.files;
          const lastIndex = files.length;

          try {
            const storyItems = checkQuestJsonData(rawData);
            const customQuests = storyItems.filter(isStoryCustomQuest);

            setState('files', files => [...files, { name: fileName, data: customQuests }]);
          } catch (err) {
            console.warn(`Custom Quests Editor: Unable to load json quest file '${fileName}'`);
            console.error(`${err}`);
            return;
          }

          // automatically set the selected quest file if nothing is selected
          if (state.selections.file === null) {
            selectFile(lastIndex);
          }
        }}
      />
      <QuestsFiles
        onEditFilename={editFilename}
        onCreateNewFile={createNewFile}
        isDragging={isDragging}
        onClickFile={selectFile}
        loadedJsonFiles={state.files}
        selectedFile={state.selections.file}
      >
        <Show when={fileIsSelected()}>
          <DownloadButton
            tabIndex={-1}
            loadedJsonFiles={state.files}
            selectedQuestFile={state.selections.file}
          />
        </Show>
      </QuestsFiles>

      <Show when={fileIsSelected()}>
        <QuestsList
          onRemoveQuestFile={removeQuestFile}
          onCreateNewQuest={addEmptyQuest}
          onClickQuest={selectQuest}
          file={selectedFile()}
          selectedQuest={state.selections.quest}
        />
      </Show>
      <Show when={selectedQuest() !== undefined && updateQuest()! !== undefined}>
        <QuestForm
          nbQuests={nbQuests()}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={removeQuest}
          onDupliacteQuest={duplicateQuest}
          allQuestIds={allQuestIds()}
          questIndex={getSelectedQuestIndex()}
          quest={selectedQuest()!}
          updateQuest={updateQuest()!}
        />
      </Show>
    </div>
  );
};

export default App;
