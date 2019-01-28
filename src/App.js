import React, { Component } from 'react';
import './App.scss';
import Face from './components/face'
import Menuicons from './components/menuicons'

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers/data'

const initialState = {
  data: {
		// ...data,
  },
	aniStep: 0
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  render() {
    return (
      <div className="App">
				<Provider store={store}>
        	<Face />
					<Menuicons />
				</Provider>
      </div>
    );
  }
}

export default App;
