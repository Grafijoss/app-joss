import React, { Component } from 'react';
import './App.scss';
import Header from './components/header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header
          title='esto es una prueba'
        />
      </div>
    );
  }
}

export default App;
