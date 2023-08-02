import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../edit.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { userId } = useParams();
  const NameRef = useRef(null);
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);

  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [userdata, setuserdata] = useState([]);

  // send reqeust to backend to get the user data from backend

  useEffect(() => {
    // Retrieve the authentication token from localStorage
    const authToken = localStorage.getItem("ACCESSTOKEN");
    // Set the default Axios headers with the authentication token
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    const apiurl = `http://localhost:8000/api/getuserdata/${userId}`;
    // Make the API request to fetch the user data
    axios
      .get(apiurl)
      .then((response) => {
        // If the request is successful, update the state with the user data
        setuserdata(response.data);
      })
      .catch((error) => {});
  }, [userId]); // Add 'userId' as a dependency here

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

    const apiurl = `http://localhost:8000/api/update/${userId}`;
    axios
      .post(apiurl, data)
      .then((response) => {
        setError(null);
        setNotification("Successfully Updated!");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setError(error.response.data.errors);
        } else {
          setError(null);
        }
      });
  };

  return (
    <>
      <div className=" animated fadeInDown">
        {notification ? (
          <div className="notification fadeInDown">{notification}</div>
        ) : null}

        <h2 className="text-center p-3">Edit user </h2>
        <form onSubmit={handleSubmit} method="post">
          <input
            ref={NameRef}
            type="text"
            name="name"
            placeholder="Fullname"
            defaultValue={userdata.name}
          />
          {error && error.name ? (
            <div className="alert">{error.name}</div>
          ) : null}
          <input
            ref={EmailRef}
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={userdata.email}
          />
          {error && error.email ? (
            <div className="alert">{error.email}</div>
          ) : null}
          <input
            ref={PasswordRef}
            type="password"
            name="password"
            placeholder="Password"
          />
          {error && error.password ? (
            <div className="alert">{error.password}</div>
          ) : null}
          <input
            ref={ConfirmPasswordRef}
            type="password"
            name="confrim_password"
            placeholder="Confirm password"
          />
          <button className="btn btn-block">Update</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
