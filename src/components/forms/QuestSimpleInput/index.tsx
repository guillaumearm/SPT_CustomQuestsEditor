import { Component, createEffect } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { CustomQuest, QuestUpdator } from '../../../types';

type FieldNames = 'id';

type Props = {
  formIndex: number;
  fieldName: FieldNames;
  quest: DeepReadonly<CustomQuest>;
  updateQuest: QuestUpdator;
};

export const QuestSimpleInput: Component<Props> = props => {
  // autofocus is field when empty
  createEffect(() => {
    if (props.fieldName === 'id' && !props.quest.id) {
      const el = document.getElementById(`form_${props.fieldName}`);
      if (el) {
        el.focus();
      }
    }

    return props.quest.id;
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
        for={`form_${props.fieldName}`}
      >
        {props.fieldName}:{' '}
      </label>
      <input
        style={{ display: 'inline-block', float: 'left' }}
        onInput={e => props.updateQuest(q => ({ ...q, [props.fieldName]: e.currentTarget.value }))}
        value={props.quest[props.fieldName]}
        type="text"
        id={`form_${props.fieldName}`}
        tabIndex={props.formIndex}
      />
    </div>
  );
};
