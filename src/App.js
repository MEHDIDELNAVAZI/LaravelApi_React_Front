import React, { Component } from "react";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import Maincontext from "./maincontext"; // Correct import statement

class App extends Component {
  static contextType = Maincontext;

  state = {
    user: null,
    user_token: localStorage.getItem("ACCESSTOKEN"),
    username: "",
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };
  
  setToken = (token) => {
    localStorage.setItem("ACCESSTOKEN", token);
    this.setState({
      user_token: token,
    });
  };

  render() {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Maincontext.Provider
            value={{
              user_token: this.state.user_token,
              setToken: this.setToken,
              setUser: this.setUser,
              user: this.state.user,
            }}
          >
            <Router />
          </Maincontext.Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

export default App;
