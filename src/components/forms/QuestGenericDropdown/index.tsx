import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from 'solid-js';

type Props = {
  paddingValue?: number;
  formIndex: number;
  allValues: string[];
  value: string;
  setValue?: (v: string) => void;
  uniqQuestId: string;
  fieldName?: string;
  onSelectValue?: (v: string) => void;
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

    props.setValue?.(value);
    props.onSelectValue?.(value);
  };

  const idInputText = createMemo(() => {
    return `form_generic_dropdown_id_${props.fieldName}_${props.formIndex}`;
  });

  const selectValue = () => {
    const el = document.getElementById(idInputText());
    if (el) {
      props.onSelectValue?.((el as HTMLInputElement).value);
    }
    setAdding(false);
  };

  return (
    <div style={{ padding: props.paddingValue ? `${props.paddingValue}px` : '15px' }}>
      <Show when={Boolean(props.fieldName)}>
        <label
          style={{
            display: 'inline-block',
            float: 'left',
            clear: 'left',
            width: '180px',
            'text-align': 'right',
            'margin-right': '10px',
          }}
          for={idInputText()}
        >
          {`${props.fieldName}: `}
        </label>
      </Show>

      <Switch>
        <Match when={adding()}>
          <input
            autofocus={true}
            style={{ display: 'inline-block', float: 'left', width: '180px' }}
            onInput={e => {
              const value = e.currentTarget.value;
              if (value) {
                props.setValue?.(value);
              }
            }}
            type="text"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                selectValue();
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
              selectValue();
            }}
          />
        </Match>
        <Match when={!adding()}>
          <select
            onChange={onSelectChange}
            style={{ display: 'inline-block', float: 'left', width: '180px' }}
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
            value="Edit manually..."
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
      {props.children}
    </div>
  );
};
