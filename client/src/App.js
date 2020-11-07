import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './routes/Home'
import Stock from './routes/Stock'
import Learn from './routes/Learn'
import Signin from './routes/Signin'
import Register from './routes/Register'


function App() {
  return (
    <Router>
      <div>
        <Link to="/"><h1>StockInfo</h1></Link>
        <Link to="/Learn"><div>Learn</div></Link>
        <Link to="/signin"><div>Sign-in</div></Link>
        <Link to="/register"><div>Register</div></Link>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/learn" exact component={Learn} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/register" exact component={Register} />
        <Route path="/:symbol" component={Stock} />
      </Switch>
    </Router>
  );
}

export default App;
