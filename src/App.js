import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ChatHome from './pages/ChatHome'
import './stylesheets/sitewide.scss'

function App() {
  return (
          <Router>
            <div className="App flex-center">
              <Switch>
                <Route component={ChatHome} />
              </Switch>
            </div>
          </Router>
  );
}

export default App;
