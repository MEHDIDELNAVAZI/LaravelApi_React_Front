import React, { useRef, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Maincontext from "../maincontext"; // Correct import statement

function Register() {
  const context = useContext(Maincontext);

  const NameRef = useRef();
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const ConfirmPasswordRef = useRef();

  const [error, setError] = useState({});
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name_input = NameRef.current.value;
    const email_input = EmailRef.current.value;
    const password_input = PasswordRef.current.value;
    const confirmed_password = ConfirmPasswordRef.current.value;

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
        setError({}); // Clear error state
        setNotification("Successfully Registered!");
        const { user, token } = response.data;
        context.setToken(token.plainTextToken);
        context.setUser(user);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setError(error.response.data.errors);
        } else {
          setError({});
        }
      });
  };

  return (
    <>
      <div className="login-signup-form animated fadeInDown">
        {notification ? (
          <div className="notification fadeInDown">{notification}</div>
        ) : null}

        <div className="form">
          <h2 className="text-center p-3">Sign up For free</h2>
          <form onSubmit={handleSubmit} method="post">
            <input
              ref={NameRef}
              type="text"
              name="name"
              placeholder="Fullname"
            />
            {error.name ? <div className="alert">{error.name}</div> : null}
            <input
              ref={EmailRef}
              type="text"
              name="email"
              placeholder="Email"
            />
            {error.email ? <div className="alert">{error.email}</div> : null}
            <input
              ref={PasswordRef}
              type="password"
              name="password"
              placeholder="Password"
            />
            {error.password ? (
              <div className="alert">{error.password}</div>
            ) : null}
            <input
              ref={ConfirmPasswordRef}
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
            />
            <button className="btn btn-block">Register</button>
            <div className="message">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
