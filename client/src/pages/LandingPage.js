import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner, Image, Button, Center, Box, Heading } from "@chakra-ui/react";
import Hero from "../Hero.svg";
async function getLoginLink(setLoginlink) {
  try {
    const response = await axios.get("http://localhost:3001/auth");
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
      <Heading>
        <span style={{ color: "#4299E1" }}>Docu</span>Sign
      </Heading>
      <Center
        width={"70%"}
        // border={"1px solid black"}
        m={"4rem auto"}
        flexDirection={"column"}
      >
        <Image width={["100%", "70%", "60%", "30%"]} src={Hero}></Image>
        {loginLink ? (
          <Box m={2} width={["100%", "70%", "60%", "25%"]}>
            <Link to={loginLink}>
              <Button width={"full"} variant={"solid"} colorScheme="blue">
                Login
              </Button>
            </Link>
          </Box>
        ) : (
          <Spinner></Spinner>
        )}
      </Center>
    </div>
  );
}

export default LandingPage;
