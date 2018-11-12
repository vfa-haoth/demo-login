import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.showContain(routes)}
      </div>
    );
  }

  showContain = (routes) => {
    var result = null;

    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )
      })
    }

    return <Switch>{result}</Switch>;
  }
}

export default App;
