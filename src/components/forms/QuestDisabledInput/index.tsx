import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { QuestData, QuestUpdator } from '../../../types';

type Props = {
  formIndex: number;
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
};

export const QuestDisabledInput: Component<Props> = props => {
  const questEnabled = createMemo(() => {
    return !props.quest.disabled;
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
        for={`form_disabled`}
      >
        {'enabled: '}
      </label>
      <input
        tabIndex={props.formIndex}
        id="form_disabled"
        onChange={e => {
          props.updateQuest(q => ({ ...q, disabled: !e.currentTarget.checked }));
        }}
        type="checkbox"
        checked={questEnabled()}
      />
    </div>
  );
};
