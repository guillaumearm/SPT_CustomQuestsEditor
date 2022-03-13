import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionKill } from '../../../types';
import { QuestNumberInput } from '../QuestNumberInput';
import { MissionUpdator } from './types';

type Props = {
  mission: DeepReadonly<MissionKill>;
  updateMission: MissionUpdator<MissionKill>;
  onRemoveMission: () => void;
};

export const MissionKillForm: Component<Props> = props => {
  return (
    <>
      <h4 style={{ margin: 0, width: '90%', display: 'inline-block' }}>
        {props.mission.type} mission
      </h4>
      <input
        onClick={props.onRemoveMission}
        type="button"
        value="Remove"
        style={{ top: '0px', float: 'right' }}
      />
      <QuestNumberInput fieldName="count" value={props.mission.count ?? 0} setValue={console.log} />
      <QuestNumberInput fieldName="count" value={props.mission.count ?? 0} setValue={console.log} />
    </>
  );
};
