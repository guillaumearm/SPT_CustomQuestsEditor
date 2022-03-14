import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionVisitPlace } from '../../../types';
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
      <span>
        {props.children}TODO: Mission {props.mission.type} form
      </span>
    </>
  );
};
