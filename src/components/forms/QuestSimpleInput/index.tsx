import { Component, createEffect, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { CustomQuest, QuestUpdator } from '../../../types';
import { isSafeId } from '../../../helpers/quest-id-hash-convention';

type Props = {
  formIndex: number;
  quest: DeepReadonly<CustomQuest>;
  updateQuest: QuestUpdator;
};

export const QuestIdInput: Component<Props> = props => {
  // autofocus id field when empty
  createEffect(() => {
    if (!props.quest.id) {
      const el = document.getElementById(`form_id`);
      if (el) {
        el.focus();
      }
    }

    return props.quest.id;
  });

  const warnMessage = createMemo(() => {
    if (isSafeId(props.quest.id)) {
      return '';
    }

    return "surroud your id with '#'";
  });

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
        for={`form_id`}
      >
        id:{' '}
      </label>
      <input
        style={{ display: 'inline-block', float: 'left' }}
        onInput={e => props.updateQuest(q => ({ ...q, id: e.currentTarget.value }))}
        value={props.quest.id}
        type="text"
        id={`form_id`}
        tabIndex={props.formIndex}
      />
      <span
        style={{
          color: 'red',
          display: 'inline-block',
          float: 'left',
          'margin-left': '4px',
        }}
      >
        {warnMessage}
      </span>
    </div>
  );
};
