import { Component } from 'solid-js';

import packageJson from '../package.json';
import { AppTitle } from './components/AppTitle';

const App: Component = () => {
  return (
    <>
      <AppTitle>{`Custom Quests Editor v${packageJson.version}`}</AppTitle>
    </>
  );
};

export default App;
