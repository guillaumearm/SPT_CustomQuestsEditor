import { take } from 'ramda';
import { Component, createEffect, createMemo, createSignal, For, Show } from 'solid-js';

let ALL_TEMPLATES: (readonly [string, { Name: string }])[] = [];
let LOCALES_TEMPLATES: Record<string, { Name: string } | undefined> = {};

import('../../../assets/db/locales/global/en.json').then(enLocales => {
  const localesTemplates = enLocales.default.templates;
  LOCALES_TEMPLATES = localesTemplates;

  ALL_TEMPLATES = Object.keys(localesTemplates).map(
    k => [k, localesTemplates[k as keyof typeof localesTemplates]] as const,
  );
});

type Props = {
  index?: number;
  uniqQuestId: string;
  fieldName: string;
  onChange: (v: string) => void;
  value: string;
  count?: number;
  onCounterChanged?: (c: number) => void;
};

export const QuestItemInput: Component<Props> = props => {
  const [searchEnabled, setSearchEnabled] = createSignal(false);
  const [searchResults, setSearchResults] = createSignal<(readonly [string, string])[]>([]);

  const uniqId = createMemo(() => `${props.uniqQuestId}_${props.fieldName}_${String(props.index)}`);

  createEffect(() => {
    setSearchEnabled(false);
    setSearchResults([]);

    return uniqId();
  });

  const scrollToBottom = () => {
    const el = document.getElementById('quest_form');
    if (el) {
      setTimeout(() => {
        el.scrollTo(0, el.scrollHeight);
      }, 0);
    }
  };

  const nameItem = createMemo(() => {
    return LOCALES_TEMPLATES[props.value]?.Name ?? undefined;
  });

  return (
    <div style={{ padding: '15px', 'background-color': 'grey' }}>
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
        {props.fieldName ? `${props.fieldName} ` : ''}
      </label>
      <input
        title={nameItem()}
        placeholder="Type item id..."
        style={{ width: '320px' }}
        disabled={searchEnabled()}
        type="text"
        value={props.value}
        onChange={e => props.onChange(e.currentTarget.value)}
      />
      <Show when={props.onCounterChanged !== undefined}>
        <input
          onInput={e => props.onCounterChanged?.(Number(e.currentTarget.value))}
          style={{ width: '100px' }}
          value={props.count}
          type="number"
          min="0"
        />
      </Show>
      <input
        type="button"
        value={searchEnabled() ? 'Ok' : 'Search...'}
        onClick={() => {
          scrollToBottom();

          const enabled = searchEnabled();
          if (enabled) {
            setSearchResults([]);
          }
          setSearchEnabled(!enabled);
        }}
      />

      <Show when={searchEnabled()}>
        <div
          style={{
            display: 'inline-block',
            padding: '10px',
            'margin-top': '20px',
            'margin-left': '180px',
          }}
        >
          <input
            onInput={e => {
              const value = e.currentTarget.value;

              const searchResult = ALL_TEMPLATES.filter(([, template]) => {
                if (typeof template !== 'object') {
                  return false;
                }
                return template.Name.toLowerCase().includes(value.trim().toLowerCase());
              }).map(([id, template]) => [id, template.Name] as const);

              setSearchResults(take(50)(searchResult));
            }}
            type="text"
            placeholder="Search for item..."
          />
          <div style={{ padding: '10px' }}>
            <For each={searchResults()}>
              {([id, name]) => {
                return (
                  <div
                    onClick={() => props.onChange(id)}
                    style={{
                      cursor: 'pointer',
                      margin: '1px',
                      color: id === props.value ? 'white' : 'inherit',
                      'background-color': id === props.value ? 'green' : 'white',
                    }}
                  >
                    {name}
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};
