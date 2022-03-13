import { Accessor, Component, For } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { LoadedJsonFile } from '../../types';
import { MainMenu, MainMenuItem } from '../MainMenu';

type Props = {
  isDragging: Accessor<boolean>;
  loadedJsonFiles: DeepReadonly<LoadedJsonFile[]>;
  selectedFile: null | number;
  onClickFile: (index: number) => void;
  onCreateNewFile: () => void;
};

const QuestsFiles: Component<Props> = props => {
  return (
    <MainMenu isDragging={props.isDragging()} title="Quest files">
      <For each={props.loadedJsonFiles}>
        {(loadedJsonFile, index) => (
          <MainMenuItem
            selected={index() === props.selectedFile}
            onClick={() => props.onClickFile(index())}
          >
            {loadedJsonFile.name}
          </MainMenuItem>
        )}
      </For>
      <div style={{ margin: '10px' }}>
        <input onClick={() => props.onCreateNewFile()} type="button" value="Create new file..." />
      </div>
    </MainMenu>
  );
};

export default QuestsFiles;
