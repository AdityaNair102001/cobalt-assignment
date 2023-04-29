import { useEffect, useState } from "react";
import axios from "axios";
async function getTemplates(setTemplates) {
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
function Template() {
  useEffect(() => {
    getTemplates(setTemplates);
  }, []);
  const [templates, setTemplates] = useState(null);
  return (
    <div>
      {templates
        ? templates.length > 0
          ? templates.map((template) => (
              <div key={template.id}>
                <div>Template ID: {template.id}</div>{" "}
                <div>Template Name: {template.name}</div>{" "}
                <div>Template Owner: {template.ownerEmail}</div>
              </div>
            ))
          : "You don't have any templates"
        : "Loading Templates"}
    </div>
  );
}

export default Template;
