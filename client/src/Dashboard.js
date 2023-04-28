import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
async function getAccessToken(code) {
  try {
    const response = await axios.post(
      "http://localhost:3001/access-token",
      code,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
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

async function getTemplates() {
  try {
    const response = await axios.get(
      "http://localhost:3001/template",

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
  const [searchParams] = useSearchParams();
  const code = Object.fromEntries([...searchParams]);
  useEffect(() => {
    getAccessToken(code);
  }, []);

  return (
    <div>
      Dashboard
      <button
        onClick={() => {
          getTemplates();
        }}
      >
        Templates
      </button>
      <button
        onClick={() => {
          sendEnvelope();
        }}
      >
        Send Mail
      </button>
    </div>
  );
}

export default Dashboard;
