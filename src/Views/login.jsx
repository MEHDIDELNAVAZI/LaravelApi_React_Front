import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Maincontext from "../maincontext"; // Correct import statement

class Login extends Component {
  static contextType = Maincontext;

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = {
      error: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;

    // Now you can use the email and password values as needed
    const data = {
      email: email,
      password: password,
    };
//
    const apiUrl = "http://localhost:8000/api/login";
    // Make the API request using Axios
    axios
      .post(apiUrl, data)
      .then((response) => {
        const { user, token } = response.data;
        this.context.setToken(token);
        this.context.setUser(user);
        this.setState({ error: null });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Email Or password is incorrect!" });
        // Handle the error, if needed
      });
    // Add login logic here
  };

  render() {
    const { error } = this.state;
    return (
      //
      <>
        <div className="login-signup-form animated fadeInDown ">
          <div className="form">
            <h1 className="text-center p-3">Login Form</h1>
            <form onSubmit={this.handleSubmit} method="post">
              {error ? <div className="alert">{error}</div> : null}
              <input
                type="text"
                name="email"
                placeholder="Email"
                ref={this.emailRef} // Add ref for email input
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                ref={this.passwordRef} // Add ref for password input
              />
              <button className="btn btn-block">Login</button>
              <div className="message">
                Not Registered? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
