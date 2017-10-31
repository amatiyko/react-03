import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router, browserHistory } from 'react-router'

import Layout from './Layout';

import Main from './Main';
import Detail from './Detail';
import Dropdown from './Dropdown';

const routes = (
  <Route path="/" component={Layout}>
    <Route path="main" component={Main} />
    <Route path="detail/:date" component={Detail} />
    <Route path="dropdown" component={Dropdown} />
  </Route>
);

const initial = [
  {
    trackName: "1",
    date: '1000',
  },
  {
    trackName: "2",
    date: '2000',
  }
];

const initialData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : initial;

function playlist(state = initialData, action) {
  if (action.type === 'ADD_TRACK') {
    return [
      ...state,
      action.payload,
    ];
  }
  if (action.type === 'DELETE_TRACK') {
      state.splice(action.payload, 1);
      return [...state];
  }
  if (action.type === 'SAVE_CHANGES') {
      var newState = [...state];
      newState.map(item => {
          if (item.date === action.payload.id) {
              item.date = action.payload.newDate;
              item.trackName = action.payload.newName;
          }
      });
      return newState;
  }
  return state;
}

const store = createStore(playlist);

store.subscribe(()=>{
   localStorage.setItem('data', JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
     />
  </Provider>,
  document.getElementById('root')
);