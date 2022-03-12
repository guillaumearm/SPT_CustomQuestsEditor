import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { QuestData, QuestUpdator } from '../../../types';

type FieldNames = 'id' | 'trader_id';

type Props = {
  fieldName: FieldNames;
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
};

export const QuestSimpleInput: Component<Props> = props => {
  return (
    <div style={{ padding: '15px' }}>
      <label
        style={{
          display: 'inline-block',
          float: 'left',
          clear: 'left',
          width: '120px',
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
      />
    </div>
  );
};
