import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getData = async () => {
  const { data } = await axios.get(baseUrl + "/data");
  return data;
};

export const updateData = async (payload) => {
  const { data } = await axios.put(baseUrl + "/data", payload);
  return data;
};
