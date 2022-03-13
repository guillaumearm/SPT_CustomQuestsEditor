import { Component, For } from 'solid-js';
import { MissionType, VALID_MISSION_TYPES } from '../../../helpers/mission_validation';

type MissionProps = {
  onClickType: (missionType: MissionType) => void;
};

export const ChooseMissionType: Component<MissionProps> = props => {
  return (
    <div
      style={{
        'margin-bottom': '5px',
        padding: '15px',
        'background-color': '#333333',
        color: 'white',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          'margin-right': '10px',
          'margin-bottom': '10px',
        }}
      >
        Choose a type of mission:
      </span>
      <div>
        <For each={VALID_MISSION_TYPES}>
          {missionType => {
            return (
              <input
                onClick={() => props.onClickType(missionType)}
                style={{ 'margin-right': '13px' }}
                type="button"
                value={missionType}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
};
