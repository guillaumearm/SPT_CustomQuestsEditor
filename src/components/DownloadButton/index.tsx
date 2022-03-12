import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { LoadedJsonFile } from '../../types';

type DownloadButtonProps = {
  tabIndex?: number;
  loadedJsonFiles: DeepReadonly<LoadedJsonFile[]>;
  selectedQuestFile: null | number;
};

const convertObjectToDataString = (data: object) => {
  return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, undefined, 4));
};

export const DownloadButton: Component<DownloadButtonProps> = props => {
  const file = createMemo(() => props.loadedJsonFiles[props.selectedQuestFile ?? -1]);

  const fileName = createMemo(() => file()?.name ?? '');
  const fileData = createMemo(() => convertObjectToDataString(file()?.data ?? {}));

  return (
    <a download={fileName()} href={fileData()}>
      <button tabIndex={props.tabIndex} type="button">{`Download ${fileName()} file`}</button>
    </a>
  );
};
