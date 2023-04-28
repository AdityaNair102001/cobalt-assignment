import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
async function getLoginLink(setLoginlink) {
  try {
    const response = await axios.get("http://localhost:3001");
    setLoginlink(response.data.loginLink);
  } catch (error) {
    console.log(error);
  }
}
function LandingPage() {
  const [loginLink, setLoginlink] = useState(null);
  useEffect(() => {
    getLoginLink(setLoginlink);
  }, []);
  return (
    <div className="App">
      {loginLink ? <Link to={loginLink}>Login</Link> : "Loading"}
    </div>
  );
}

export default LandingPage;
