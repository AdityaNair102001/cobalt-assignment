import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Spinner, Text } from "@chakra-ui/react";
import getTokens from "../utils/getTokens";
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
        <>
          <Spinner
            position={"fixed"}
            left={"50%"}
            top={"50%"}
            mt={"1rem"}
            visibility={loading ? "visible" : "hidden"}
            size="lg"
            color="blue"
          ></Spinner>
          <Text
            position={"fixed"}
            left={"51%"}
            top={"50%"}
            transform={"translate(-50%, -50%)"}
          >
            Logging in...
          </Text>
        </>
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
