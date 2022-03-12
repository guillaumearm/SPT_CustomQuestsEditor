import { Component, createMemo, createSignal, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import packageJson from '../package.json';

import { AppTitle } from './components/AppTitle';
import DndJsonHandler from './components/DndJsonHandler';
import { DownloadButton } from './components/DownloadButton';
import { QuestForm } from './components/QuestForm';
import QuestsFiles from './components/QuestsFiles';
import QuestsList from './components/QuestsList';

import { checkQuestJsonData } from './helpers/validation';

import { LoadedJsonFile, QuestUpdator } from './types';

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

  const selectFile = (i: number) => {
    setState('selections', 'file', i);
  };

  const selectQuest = (i: number) => {
    setState('selections', 'quest', i);
  };

  return (
    <div
      style={{
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
        onClickFile={selectFile}
        loadedJsonFiles={state.files}
        selectedFile={state.selections.file}
      />

      <Show when={state.selections.file !== null}>
        <QuestsList
          onClickQuest={selectQuest}
          file={selectedFile()}
          selectedQuest={state.selections.quest}
        />
        <DownloadButton
          tabIndex={-1}
          loadedJsonFiles={state.files}
          selectedQuestFile={state.selections.file}
        />
      </Show>
      <Show when={selectedQuest() !== undefined && updateQuest()! !== undefined}>
        <QuestForm
          questIndex={getSelectedQuestIndex()}
          quest={selectedQuest()!}
          updateQuest={updateQuest()!}
        />
      </Show>
    </div>
  );
};

export default App;
