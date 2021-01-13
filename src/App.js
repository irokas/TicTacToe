import React, { useEffect, useState } from "react";
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
    return <Homepage getUser={getUser} />;
  }

  return <Grid user={data.username} />;
};

export default App;
