import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Maincontext from "../maincontext"; // Correct import statement

class GuestLout extends Component {
  static contextType = Maincontext;
  state = {};

  render() {
    if (this.context.user_token) {
      return <Navigate to="/users" />;
    }
    return (
      <>
        <Outlet />
      </>
    );
  }
}

export default GuestLout;
