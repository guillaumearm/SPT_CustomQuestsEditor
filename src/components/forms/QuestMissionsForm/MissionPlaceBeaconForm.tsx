import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionPlaceBeacon } from '../../../types';
import { MissionUpdator } from './types';

type Props = {
  questId: string;
  index: number;
  mission: DeepReadonly<MissionPlaceBeacon>;
  updateMission: MissionUpdator<MissionPlaceBeacon>;
};

export const MissionPlaceBeaconForm: Component<Props> = props => {
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
