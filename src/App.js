import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { Grid } from "./Grid";
import { Homepage } from "./Homepage";
import "./styles.css";

export const App = () => {
  const [data, setData] = useState(null);

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/getUser",
    }).then((res) => {
      setData(res.data);
    });
  };

  useEffect(getUser);
  if (!data) {
    return <Homepage />;
  }

  return <Grid user={data.username} />;
};
