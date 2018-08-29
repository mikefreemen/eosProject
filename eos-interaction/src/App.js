import React, { Component } from 'react';
import eosLogo from './eosLogo.gif'
import './App.css';

const { RecentBlocksWidget } = require('./RecentBlocksWidget')

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={eosLogo} className="App-logo" alt="logo" />
          <h1 className="App-title">Most Recent EOS Blocks</h1>
        </header>
        <div className='container'>
          <RecentBlocksWidget />
        </div>
      </div>
    );
  }
}

export default App;
