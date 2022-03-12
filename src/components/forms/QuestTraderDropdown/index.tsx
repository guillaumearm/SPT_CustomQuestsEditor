import { Component, createEffect, createMemo, createSignal, For, Match, Switch } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { QuestData, QuestUpdator } from '../../../types';

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
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
};

type SelectEvent = Event & { target: Element; currentTarget: HTMLSelectElement };

export const QuestTraderDropdown: Component<Props> = props => {
  const [adding, setAdding] = createSignal(false);

  createEffect(prev => {
    if (prev !== props.quest.id) {
      setAdding(false);
    }

    return props.quest.id;
  });

  const questTraderId = createMemo(() => {
    return props.quest.trader_id;
  });

  const availableTraders = createMemo(() => {
    const result = [...ALL_TRADERS];

    if (!result.includes(questTraderId())) {
      result.push(questTraderId());
    }

    // if (newTraderId() && !result.includes(newTraderId())) {
    //   result.push(newTraderId());
    // }

    return result;
  });

  const onSelectChange = (e: SelectEvent) => {
    const value = e.currentTarget.value;

    if (value === 'add_trader') {
      setAdding(true);
    } else {
      props.updateQuest(q => ({ ...q, trader_id: value }));
    }
  };

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
        for={`form_trader_id`}
      >
        {'trader_id: '}
      </label>

      <Switch>
        <Match when={adding()}>
          <input
            style={{ display: 'inline-block', float: 'left' }}
            onInput={e => {
              const value = e.currentTarget.value;
              if (value) {
                props.updateQuest(q => ({ ...q, trader_id: value }));
              }
            }}
            type="text"
            id={`form_add_trader`}
          />
          <input
            style={{ display: 'inline-block', float: 'left' }}
            type="button"
            value="Ok"
            onClick={() => {
              setAdding(false);
            }}
          />
        </Match>
        <Match when={!adding()}>
          <select
            value="skier"
            onChange={onSelectChange}
            style={{ display: 'inline-block', float: 'left' }}
          >
            <For each={availableTraders()}>
              {traderId => (
                <option selected={traderId === props.quest.trader_id} value={traderId}>
                  {traderId}
                </option>
              )}
            </For>
          </select>
          <input
            type="button"
            value="Edit..."
            style={{ display: 'inline-block', float: 'left' }}
            onClick={() => {
              setAdding(true);
            }}
          />
        </Match>
      </Switch>
    </div>
  );
};
