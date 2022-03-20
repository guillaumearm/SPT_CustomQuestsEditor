import { pipe } from 'ramda';
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

const ignoreRewardsItemWithEmptyId = (
  data: DeepReadonly<QuestData[]>,
): DeepReadonly<QuestData[]> => {
  return data.map(quest => {
    if (quest.rewards && quest.rewards.items) {
      const newItems: Record<string, number> = {};

      const items = quest.rewards.items;
      Object.keys(items).forEach(itemId => {
        if (itemId !== '') {
          newItems[itemId] = items[itemId];
        }
      });

      return { ...quest, rewards: { ...quest.rewards, items: newItems } };
    }
    return quest;
  });
};

const ignoreAcceptedItemsWithEmptyId = (
  data: DeepReadonly<QuestData[]>,
): DeepReadonly<QuestData[]> => {
  return data.map(quest => {
    if (quest.missions) {
      const filteredMissions = quest.missions.map(m => {
        if ('accepted_items' in m) {
          return { ...m, accepted_items: m.accepted_items.filter(itemId => Boolean(itemId)) };
        }
        return m;
      });
      return { ...quest, missions: filteredMissions };
    }

    return quest;
  });
};

const filterData = (data: DeepReadonly<QuestData[]>): DeepReadonly<QuestData[]> => {
  return pipe(
    ignoreRewardsItemWithEmptyId,
    ignoreQuestsWithEmptyId,
    ignoreAcceptedItemsWithEmptyId,
  )(data);
};

const convertObjectToDataString = (data: DeepReadonly<QuestData[]>) => {
  const filteredData = filterData(data);

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
      <button tabIndex={props.tabIndex} className={'download-button'} type="button">{`Download ${fileName()}`}</button>
    </a>
  );
};
