import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './App';
import Header from './components/Header';
import * as serviceWorker from './serviceWorker';

import './scss/app.scss';

//only for external Header  user check
const user = {
  // name: 'Admin',
  // avatar: null,
  // role: 'admin',
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Header user={user} />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
