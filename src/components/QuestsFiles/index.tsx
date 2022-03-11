import { Component, For } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { LoadedJsonFile } from '../../types';
import { MainMenu, MainMenuItem } from '../MainMenu';

type Props = {
  loadedJsonFiles: DeepReadonly<LoadedJsonFile[]>;
  selectedFile: null | number;
  onClickFile: (index: number) => void;
};

const QuestsFiles: Component<Props> = props => {
  return (
    <MainMenu title="Quest files">
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
    </MainMenu>
  );
};

export default QuestsFiles;
