import React, { Component } from 'react';
import './App.scss';
import Face from './components/face'
import Menuicons from './components/menuicons'
import Prueba from './components/prueba'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import reducer from './reducers/data'

const initialState = {
	aniStep: 0,
	openRight: false
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  render() {
    return (
			<Router>
				<div className="App">
					<Provider 
					store={store}>
						<Face />
						<Menuicons />
						<Route path="/prueba" component={Prueba} />
					</Provider>
				</div>
			</Router>
    );
  }
}

export default App;
