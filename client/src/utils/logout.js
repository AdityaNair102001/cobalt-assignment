import axios from "axios";
export default async function logout(navigate) {
  try {
    navigate("../");
    await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}
