import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './aws-config'; // Import AWS configuration
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
