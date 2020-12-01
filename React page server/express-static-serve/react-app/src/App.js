import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export const App = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users.json").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <ul className="users">
        {users.map((user) => (
          <li className="user">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
