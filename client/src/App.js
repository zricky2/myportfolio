import React from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import './App.css';
import Home from './routes/Home'
import Stock from './routes/Stock'
import Learn from './routes/Learn'


function App() {
  return (
    <Router>
      <div>
      <Link to="/"><h1>StockInfo</h1></Link>
      <Link to="/Learn">Learn</Link>
      </div>
      <Switch>
        <Route path="/" exact component= {Home} />
        <Route path="/learn" exact component= {Learn} />
        <Route path="/:symbol" component= {Stock} />
      </Switch>
    </Router>
  );
}

export default App;
