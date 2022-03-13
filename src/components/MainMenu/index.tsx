import { Component, createEffect, createMemo, createSignal, JSX, Match, Switch } from 'solid-js';

const liStyle = (selected = false, disabled = false) => {
  const getBackgroundColor = () => {
    if (disabled && selected) {
      return '#606060';
    }
    if (disabled) {
      return '#AAAAAA';
    }
    if (selected) {
      return '#303030';
    }

    return 'inherit';
  };

  const getColor = () => {
    if (disabled) {
      return 'inherit';
    }

    if (selected) {
      return 'white';
    }
    return 'inherit';
  };

  return {
    'margin-bottom': '1px',
    border: '1px solid grey',
    'text-align': 'center',
    cursor: 'pointer',
    'background-color': getBackgroundColor(),
    color: getColor(),
    'text-decoration': disabled ? 'line-through' : 'inherit',
  };
};

type Props = {
  title: string;
  children: JSX.Element;
  isDragging: boolean;
};

export const MainMenu: Component<Props> = props => {
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '1px',
        padding: '10px',
        width: '15%',
        height: '400px',
        'overflow-y': 'scroll',
        'background-color': props.isDragging ? '#505050' : 'lightgrey',
        float: 'left',
      }}
    >
      <div style={{ 'text-align': 'center' }}>
        <h4>{props.title}</h4>
      </div>
      <ul
        style={{
          margin: 0,
          padding: 0,
          'overflow-x': 'hidden',
          'white-space': 'nowrap',
        }}
      >
        {props.children}
      </ul>
    </div>
  );
};

type ItemProps = {
  index: number;
  onClick: () => void;
  selected: boolean;
  text: string;
  disabled?: boolean;
  enableEdition?: boolean;
  onEditEnter?: (text: string, index: number) => void;
};

export const MainMenuItem: Component<ItemProps> = props => {
  const [text, setText] = createSignal(props.text);
  const [editable, setEditable] = createSignal(
    Boolean(props.enableEdition && props.text === 'new_quest_file'),
  );

  const menuItemId = createMemo(() => {
    return `${props.index}_${Boolean(props.enableEdition)}`;
  });

  const editionOk = () => {
    props.onEditEnter?.(text(), props.index);
    setEditable(false);
  };

  createEffect(() => {
    const el = document.getElementById(menuItemId());
    if (el) {
      el.focus();
      (el as HTMLInputElement).select();
    }

    return editable();
  });

  return (
    <li
      ondblclick={() => props.enableEdition && !editable() && setEditable(true)}
      onClick={() => props.onClick()}
      style={liStyle(props.selected, !!props.disabled)}
    >
      <Switch>
        <Match when={editable()}>
          <input
            id={menuItemId()}
            style={{ width: '80%' }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                editionOk();
              }
            }}
            type="text"
            value={text()}
            onInput={e => setText(e.currentTarget.value)}
          />
          <input onClick={() => editionOk()} style={{ width: '15%' }} type="button" value="Ok" />
        </Match>
        <Match when={!editable()}>
          <span>{props.text}</span>
        </Match>
      </Switch>
    </li>
  );
};
