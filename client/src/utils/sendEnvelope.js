import axios from "axios";
export default async function sendEnvelope(
  event,
  templateId,
  signerName,
  signerEmail,
  toast,
  onClose,
  setSelectedTemplate,
  setSignerEmail,
  setSignerName,
  setLoading
) {
  try {
    event.preventDefault();
    setLoading(true);
    onClose();
    const response = await axios.post(
      "http://localhost:3001/envelope",
      { templateId, signerEmail, signerName },
      {
        withCredentials: true,
      }
    );
    if (response.data.success === true) {
      console.log(response.data.message);

      toast({
        title: "Envelope sent!",
        description: response.data.message,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
    setSelectedTemplate(null);
    setSignerName(null);
    setSignerEmail(null);
    setLoading(false);
    console.log(response.data);
  } catch (error) {
    setLoading(false);
    console.log(error);
    if (error.response) {
      toast({
        title: "Couldn't send",
        description: error.response.message,
        status: "warning",
        duration: 6000,
        isClosable: true,
      });
    } else if (error.request) {
      toast({
        title: "Request not sent",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      console.log(error.request);
    } else {
      toast({
        title: "Some error occured",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  }
}
