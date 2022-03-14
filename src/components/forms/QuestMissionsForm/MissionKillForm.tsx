import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { VALID_KILL_TARGETS } from '../../../helpers/mission_validation';
import { ALL_LOCATIONS, KillTarget, MissionKill, PossibleLocation } from '../../../types';
import { IdsForm } from '../IdsForm';
import { QuestNumberInput } from '../QuestNumberInput';
import { QuestSimpleDropdown } from '../QuestSimpleDropdown';
import { QuestStringInput } from '../QuestStringInput';
import { MissionUpdator } from './types';

type Props = {
  questId: string;
  index: number;
  mission: DeepReadonly<MissionKill>;
  updateMission: MissionUpdator<MissionKill>;
};

export const MissionKillForm: Component<Props> = props => {
  const selectedValue = createMemo(() => {
    return props.mission.target ?? 'Savage';
  });

  const missionCount = createMemo(() => {
    return props.mission.count ?? 1;
  });

  const uniqId = createMemo(() => {
    return `${props.questId}_mission_kill_${props.index}`;
  });

  const locations = createMemo(() => {
    return props.mission.locations ?? [];
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
      <QuestSimpleDropdown
        fieldName="target"
        formIndex={18}
        values={VALID_KILL_TARGETS}
        selectedValue={selectedValue()}
        onValueChanged={v => props.updateMission(m => ({ ...m, target: v as KillTarget }))}
      />
      <QuestNumberInput
        min={1}
        fieldName="count"
        value={missionCount()}
        setValue={c => props.updateMission(m => ({ ...m, count: c }))}
      />
      <IdsForm
        wordingButton="locations"
        possibleValues={ALL_LOCATIONS}
        values={locations()}
        updateValues={fn => {
          props.updateMission(m => {
            return {
              ...m,
              locations: fn(locations()) as PossibleLocation[],
            };
          });
        }}
        uniqId={uniqId()}
        fieldName="locations"
      />
    </>
  );
};
