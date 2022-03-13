import { Component } from 'solid-js';

type AppTitleProps = { children: string; customQuestsVersion: string };

export const AppTitle: Component<AppTitleProps> = props => {
  return (
    <>
      <h2
        style={{
          'text-align': 'center',
        }}
      >
        {props.children}
      </h2>
      <h4
        style={{
          position: 'absolute',
          margin: 0,
          right: '10px',
          top: '6px',
        }}
      >
        For{' '}
        <a
          target="_blank"
          style={{ color: 'blue' }}
          href="https://hub.sp-tarkov.com/files/file/517-custom-quests/"
        >
          Custom Quests
        </a>{' '}
        v{props.customQuestsVersion}
      </h4>
    </>
  );
};
