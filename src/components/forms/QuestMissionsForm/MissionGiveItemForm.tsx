import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionGiveItem } from '../../../types';
import { MissionUpdator } from './types';

type Props = {
  mission: DeepReadonly<MissionGiveItem>;
  updateMission: MissionUpdator<MissionGiveItem>;
};

export const MissionGiveItemForm: Component<Props> = props => {
  void props;
  return <span>TODO: Mission {props.mission.type} form</span>;
};
