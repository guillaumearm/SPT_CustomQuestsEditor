import { Component, JSX } from 'solid-js';

const liStyle = (selected = false, disabled = false) => ({
  'margin-bottom': '1px',
  border: '1px solid grey',
  'text-align': 'center',
  cursor: 'pointer',
  'background-color': selected ? 'green' : 'inherit',
  'text-decoration': disabled ? 'line-through' : 'inherit',
});

type Props = {
  title: string;
  children: JSX.Element;
};

export const MainMenu: Component<Props> = props => {
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '1px',
        padding: '10px',
        width: '15%',
        height: '100%',
        'background-color': 'lightgrey',
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
  onClick: () => void;
  selected: boolean;
  children: JSX.Element;
  disabled?: boolean;
};

export const MainMenuItem: Component<ItemProps> = props => {
  return (
    <li onClick={() => props.onClick()} style={liStyle(props.selected, !!props.disabled)}>
      {props.children}
    </li>
  );
};
