import React from 'react';

import './App.css';

import Poem from "./components/Poem";


function App() {

    


  return (
    <div className="App">
      <header className="App-header">
        <h1>An Emotional Machine</h1>        
      </header>

      <div className="row">        
          <Poem />
      </div>
    </div>
  );
}

export default App;
