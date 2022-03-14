import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionGiveItem } from '../../../types';
import { MissionAcceptedItemsInput } from '../MissionAcceptedItemsInput';
import { MissionUpdator } from './types';

type Props = {
  questId: string;
  index: number;
  mission: DeepReadonly<MissionGiveItem>;
  updateMission: MissionUpdator<MissionGiveItem>;
  onRemoveMission: () => void;
};

export const MissionGiveItemForm: Component<Props> = props => {
  const uniqId = createMemo(() => {
    return `${props.questId}_mission_kill_${props.index}`;
  });

  return (
    <>
      {props.children}
      <MissionAcceptedItemsInput
        updateItems={fn => {
          props.updateMission(m => ({ ...m, accepted_items: fn(m.accepted_items) }));
        }}
        items={props.mission.accepted_items}
        uniqId={uniqId()}
      />
    </>
  );
};
