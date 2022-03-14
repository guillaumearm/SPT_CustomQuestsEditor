import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionGiveItem } from '../../../types';
import { MissionAcceptedItemsInput } from '../MissionAcceptedItemsInput';
import { QuestFoundInRaidOnly } from '../QuestFoundInRaidOnly';
import { QuestNumberInput } from '../QuestNumberInput';
import { QuestStringInput } from '../QuestStringInput';
import { MissionUpdator } from './types';

type Props = {
  questId: string;
  index: number;
  mission: DeepReadonly<MissionGiveItem>;
  updateMission: MissionUpdator<MissionGiveItem>;
};

export const MissionGiveItemForm: Component<Props> = props => {
  const uniqId = createMemo(() => {
    return `${props.questId}_give_item_${props.index}`;
  });

  const missionCount = createMemo(() => {
    return props.mission.count ?? 0;
  });

  return (
    <>
      {props.children}
      <QuestStringInput
        formIndex={-1}
        updateQuestString={fn => props.updateMission(m => ({ ...m, message: fn(m.message) }))}
        uniqId={uniqId()}
        questString={props.mission.message}
        fieldName="message"
      />
      <QuestNumberInput
        fieldName="count"
        value={missionCount()}
        setValue={c => props.updateMission(m => ({ ...m, count: c }))}
      />
      <QuestFoundInRaidOnly mission={props.mission} updateMission={props.updateMission} />
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
