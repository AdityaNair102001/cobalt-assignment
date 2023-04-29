import axios from "axios";
export default async function getTemplates(setTemplates, navigate, toast) {
  try {
    const response = await axios.get(
      "http://localhost:3001/template",

      {
        withCredentials: true,
      }
    );
    if (response.data.success === true) {
      setTemplates(response.data.templates);
    }
  } catch (error) {
    navigate("../");

    if (error.response) {
      toast({
        title: "Couldn't fetch",
        description: error.response.message,
        status: "warning",
        duration: 6000,
        isClosable: true,
      });
    } else if (error.request) {
      toast({
        title: "Request not sent properly",
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
    console.log(error);
  }
}
