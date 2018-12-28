import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Toolbar from "./components/Toolbar";
import Content from "./components/Content";
import Sidenav from "./components/Sidenav";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

class App extends Component {
  state = {
    user: null
  };

  login = user => {
    this.setState({ user }, () =>
      this.props.history.push("%PUBLIC_URL%/books")
    );
  };

  logout = () => {
    this.setState({ user: null }, () =>
      this.props.history.push("%PUBLIC_URL%/")
    );
  };

  render() {
    const { topics, books } = this.props;
    return (
      <div className="app">
        <Toolbar user={this.state.user} />

        <Content>
          <Route
            path="%PUBLIC_URL%/books"
            render={() => <Sidenav topics={topics} />}
          />
          <Switch>
            <Route exact path="%PUBLIC_URL%/" component={Home} />
            <Route path="%PUBLIC_URL%/about" component={About} />
            <Route
              path="%PUBLIC_URL%/login"
              render={props => <Login onLogin={this.login} />}
            />
            <Route
              path="%PUBLIC_URL%/logout"
              render={props => <Logout onLogout={this.logout} />}
            />
            <PrivateRoute
              exact
              path="%PUBLIC_URL%/books/:topic?"
              user={this.state.user}
              component={Books}
              data={books}
            />
            } />
            <PrivateRoute
              path="%PUBLIC_URL%/books/:topic/:book"
              user={this.state.user}
              component={Book}
              data={books}
            />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </div>
    );
  }
}

export default withRouter(App);
