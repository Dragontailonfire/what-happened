import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
