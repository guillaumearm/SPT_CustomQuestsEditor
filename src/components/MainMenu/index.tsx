import { Component, JSX } from 'solid-js';

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
