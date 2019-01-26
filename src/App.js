import React, { Component } from 'react';
import './App.scss';
import Face from './components/face'

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  data: {
		prueba: 'kjasghdjaghd hgj',
		prueba2: 'kjasghdjaghd hgj'
  }
}

const store = createStore(
  (state) => state,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log(store.getState())

class App extends Component {
  render() {
    return (
      <div className="App">
				<Provider store={store}>
        	<Face />
				</Provider>
      </div>
    );
  }
}

export default App;
