import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionGiveItem } from '../../../types';
import { MissionUpdator } from './types';

type Props = {
  mission: DeepReadonly<MissionGiveItem>;
  updateMission: MissionUpdator<MissionGiveItem>;
  onRemoveMission: () => void;
};

export const MissionGiveItemForm: Component<Props> = props => {
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
