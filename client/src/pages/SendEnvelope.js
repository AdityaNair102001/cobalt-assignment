import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import sendEnvelope from "../utils/sendEnvelope";

function Envelope({ templates }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [signerName, setSignerName] = useState(null);
  const [signerEmail, setSignerEmail] = useState(null);

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  return (
    <div>
      {" "}
      <Button
        variant={"solid"}
        colorScheme="blue"
        onClick={onOpen}
        isDisabled={!templates}
      >
        Send Mail
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(event) =>
              sendEnvelope(
                event,
                selectedTemplate,
                signerName,
                signerEmail,
                toast,
                onClose,
                setSelectedTemplate,
                setSignerEmail,
                setSignerName,
                setLoading
              )
            }
          >
            <ModalHeader>Send template in mail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                onChange={(event) => setSelectedTemplate(event.target.value)}
                m={1}
                placeholder="Select Template"
                required
              >
                {templates
                  ? templates.length > 0
                    ? templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name} by {template.ownerEmail}
                        </option>
                      ))
                    : null
                  : null}
              </Select>
              <Input
                required
                onChange={(event) => setSignerName(event.target.value)}
                m={1}
                placeholder="Signer Name"
                type="text"
              ></Input>
              <Input
                required
                onChange={(event) => setSignerEmail(event.target.value)}
                m={1}
                placeholder="Signer Email"
                type="email"
              ></Input>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Send!
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Spinner
        position={"fixed"}
        left={"50%"}
        top={"50%"}
        mt={"1rem"}
        visibility={loading ? "visible" : "hidden"}
        size="lg"
        color="blue"
      ></Spinner>
    </div>
  );
}

export default Envelope;
