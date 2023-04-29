import { useLocation, useNavigate } from "react-router-dom";
import Template from "./Template";
import { Button, Center, Heading } from "@chakra-ui/react";
import logout from "../utils/logout";
import { useEffect } from "react";

function Dashboard() {
  const location = useLocation();

  const name = location?.state?.name;
  const email = location?.state?.email;

  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("../");
    }
  }, []);

  return (
    <>
      {name ? (
        <Center flexDirection={"column"}>
          <Heading>Cobalt Assignment</Heading>
          <Heading size={"md"}>Hi {name}!</Heading>
          <h3>Email: {email}</h3>
          <Template></Template>
          <Button onClick={() => logout(navigate)}>Logout</Button>
        </Center>
      ) : (
        "Checking authenticity"
      )}
    </>
  );
}

export default Dashboard;
