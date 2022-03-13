import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionVisitPlace } from '../../../types';
import { MissionUpdator } from './types';

type Props = {
  mission: DeepReadonly<MissionVisitPlace>;
  updateMission: MissionUpdator<MissionVisitPlace>;
  onRemoveMission: () => void;
};

export const MissionVisitPlaceForm: Component<Props> = props => {
  void props;
  return (
    <>
      {props.children}
      <span>
        {props.children}TODO: Mission {props.mission.type} form
      </span>
    </>
  );
};
