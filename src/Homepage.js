import React, { useEffect, useState } from "react";
import axios from "axios";
import MustContainItem from "./MustContainItem";

export const Homepage = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  const mustContainData = [
    ["An uppercase letter (a-z)", containsUL],
    ["A lowercase letter (A-Z)", containsLL],
    ["A number (0-9)", containsN],
    ["A special character (!@#$)", containsSC],
    ["At least 8 characters", contains8C],
  ];

  const register = async () => {
    await axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
    });
  };

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "/login",
    });
  };

  const passwordCheck = () => {
    // has uppercase letter
    if (registerPassword.toLowerCase() !== registerPassword) {
      setContainsUL(true);
    } else setContainsUL(false);

    // has lowercase letter
    if (registerPassword.toUpperCase() !== registerPassword) {
      setContainsLL(true);
    } else setContainsLL(false);

    // has number
    if (/\d/.test(registerPassword)) {
      setContainsN(true);
    } else setContainsN(false);

    // has special character
    if (/[~`!#$%@^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(registerPassword)) {
      setContainsSC(true);
    } else setContainsSC(false);

    // has 8 characters
    if (registerPassword.length >= 8) {
      setContains8C(true);
    } else setContains8C(false);
  };

  useEffect(() => {
    if (
      containsUL &&
      containsLL &&
      containsN &&
      containsSC &&
      contains8C &&
      registerUsername
    ) {
      setAllValid(true);
    } else setAllValid(false);
  });

  return (
    <div>
      <div>
        <h1>Register</h1>
        <form>
          <input
            placeholder="username"
            autoComplete="username"
            type="text"
            onChange={(e) => {
              setRegisterUsername(e.target.value);
            }}
          />
          <input
            placeholder="password"
            autoComplete="current-password"
            type="password"
            onKeyUp={passwordCheck}
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          <button onClick={register} disabled={!allValid} type="submit">
            Sign Up
          </button>
        </form>
        <h4>Password must contain:</h4>
        <div className="must-container cfb">
          {mustContainData.map((info) => (
            <MustContainItem data={info} />
          ))}
        </div>
      </div>
      <div>
        <h1>Login</h1>
        <form>
          <input
            placeholder="username"
            autoComplete="username"
            type="text"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            placeholder="password"
            autoComplete="current-password"
            type="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={login} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
