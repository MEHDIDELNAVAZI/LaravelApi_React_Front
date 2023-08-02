import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SkeletonLoading from "../Components/skeletonloading";
import Maincontext from "../maincontext"; // Correct import statement
import { Link, useNavigate } from "react-router-dom"; // Import the Navigate component
import { IoIosAdd } from "react-icons/io"; // Import the IoIosAdd icon

const Users = () => {
  const navigate = useNavigate();
  const context = useContext(Maincontext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("ACCESSTOKEN");
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    axios
      .get("http://127.0.0.1:8000/api/getusers")
      .then((response) => {
        setTimeout(() => {
          setUsers(response.data);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (userId) => {
    const url = `/edit/${userId}`;
    navigate(url);
    // Your edit logic
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const authToken = localStorage.getItem("ACCESSTOKEN");
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      const apiurl = `http://127.0.0.1:8000/api/users/${userId}`;

      axios
        .delete(apiurl)
        .then((response) => {
          axios
            .get("http://127.0.0.1:8000/api/getusers")
            .then((response) => {
              if (response.status === 401) {
                context.setToken(null);
                localStorage.removeItem("ACCESSTOKEN");
                // Replace '/login' with your actual login page URL
              }

              setUsers(response.data);
              setLoading(false);
            })
            .catch((error) => {
              // Handle errors during fetching the updated user list
            });
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  let counter = 1; // Initialize the counter here

  return (
    <>
      <div>
        <h1>
          User List
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/adduser"}
          >
            {" "}
            <IoIosAdd
              style={{
                fontSize: "40px",
              }}
            />{" "}
          </Link>
        </h1>

        {/* Add the FaClock icon */}
        <br />
        {loading ? (
          <SkeletonLoading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Email Verified At</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{counter++}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.email_verified_at || "Not verified"}</td>
                  <td>{user.created_at}</td>
                  <td>{user.updated_at}</td>
                  <td>
                    <button
                      className="btn-edit m-2"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete m-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Users;
