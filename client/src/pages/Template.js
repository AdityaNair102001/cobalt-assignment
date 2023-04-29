import { useEffect, useState } from "react";

import Envelope from "./SendEnvelope";
import { Box, Center, Spinner } from "@chakra-ui/react";
import getTemplates from "../utils/getTemplates";

function Template() {
  useEffect(() => {
    getTemplates(setTemplates);
  }, []);

  const [templates, setTemplates] = useState(null);
  return (
    <Center flexDirection={"column"} m={2}>
      {templates ? (
        templates.length > 0 ? (
          templates.map((template) => (
            <Box m={2} shadow={"md"} p={2} key={template.id}>
              <div>
                <span style={{ color: "#3182CE" }}>Template ID:</span>{" "}
                {template.id}
              </div>{" "}
              <div>
                <span style={{ color: "#3182CE" }}>Template Name:</span>{" "}
                {template.name}
              </div>{" "}
              <div>
                <span style={{ color: "#3182CE" }}>Template Owner:</span>{" "}
                {template.ownerEmail}
              </div>
            </Box>
          ))
        ) : (
          "You don't have any templates"
        )
      ) : (
        <>
          <Spinner></Spinner>Loading Templates
        </>
      )}
      <Box>
        <Envelope templates={templates}></Envelope>
      </Box>
    </Center>
  );
}

export default Template;
