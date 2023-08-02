import React, { Component } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Maincontext from "../maincontext"; // Correct import statement
import "../index.css";
import axios from "axios";
import Loadingicon from "../assests/Loading_icon.gif";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

class Defualtlayout extends Component {
  static contextType = Maincontext;
  state = {
    username: null,
    loading: true,
    lastlogin: null,
    asideOpen: true,
    currentTime: new Date(),
  };

  onlogout = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("ACCESSTOKEN");

      // Send a request to the backend to perform the logout
      await axios.post("http://localhost:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }

    this.context.setToken(null);
    localStorage.removeItem("ACCESSTOKEN");
  };

  //  get the user  data form the  /user rout i the backend .

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: new Date(),
      });
    }, 1000); // Update every second

    // Retrieve the authentication token from localStorage
    const authToken = localStorage.getItem("ACCESSTOKEN");
    // Set the default Axios headers with the authentication token
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    // Make the API request to fetch the user data
    axios
      .get("http://localhost:8000/api/user")
      .then((response) => {
        // If the request is successful, update the state with the user data
        this.setState({
          username: response.data.name,
          lastlogin: response.data.last_login_at,
          loading: false,
        });
      })

      .catch((error) => {
        // Handle any errors that occur during the request
        this.setState({ loading: false });
        this.context.setToken(null);
      });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleClose = () => {
    this.setState({
      asideOpen: false,
    });
  };
  handleopen = () => {
    this.setState({
      asideOpen: true,
    });
  };

  render() {
    if (this.context.user_token) {
      return (
        <div id="defaultLayout">
          {this.state.asideOpen && (
            <aside className="aside">
              <div className="close-button" onClick={this.handleClose}>
                <FaTimes />
              </div>
              <br />
              <br />

              <Link to="/dashboard">Dashboard</Link>
              <Link to="/users">Users</Link>
              {/* Other content here */}
            </aside>
          )}
          <div className="content">
            <header>
              <div>
                <FaBars
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={this.handleopen}
                />
                <div></div>
                <div className="m-2">
                  {" "}
                  Last Logged in : {this.state.lastlogin}-UTC
                </div>
              </div>
              <div>
                <span className="p-3">
                  {this.state.loading ? (
                    <img
                      width={80}
                      height={80}
                      src={Loadingicon}
                      alt="Loading..."
                    />
                  ) : (
                    <>
                      <span style={{ fontSize: "20px" }}>
                        {this.state.username}
                      </span>
                    </>
                  )}
                </span>
                <button className="btn-delete" onClick={this.onlogout}>
                  Logout
                </button>{" "}
              </div>
            </header>
            <main>
              <span style={{ fontSize: "20px", float: "right" }}>
                {this.state.currentTime.toLocaleTimeString()}
              </span>
              <Outlet />
            </main>
          </div>
        </div>
      );
    }
    return <Navigate to="/login" />;
  }
}

export default Defualtlayout;
