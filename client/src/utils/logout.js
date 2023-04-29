import axios from "axios";
export default async function logout(navigate) {
  try {
    await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });
    navigate("../", { replace: true });
  } catch (error) {
    console.log(error);
  }
}
