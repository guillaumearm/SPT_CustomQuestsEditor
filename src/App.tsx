import { move, remove } from 'ramda';
import { Component, createMemo, createSignal, Show } from 'solid-js';
import { createStore, DeepReadonly } from 'solid-js/store';

import packageJson from '../package.json';

import { AppTitle } from './components/AppTitle';
import DndJsonHandler from './components/DndJsonHandler';
import { DownloadButton } from './components/DownloadButton';
import { QuestForm } from './components/QuestForm';
import QuestsFiles from './components/QuestsFiles';
import QuestsList from './components/QuestsList';

import { checkQuestJsonData } from './helpers/validation';

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

const App: Component = () => {
  const [state, setState] = createStore<State>(initialState);
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
      setState('files', selectedFileIndex, 'data', quests => [...quests, createEmptyQuest()]);
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
        if (savedQuestIndex === nbQuests() - 1) {
          setState('selections', 'quest', () => savedQuestIndex - 1);
        }
        return remove(savedQuestIndex, 1, quests);
      });
    }
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
      <AppTitle>{`Custom Quests Editor v${packageJson.version}`}</AppTitle>
      <DndJsonHandler
        isDraggingSignal={isDraggingSignal}
        onDropJson={(fileName, rawData) => {
          const files = state.files;
          const lastIndex = files.length;

          try {
            const data = checkQuestJsonData(rawData);
            setState('files', files => [...files, { name: fileName, data }]);
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
        isDragging={isDragging}
        onClickFile={selectFile}
        loadedJsonFiles={state.files}
        selectedFile={state.selections.file}
      />

      <Show when={state.selections.file !== null}>
        <QuestsList
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
          allQuestIds={allQuestIds()}
          questIndex={getSelectedQuestIndex()}
          quest={selectedQuest()!}
          updateQuest={updateQuest()!}
        />
      </Show>
      <Show when={state.selections.file !== null}>
        <DownloadButton
          tabIndex={-1}
          loadedJsonFiles={state.files}
          selectedQuestFile={state.selections.file}
        />
      </Show>
    </div>
  );
};

export default App;
