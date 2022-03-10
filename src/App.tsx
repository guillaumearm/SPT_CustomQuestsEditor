import { Component, createSignal, Show } from 'solid-js';

import packageJson from '../package.json';
import { AppTitle } from './components/AppTitle';
import DndJsonHandler from './components/DndJsonHandler';

const greyColor = '#737373';
const lightGreyColor = '#b3b3b3';

const App: Component = () => {
  const [downloadFilename, setDownloadFilename] = createSignal<null | string>(null);
  const [downloadLink, setDownloadLink] = createSignal<null | string>(null);
  const isDraggingSignal = createSignal(false);
  const [isDragging] = isDraggingSignal;

  return (
    <div
      style={{
        height: '100vh',
        'background-color': isDragging() ? greyColor : lightGreyColor, //light grey
      }}
    >
      <AppTitle>{`Custom Quests Editor v${packageJson.version}`}</AppTitle>
      <DndJsonHandler
        isDraggingSignal={isDraggingSignal}
        onDropJson={(fileName, data) => {
          const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(data, undefined, 4));

          setDownloadFilename(fileName);
          setDownloadLink(dataStr);
        }}
      />
      <Show when={downloadLink() !== null}>
        <a download={downloadFilename()} href={downloadLink() || ''}>
          <button type="button">{`Download ${downloadFilename()} file`}</button>
        </a>
      </Show>
    </div>
  );
};

export default App;
