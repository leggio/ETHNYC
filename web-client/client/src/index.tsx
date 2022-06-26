import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import mainTheme from './themes/main';
import GlobalStyle from './themes/global/GlobalStyles';

const render = () => {
  const App = require('./app/App').default;

  ReactDOM.render(
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>,
    document.querySelector('#root') as HTMLBRElement
  );
};

render();
