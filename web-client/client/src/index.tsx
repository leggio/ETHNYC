import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createRoot } from 'react-dom/client';
import mainTheme from './themes/main';
import GlobalStyle from './themes/global/GlobalStyles';
import App from './app/App';

// const App = require('./app/App').default;
const container = document.querySelector('#root') as HTMLBRElement;
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
<ThemeProvider theme={mainTheme}>
  <GlobalStyle />
  <App />
</ThemeProvider>);
