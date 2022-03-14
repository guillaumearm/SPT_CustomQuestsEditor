import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { MissionGiveItem } from '../../../types';
import { MissionUpdator } from '../QuestMissionsForm/types';

type CompatibleMissions = MissionGiveItem;

type Props = {
  formIndex?: number;
  mission: DeepReadonly<CompatibleMissions>;
  updateMission: MissionUpdator<CompatibleMissions>;
};

export const QuestFoundInRaidOnly: Component<Props> = props => {
  const foundInRaidOnly = createMemo(() => {
    return Boolean(props.mission.found_in_raid_only);
  });

  return (
    <div style={{ padding: '15px', 'padding-bottom': '0px' }}>
      <label
        style={{
          display: 'inline-block',
          float: 'left',
          clear: 'left',
          width: '180px',
          'text-align': 'right',
          'margin-right': '10px',
        }}
        for={`form_found_in_raid_only`}
      >
        {'found_in_raid_only: '}
      </label>
      <input
        tabIndex={props.formIndex}
        id="form_found_in_raid_only"
        onChange={e => {
          props.updateMission(m => ({ ...m, found_in_raid_only: e.currentTarget.checked }));
        }}
        type="checkbox"
        checked={foundInRaidOnly()}
      />
    </div>
  );
};
