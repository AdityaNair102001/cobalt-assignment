import { useLocation, useNavigate } from "react-router-dom";
import Template from "./Template";
import { Button, Center, Heading } from "@chakra-ui/react";
import logout from "../utils/logout";

function Dashboard() {
  const location = useLocation();

  const name = location.state.name;
  const email = location.state.email;

  const navigate = useNavigate();

  return (
    <Center flexDirection={"column"}>
      <Heading>Cobalt Assignment</Heading>
      <Heading size={"md"}>Hi {name}!</Heading>
      <h3>Email: {email}</h3>
      <Template></Template>
      <Button onClick={() => logout(navigate)}>Logout</Button>
    </Center>
  );
}

export default Dashboard;
