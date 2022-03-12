import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { QuestData, QuestUpdator } from '../../../types';
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
  uniqQuestId: string;
  fieldName: 'locked_by_quests' | 'unlock_on_quest_start';
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
  possibleValues?: string[];
};

export const QuestIdsForm: Component<Props> = props => {
  const [adding, setAdding] = createSignal(false);

  const questIds = createMemo(() => {
    return props.quest[props.fieldName] ?? [];
  });

  const uniqQuestId = createMemo(() => {
    return `${props.uniqQuestId}_${props.fieldName}`;
  });

  const possibleValues = createMemo(() => {
    return (props.possibleValues ?? []).filter(v => !questIds().includes(v));
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
        value="Add quest id..."
        onClick={() => {
          setAdding(true);
        }}
      />
      <div style={{ 'padding-left': '180px' }}>
        <Show when={adding()}>
          <QuestGenericDropdown
            formIndex={0}
            fieldName=""
            uniqQuestId={`${uniqQuestId()}_add_${props.fieldName}`}
            allValues={possibleValues()}
            value={'Select quest id...'}
            onSelectValue={v => {
              props.updateQuest(q => {
                setAdding(false);
                const questIds = q[props.fieldName] ?? [];
                return {
                  ...q,
                  [props.fieldName]: [v, ...questIds],
                };
              });
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
        <For each={questIds()}>
          {(questId, index) => (
            <QuestGenericDropdown
              formIndex={0}
              fieldName=""
              uniqQuestId={`${uniqQuestId()}_${index()}`}
              allValues={possibleValues()}
              value={questId}
              onSelectValue={v => {
                props.updateQuest(q => {
                  return {
                    ...q,
                    [props.fieldName]: q[props.fieldName]?.map((id, i) => (i === index() ? v : id)),
                  };
                });
              }}
            >
              <input
                style={{ display: 'inline-block', float: 'left' }}
                type="button"
                value="Remove"
                onClick={() => {
                  props.updateQuest(q => {
                    return {
                      ...q,
                      [props.fieldName]: q[props.fieldName]?.filter((_id, i) => i !== index()),
                    };
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
