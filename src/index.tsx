import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Fatal: no div #root found in the DOM');
}

render(() => <App />, rootElement);
