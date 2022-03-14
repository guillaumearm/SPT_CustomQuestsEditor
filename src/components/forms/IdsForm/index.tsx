import { Component, createMemo, createSignal, For, Show } from 'solid-js';

import { QuestGenericDropdown } from '../QuestGenericDropdown';

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
  editable?: boolean;
  wordingButton: string;
  uniqId: string;
  fieldName: 'locked_by_quests' | 'unlock_on_quest_start' | 'locations';
  values: readonly string[];
  updateValues: (fn: (values: readonly string[]) => readonly string[]) => void;
  possibleValues?: string[];
};

export const IdsForm: Component<Props> = props => {
  const [adding, setAdding] = createSignal(false);

  const uniqId = createMemo(() => {
    return `${props.uniqId}_${props.fieldName}`;
  });

  const possibleValues = createMemo(() => {
    return (props.possibleValues ?? []).filter(v => !props.values.includes(v));
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
      >
        {`${props.fieldName}: `}
      </label>
      <input
        type="button"
        tabIndex={-1}
        disabled={adding()}
        value={`Add ${props.wordingButton} id...`}
        onClick={() => {
          setAdding(true);
        }}
      />
      <div style={{ 'padding-left': '180px' }}>
        <Show when={adding()}>
          <QuestGenericDropdown
            editable={props.editable}
            formIndex={0}
            fieldName=""
            uniqId={`${uniqId()}_add`}
            allValues={possibleValues()}
            value={`Select ${props.wordingButton} id...`}
            onSelectValue={v => {
              setAdding(false);
              return props.updateValues(ids => [v, ...ids]);
            }}
          >
            <input
              style={{ display: 'inline-block', float: 'left' }}
              type="button"
              value="Cancel"
              onClick={() => {
                setAdding(false);
              }}
            />
          </QuestGenericDropdown>
        </Show>
        <For each={props.values}>
          {(questId, index) => (
            <QuestGenericDropdown
              editable={props.editable}
              formIndex={0}
              fieldName=""
              uniqId={`${uniqId()}_${index()}`}
              allValues={possibleValues()}
              value={questId}
              onSelectValue={v => {
                props.updateValues(values => {
                  return values.map((id, i) => (i === index() ? v : id));
                });
              }}
            >
              <input
                style={{ display: 'inline-block', float: 'left' }}
                type="button"
                value="Remove"
                onClick={() => {
                  return props.updateValues(values => {
                    return values.filter((_id, i) => i !== index());
                  });
                }}
              />
            </QuestGenericDropdown>
          )}
        </For>
      </div>
    </div>
  );
};
