import { dropLast } from 'ramda';
import { Accessor, Component, For } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { LoadedJsonFile } from '../../types';
import { MainMenu, MainMenuItem } from '../MainMenu';

const removeJsonExt = (fileName: string): string => {
  const splitted = fileName.split('.json');

  if (splitted.length >= 2) {
    return dropLast(1, splitted).join('.json');
  }

  return fileName;
};

type Props = {
  isDragging: Accessor<boolean>;
  loadedJsonFiles: DeepReadonly<LoadedJsonFile[]>;
  selectedFile: null | number;
  onClickFile: (index: number) => void;
  onCreateNewFile: () => void;
  onEditFilename: (newFilename: string, index: number) => void;
};

const QuestsFiles: Component<Props> = props => {
  return (
    <MainMenu isDragging={props.isDragging()} title="Quest files">
      <For each={props.loadedJsonFiles}>
        {(loadedJsonFile, index) => (
          <MainMenuItem
            index={index()}
            enableEdition={true}
            selected={index() === props.selectedFile}
            onClick={() => props.onClickFile(index())}
            onEditEnter={props.onEditFilename}
            text={removeJsonExt(loadedJsonFile.name)}
          />
        )}
      </For>
      <div style={{ margin: '10px 0 10px 0' }}>
        <input onClick={() => props.onCreateNewFile()} type="button" value="Create new file..." />
      </div>
      {props.children}
    </MainMenu>
  );
};

export default QuestsFiles;
