import { Component, createSignal, Signal, For, Show, Accessor, createMemo } from 'solid-js';

import packageJson from '../package.json';
import { AppTitle } from './components/AppTitle';
import DndJsonHandler from './components/DndJsonHandler';

type LoadedJsonFile = {
  name: string;
  data: object;
};

const greyColor = '#737373';
const lightGreyColor = '#b3b3b3';

const convertObjectToDataString = (data: object) => {
  return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, undefined, 4));
};

const liStyle = (selected = false) => ({
  'margin-bottom': '1px',
  border: '1px solid grey',
  'text-align': 'center',
  cursor: 'pointer',
  'background-color': selected ? 'green' : 'inherit',
});

type QuestFilesProps = {
  loadedJsonFiles: LoadedJsonFile[];
  selectedQuestFileSignal: Signal<null | number>;
};

const QuestsFiles: Component<QuestFilesProps> = props => {
  const [selectedQuestFile, setSelectedQuestFile] = props.selectedQuestFileSignal;

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '1px',
        padding: '10px',
        width: '15%',
        height: '100%',
        'background-color': 'lightgrey',
        float: 'left',
      }}
    >
      <div style={{ 'text-align': 'center' }}>
        <h4>Quest files</h4>
      </div>
      <ul
        style={{
          margin: 0,
          padding: 0,
          'overflow-x': 'hidden',
          'white-space': 'nowrap',
        }}
      >
        <For each={props.loadedJsonFiles}>
          {(loadedJsonFile, index) => (
            <li
              onClick={() => setSelectedQuestFile(index)}
              style={liStyle(index() === selectedQuestFile())}
            >
              {loadedJsonFile.name}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

type DownloadButtonProps = {
  fileName: Accessor<string>;
  fileData: Accessor<string>;
};

const DownloadButton: Component<DownloadButtonProps> = props => {
  return (
    <a download={props.fileName()} href={props.fileData()}>
      <button type="button">{`Download ${props.fileName()} file`}</button>
    </a>
  );
};

const getDownloadButtonProps = (
  loadedJsonFiles: Accessor<LoadedJsonFile[]>,
  selectedQuestFile: Accessor<null | number>,
): DownloadButtonProps => {
  const file = createMemo(() => loadedJsonFiles()[selectedQuestFile() ?? -1]);

  const fileName = createMemo(() => file()?.name ?? '');
  const fileData = createMemo(() => convertObjectToDataString(file()?.data ?? {}));

  return { fileName, fileData };
};

const App: Component = () => {
  const selectedQuestFileSignal = createSignal<null | number>(null);
  const [selectedQuestFile, setSelectedQuestFile] = selectedQuestFileSignal;
  const [loadedJsonFiles, setLoadedJsonFiles] = createSignal<LoadedJsonFile[]>([]);
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
        onDropJson={(fileName, data) => {
          const files = loadedJsonFiles();
          const lastIndex = files.length;

          setLoadedJsonFiles([...files, { name: fileName, data }]);

          if (selectedQuestFile() === null) {
            // automatically set the selected quest if no selection
            setSelectedQuestFile(lastIndex);
          }
        }}
      />
      <QuestsFiles
        loadedJsonFiles={loadedJsonFiles()}
        selectedQuestFileSignal={selectedQuestFileSignal}
      />
      <Show when={selectedQuestFile() !== null}>
        <DownloadButton {...getDownloadButtonProps(loadedJsonFiles, selectedQuestFile)} />
      </Show>
    </div>
  );
};

export default App;
