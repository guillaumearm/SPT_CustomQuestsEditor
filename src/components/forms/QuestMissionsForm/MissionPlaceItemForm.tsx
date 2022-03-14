import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionPlaceItem } from '../../../types';
import { MissionAcceptedItemsInput } from '../MissionAcceptedItemsInput';
import { MissionNeedSurviveInput } from '../MissionNeedSurviveInput';
import { MissionZoneIdInput } from '../MissionZoneIdInput';
import { QuestNumberInput } from '../QuestNumberInput';
import { QuestStringInput } from '../QuestStringInput';
import { MissionUpdator } from './types';

type Props = {
  questId: string;
  index: number;
  mission: DeepReadonly<MissionPlaceItem>;
  updateMission: MissionUpdator<MissionPlaceItem>;
};

export const MissionPlaceItemForm: Component<Props> = props => {
  const uniqId = createMemo(() => {
    return `${props.questId}_place_item_${props.index}`;
  });

  const missionPlantTime = createMemo(() => {
    return props.mission.plant_time ?? 30;
  });

  return (
    <>
      {props.children}

      <MissionZoneIdInput mission={props.mission} updateMission={props.updateMission} />
      <QuestStringInput
        formIndex={-1}
        updateQuestString={fn => props.updateMission(m => ({ ...m, message: fn(m.message) }))}
        uniqId={uniqId()}
        questString={props.mission.message}
        fieldName="message"
      />

      <QuestNumberInput
        fieldName="plant_time"
        value={missionPlantTime()}
        setValue={c => props.updateMission(m => ({ ...m, plant_time: c }))}
      />
      <MissionNeedSurviveInput
        uniqId={uniqId()}
        mission={props.mission}
        updateMission={props.updateMission}
      />
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
