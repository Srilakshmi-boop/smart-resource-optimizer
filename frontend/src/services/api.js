import axios from "axios";

export const getSystemData = async () => {
  const response = await axios.get("http://localhost:5000/api/system");
  return response.data;
};