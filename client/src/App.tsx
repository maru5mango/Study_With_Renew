import React from 'react';
import Router from './Routers';
import GlobalStyles from './Components/Common/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import Thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, Thunk))
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
