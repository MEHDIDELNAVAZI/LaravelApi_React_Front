import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../index.css";
import axios from "axios";
import Maincontext from "../maincontext"; // Correct import statement

class Register extends Component {
  static contextType = Maincontext;
  constructor(props) {
    super(props);
    this.NameRef = React.createRef();
    this.EmailRef = React.createRef();
    this.PasswordRef = React.createRef();
    this.ConfirmPasswordRef = React.createRef();

    this.state = {
      Error: "Nothing",
      notification: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const name_input = this.NameRef.current.value;
    const email_input = this.EmailRef.current.value;
    const password_input = this.PasswordRef.current.value;
    const confirmed_password = this.ConfirmPasswordRef.current.value;

    const data = {
      name: name_input,
      email: email_input,
      password: password_input,
      password_confirmation: confirmed_password,
    };

    const apiUrl = "http://localhost:8000/api/register";
    // Make the API request using Axios
    axios
      .post(apiUrl, data)
      .then((response) => {
        this.setState({ Error: "Nothing" }); // No error, reset the state
        this.setState({ notification: "Successfully Added!" });
        const { user, token } = response.data;
        this.context.setToken(token.plainTextToken);
        this.context.setUser(user);
        console.log(user);

        setTimeout(() => {
          this.setState({ notification: null });
        }, 3000);
        // Check if there's an error message in the response
      })
      .catch((error) => {
        // Handle the error, if needed
        if (error.response.status === 422) {
          this.setState({ Error: error.response.data.errors }); // Set the error message in the state
        } else {
          this.setState({ Error: null }); // No error, reset the state
        }
      });
  };

  render() {
    const { notification, Error } = this.state;

    return (
      <>
        <div className="animated fadeInDown">
          {notification ? (
            <div className="notification fadeInDown">{notification}</div>
          ) : null}

          <div className="form">
            <h2 className="text-center p-3">Add user </h2>
            {/* Display the error message if it exists */}
            <form onSubmit={this.handleSubmit} method="post">
              <input
                ref={this.NameRef}
                type="text"
                name="name"
                placeholder="Fullname"
              />
              {Error.name ? <div className="alert">{Error.name}</div> : null}
              <input
                ref={this.EmailRef}
                type="text"
                name="email"
                placeholder="Email"
              />
              {Error.email ? <div className="alert">{Error.email}</div> : null}
              <input
                ref={this.PasswordRef}
                type="password"
                name="password"
                placeholder="Password"
              />
              {Error.password ? (
                <div className="alert">{Error.password}</div>
              ) : null}
              <input
                ref={this.ConfirmPasswordRef}
                type="password"
                name="confrim_password"
                placeholder="Confirm password"
              />
              <button className="btn btn-block">Add</button>
              <div className="message"></div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
