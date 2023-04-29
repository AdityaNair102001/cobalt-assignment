import axios from "axios";
export default async function getTokens(code, navigate, setLoading) {
  try {
    setLoading(true);
    const response = await axios.post("http://localhost:3001/auth", code, {
      withCredentials: true,
    });
    if (response.data.success === true) {
      navigate("/dashboard", {
        state: {
          name: response.data.name,
          email: response.data.email,
        },
      });
    } else {
      console.log(response);
    }
    setLoading(false);
  } catch (error) {
    navigate("../");
    setLoading(false);
    console.log(error);
  }
}
