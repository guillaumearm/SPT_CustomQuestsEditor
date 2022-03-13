import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionPlaceItem } from '../../../types';
import { MissionUpdator } from './types';

type Props = {
  mission: DeepReadonly<MissionPlaceItem>;
  updateMission: MissionUpdator<MissionPlaceItem>;
};

export const MissionPlaceItemForm: Component<Props> = props => {
  void props;
  return <span>TODO: Mission {props.mission.type} form</span>;
};
