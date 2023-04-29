import axios from "axios";
export default async function getTemplates(setTemplates) {
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
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
