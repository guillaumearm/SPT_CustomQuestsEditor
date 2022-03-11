import { Component, createSignal, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import packageJson from '../package.json';

import { AppTitle } from './components/AppTitle';
import DndJsonHandler from './components/DndJsonHandler';
import { DownloadButton } from './components/DownloadButton';
import QuestsFiles from './components/QuestsFiles';

import { checkQuestJsonData } from './helpers/validation';

import { LoadedJsonFile } from './types';

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
    quest: null,
  },
  files: [],
};

const App: Component = () => {
  const [state, setState] = createStore<State>(initialState);
  const isDraggingSignal = createSignal(false);
  const [isDragging] = isDraggingSignal;

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

          // automatically set the selected quest if no selection
          if (state.selections.file === null) {
            setState('selections', 'file', lastIndex);
          }
        }}
      />
      <QuestsFiles
        onClickFile={i => {
          setState('selections', 'file', i);
        }}
        loadedJsonFiles={state.files}
        selectedFile={state.selections.file}
      />
      <Show when={state.selections.file !== null}>
        <DownloadButton loadedJsonFiles={state.files} selectedQuestFile={state.selections.file} />
      </Show>
    </div>
  );
};

export default App;
