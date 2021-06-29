import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Employees from './components/Employees'
import Customers from './components/Customers'
import Products from './components/Products'
import {Route, Switch, Redirect} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route
          exact path = '/'
          render={() => <Redirect to = '/public' />}
        />

        <Route
          path = '/public'
          render={() => <Home />}
        />

        <Route
          path='/customers'
          render={() => <Customers />}
        />

        <Route 
          path='/products'
          render={() => <Products />}
        />

        <Route 
          path='/employees'
          render={() => <Employees />}
        />
      </Switch>
    </div>
  );
}

export default App;