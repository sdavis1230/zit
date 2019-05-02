import React, { Component } from 'react';
import Answer from './components/answerbox';
import './App.css';




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Answer/>
        </header>
      </div>
    );
  }
}

export default App;
