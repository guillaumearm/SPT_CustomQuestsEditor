import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { LoadedJsonFile, QuestData } from '../../types';

type DownloadButtonProps = {
  tabIndex?: number;
  loadedJsonFiles: DeepReadonly<LoadedJsonFile[]>;
  selectedQuestFile: null | number;
};

const ignoreQuestsWithEmptyId = (data: DeepReadonly<QuestData[]>): DeepReadonly<QuestData[]> => {
  return data.filter(q => {
    return q.id !== '';
  });
};

const convertObjectToDataString = (data: DeepReadonly<QuestData[]>) => {
  const filteredData = ignoreQuestsWithEmptyId(data);

  return (
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredData, undefined, 4))
  );
};

export const DownloadButton: Component<DownloadButtonProps> = props => {
  const file = createMemo(() => props.loadedJsonFiles[props.selectedQuestFile ?? -1]);

  const fileName = createMemo(() => file()?.name ?? '');
  const fileData = createMemo(() => convertObjectToDataString(file()?.data ?? []));

  return (
    <a style={{}} download={fileName()} href={fileData()}>
      <button tabIndex={props.tabIndex} type="button">{`Download ${fileName()}`}</button>
    </a>
  );
};
