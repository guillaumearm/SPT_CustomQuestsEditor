import { remove, update } from 'ramda';
import { Component, For } from 'solid-js';
import { QuestItemInput } from '../QuestItemInput';

type ItemIds = readonly string[];

type Props = {
  items: ItemIds;
  updateItems: (fn: (r: ItemIds) => ItemIds) => void;
  uniqId: string;
};

export const MissionAcceptedItemsInput: Component<Props> = props => {
  return (
    <div style={{ padding: '15px' }}>
      <label
        style={{
          display: 'inline-block',
          // float: 'left',
          clear: 'left',
          width: '180px',
          'text-align': 'right',
          'margin-right': '10px',
          'margin-bottom': '10px',
        }}
      >
        {`accepted_items: `}
      </label>
      <input
        onClick={() => {
          props.updateItems(items => [...items, '']);
        }}
        type="button"
        value="Add item"
      />
      <For each={props.items}>
        {(itemId, i) => (
          <QuestItemInput
            index={i()}
            fieldName=""
            uniqQuestId={`${props.uniqId}_${i()}`}
            value={itemId}
            onChange={newId => {
              props.updateItems(items => {
                return update(i(), newId, items);
              });
            }}
            onRemove={() => {
              props.updateItems(items => {
                return remove(i(), 1, items);
              });
            }}
          />
        )}
      </For>
    </div>
  );
};
