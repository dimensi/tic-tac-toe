import * as React from 'react';
import { render } from 'react-dom';
import { createInspector } from 'effector-logger';

import App from './App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);

createInspector();
