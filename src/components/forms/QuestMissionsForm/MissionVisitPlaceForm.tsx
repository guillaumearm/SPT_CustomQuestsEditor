import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionVisitPlace } from '../../../types';
import { MissionNeedSurviveInput } from '../MissionNeedSurviveInput';
import { MissionPlaceIdInput } from '../MissionPlaceIdInput';
import { QuestStringInput } from '../QuestStringInput';
import { MissionUpdator } from './types';

type Props = {
  questId: string;
  index: number;
  mission: DeepReadonly<MissionVisitPlace>;
  updateMission: MissionUpdator<MissionVisitPlace>;
};

export const MissionVisitPlaceForm: Component<Props> = props => {
  void props;
  return (
    <>
      {props.children}
      <QuestStringInput
        formIndex={-1}
        updateQuestString={fn => props.updateMission(m => ({ ...m, message: fn(m.message) }))}
        uniqId={props.questId}
        questString={props.mission.message}
        fieldName="message"
      />
      <MissionPlaceIdInput mission={props.mission} updateMission={props.updateMission} />
      <br />
      <MissionNeedSurviveInput
        uniqId={props.questId}
        mission={props.mission}
        updateMission={fn =>
          props.updateMission(m => {
            return fn(m) as MissionVisitPlace;
          })
        }
      />
    </>
  );
};
