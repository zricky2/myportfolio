import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Home from './routes/Home'
import Stock from './routes/Stock'
import Learn from './routes/Learn'
import Signin from './routes/Signin'
import Register from './routes/Register'
import './styles/App.css';
import 'bulma/css/bulma.css';

function App() {
  return (
    <div className="container">
      <Router>
        <div className="hero is-info is-medium">
          <div className="hero-head">
            <div className="navbar is-transparent">
              <div className="container">
                <Link className="navbar-item" to="/"><h1>StockInfo</h1></Link>
                <Link className="navbar-item" to="/Learn"><div>Learn</div></Link>
                <Link className="navbar-item" to="/signin"><div>Sign-in</div></Link>
                <Link className="navbar-item" to="/register"><div>Register</div></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/learn" exact component={Learn} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/register" exact component={Register} />
            <Route path="/:symbol" component={Stock} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
