import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import RouteConfig from './containers/RouteConfig';
import { store } from './redux/store';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RouteConfig />
      </Provider>
    </BrowserRouter>
  )
}

export default App