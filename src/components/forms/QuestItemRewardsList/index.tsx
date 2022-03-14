import { omit } from 'ramda';
import { Component, createMemo, Index } from 'solid-js';
import { produce } from 'solid-js/store';
import { QuestItemInput } from '../../forms/QuestItemInput';

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

type ItemRewards = Record<string, number>;

type Props = {
  updateRewards: (fn: (r: ItemRewards) => ItemRewards) => void;
  uniqQuestId: string;
  rewards: ItemRewards;
};

export const QuestItemRewardsList: Component<Props> = props => {
  const allItemIds = createMemo(() => {
    return Object.keys(props.rewards);
  });

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
        {`rewards.items: `}
      </label>
      <input
        onClick={() => {
          props.updateRewards(r => ({ ...r, ['']: 1 }));
        }}
        type="button"
        value="Add item"
      />
      <Index each={allItemIds()}>
        {(itemId, i) => (
          <QuestItemInput
            index={i}
            count={props.rewards[itemId()] ?? 1}
            onCounterChanged={v =>
              props.updateRewards(
                produce(r => {
                  r[itemId()] = v;
                  // return { ...r, [itemId()]: v };
                }),
              )
            }
            fieldName=""
            uniqQuestId={`${props.uniqQuestId}_${i}`}
            value={itemId()}
            onChange={newId => {
              props.updateRewards(
                produce(r => {
                  if (newId === itemId()) {
                    return;
                  }
                  if (r[newId]) {
                    r[newId] += r[itemId()];
                  } else {
                    r[newId] = r[itemId()];
                  }
                  delete r[itemId()];
                }),
              );
            }}
            onRemove={() => {
              props.updateRewards(items => {
                return omit([itemId()], items);
              });
            }}
          />
        )}
      </Index>
    </div>
  );
};
