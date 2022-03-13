import { Component } from 'solid-js';

type Props = {
  value: number;
  setValue: (xp: number) => void;
  fieldName: string;
};

export const QuestNumberInput: Component<Props> = props => {
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
        {props.fieldName}
      </label>
      <input
        onInput={e => props.setValue(Number(e.currentTarget.value))}
        value={props.value}
        type="number"
      />
    </div>
  );
};
