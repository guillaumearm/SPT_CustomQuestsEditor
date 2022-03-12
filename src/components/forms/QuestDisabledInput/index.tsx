import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { QuestData, QuestUpdator } from '../../../types';

type Props = {
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
};

export const QuestDisabledInput: Component<Props> = props => {
  const questEnabled = createMemo(() => {
    return !props.quest.disabled;
  });

  return (
    <>
      <label
        style={{
          display: 'inline-block',
          float: 'left',
          clear: 'left',
          width: '120px',
          'text-align': 'right',
          'margin-right': '10px',
        }}
        for={`form_disabled`}
      >
        {'enabled: '}
      </label>
      <input
        onChange={e => {
          props.updateQuest(q => ({ ...q, disabled: !e.currentTarget.checked }));
        }}
        type="checkbox"
        checked={questEnabled()}
      />
    </>
  );
};
