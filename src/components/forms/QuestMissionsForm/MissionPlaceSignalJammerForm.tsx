import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionPlaceSignalJammer } from '../../../types';
import { MissionUpdator } from './types';

type Props = {
  mission: DeepReadonly<MissionPlaceSignalJammer>;
  updateMission: MissionUpdator<MissionPlaceSignalJammer>;
};

export const MissionPlaceSignalJammerForm: Component<Props> = props => {
  void props;
  return <span>TODO: Mission {props.mission.type} form</span>;
};
