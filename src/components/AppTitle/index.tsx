import { Component } from 'solid-js';

type AppTitleProps = { children: string };

export const AppTitle: Component<AppTitleProps> = props => {
  return (
    <h2
      style={{
        'text-align': 'center',
      }}
    >
      {props.children.toUpperCase()}
    </h2>
  );
};
