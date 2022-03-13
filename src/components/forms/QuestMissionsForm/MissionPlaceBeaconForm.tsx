import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionPlaceBeacon } from '../../../types';
import { MissionUpdator } from './types';

type Props = {
  mission: DeepReadonly<MissionPlaceBeacon>;
  updateMission: MissionUpdator<MissionPlaceBeacon>;
  onRemoveMission: () => void;
};

export const MissionPlaceBeaconForm: Component<Props> = props => {
  void props;
  return <span>TODO: Mission {props.mission.type} form</span>;
};
