import { Component } from 'solid-js';

type Props = {
  xp: number;
  setXp: (xp: number) => void;
};

export const QuestXpRewards: Component<Props> = props => {
  void props;
  return (
    <div style={{ padding: '15px' }}>
      <label
        style={{
          display: 'inline-block',
          float: 'left',
          clear: 'left',
          width: '180px',
          'text-align': 'right',
          'margin-right': '10px',
        }}
        for={`form_rewards_xp`}
      >
        rewards.xp
      </label>
      <input
        onInput={e => props.setXp(Number(e.currentTarget.value))}
        value={props.xp}
        type="number"
      />
    </div>
  );
};
