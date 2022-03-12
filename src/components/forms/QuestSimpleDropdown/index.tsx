import { Component, For } from 'solid-js';

export const ALL_TRADERS = [
  'prapor',
  'therapist',
  'fence',
  'skier',
  'peacekeeper',
  'mechanic',
  'ragman',
  'jaeger',
];

type Props = {
  fieldName: string;
  formIndex: number;
  values: string[];
  onValueChanged: (v: string) => void;
  selectedValue: string;
};

export const QuestSimpleDropdown: Component<Props> = props => {
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
      <select
        tabIndex={props.formIndex}
        onChange={e => props.onValueChanged(e.currentTarget.value)}
        style={{ display: 'inline-block', float: 'left', width: '180px' }}
      >
        <For each={props.values}>
          {v => (
            <option selected={v === props.selectedValue} value={v}>
              {v}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};
