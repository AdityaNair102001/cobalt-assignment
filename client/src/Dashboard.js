import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Template from "./Template";

async function logout(navigate) {
  try {
    navigate("../");
    await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendEnvelope() {
  try {
    const response = await axios.post(
      "http://localhost:3001/envelope",
      { name: "Adiii" },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

function Dashboard() {
  const location = useLocation();

  const name = location.state.name;
  const email = location.state.email;

  const navigate = useNavigate();

  return (
    <div>
      {name ? (
        <>
          Dashboard
          <h2>Hi {name}!</h2>
          <h3>Email: {email}</h3>
          <Template></Template>
          <button
            onClick={() => {
              sendEnvelope();
            }}
          >
            Send Mail
          </button>
          <button onClick={() => logout(navigate)}>Logout</button>
        </>
      ) : (
        <>
          Some error while logging in. Please logout and try again{" "}
          <button onClick={() => logout(navigate)}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
