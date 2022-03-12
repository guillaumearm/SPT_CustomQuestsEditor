import { Component, createEffect, createMemo, createSignal, For, Match, Switch } from 'solid-js';

type Props = {
  formIndex: number;
  allValues: string[];
  value: string;
  setValue: (v: string) => void;
  uniqQuestId: string;
  fieldName: string;
};

type SelectEvent = Event & { target: Element; currentTarget: HTMLSelectElement };

export const QuestGenericDropdown: Component<Props> = props => {
  const [adding, setAdding] = createSignal(false);

  createEffect(prev => {
    if (prev !== props.uniqQuestId) {
      setAdding(false);
    }

    return props.uniqQuestId;
  });

  const values = createMemo(() => {
    const result = [...props.allValues];

    if (!result.includes(props.value)) {
      result.push(props.value);
    }

    return result;
  });

  const onSelectChange = (e: SelectEvent) => {
    const value = e.currentTarget.value;

    props.setValue(value);
  };

  const idInputText = createMemo(() => {
    return `form_generic_dropdown_id_${props.fieldName}_${props.formIndex}`;
  });

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
        for={idInputText()}
      >
        {`${props.fieldName}: `}
      </label>

      <Switch>
        <Match when={adding()}>
          <input
            autofocus={true}
            style={{ display: 'inline-block', float: 'left' }}
            onInput={e => {
              const value = e.currentTarget.value;
              if (value) {
                props.setValue(value);
              }
            }}
            type="text"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                setAdding(false);
              }
            }}
            id={idInputText()}
            tabIndex={props.formIndex}
          />
          <input
            style={{ display: 'inline-block', float: 'left' }}
            type="button"
            tabIndex={props.formIndex + 1}
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
            tabIndex={props.formIndex}
          >
            <For each={values()}>
              {v => (
                <option selected={v === props.value} value={v}>
                  {v}
                </option>
              )}
            </For>
          </select>
          <input
            tabIndex={props.formIndex + 1}
            type="button"
            value="Add manually..."
            style={{ display: 'inline-block', float: 'left' }}
            onClick={() => {
              setAdding(true);
              const el = document.getElementById(idInputText());
              if (el) {
                el.focus();
              }
            }}
          />
        </Match>
      </Switch>
    </div>
  );
};
