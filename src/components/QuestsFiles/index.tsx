import { Component, For } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { LoadedJsonFile } from '../../types';

const liStyle = (selected = false) => ({
  'margin-bottom': '1px',
  border: '1px solid grey',
  'text-align': 'center',
  cursor: 'pointer',
  'background-color': selected ? 'green' : 'inherit',
});

type QuestFilesProps = {
  loadedJsonFiles: DeepReadonly<LoadedJsonFile[]>;
  selectedFile: null | number;
  onClickFile: (index: number) => void;
};

const QuestsFiles: Component<QuestFilesProps> = props => {
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
              onClick={() => props.onClickFile(index())}
              style={liStyle(index() === props.selectedFile)}
            >
              {loadedJsonFile.name}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default QuestsFiles;
