import React, { Component } from 'react';
import './App.scss';
import Face from './components/face'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header
          title='esto es una prueba'
        /> */}
        <Face />
      </div>
    );
  }
}

export default App;
