import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
async function getTokens(code, navigate, setLoading) {
  try {
    setLoading(true);
    const response = await axios.post("http://localhost:3001/auth", code, {
      withCredentials: true,
    });
    if (response.data.success === true) {
      navigate("/dashboard", {
        state: {
          name: response.data.name,
          email: response.data.email,
        },
      });
    } else {
      console.log(response);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}
function Login() {
  const [searchParams] = useSearchParams();
  const code = Object.fromEntries([...searchParams]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTokens(code, navigate, setLoading);
  }, []);
  return (
    <div>
      {loading ? (
        "Logging in..."
      ) : (
        <>
          Couldn't login. Try again after clearing cookies{" "}
          <Link to={"../"}>Home</Link>
        </>
      )}
    </div>
  );
}

export default Login;
