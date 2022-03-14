import { Component, createMemo, Show } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import {
  MissionPlaceBeacon,
  MissionPlaceItem,
  MissionPlaceSignalJammer,
  MissionVisitPlace,
} from '../../../types';
import { MissionUpdator } from '../QuestMissionsForm/types';
import { QuestStringInput } from '../QuestStringInput';

type CompatibleMission =
  | MissionPlaceItem
  | MissionPlaceBeacon
  | MissionPlaceSignalJammer
  | MissionVisitPlace;

type Props = {
  uniqId: string;
  mission: DeepReadonly<CompatibleMission>;
  updateMission: MissionUpdator<CompatibleMission>;
};

export const MissionNeedSurviveInput: Component<Props> = props => {
  const needSurviveEnabled = createMemo(() => {
    if (props.mission.need_survive !== undefined && props.mission.need_survive !== 'null') {
      return true;
    }
    return false;
  });
  return (
    <>
      <label
        style={{
          display: 'inline-block',
          float: 'left',
          clear: 'left',
          width: '180px',
          'text-align': 'right',
          'margin-right': '10px',
        }}
        for={`form_disabled`}
      >
        {'need_survive: '}
      </label>
      <input
        id={`form_place_item_need_survive_${props.uniqId}`}
        onChange={e => {
          props.updateMission(q => {
            if (e.currentTarget.checked) {
              return { ...q, need_survive: '' };
            }
            return { ...q, need_survive: undefined };
          });
        }}
        type="checkbox"
        checked={needSurviveEnabled()}
      />
      <Show when={needSurviveEnabled()}>
        <QuestStringInput
          fieldName="survive message"
          formIndex={-1}
          uniqId={props.uniqId}
          questString={props.mission.need_survive}
          updateQuestString={fn =>
            props.updateMission(m => ({ ...m, need_survive: fn(m.need_survive) }))
          }
        />
      </Show>
    </>
  );
};
