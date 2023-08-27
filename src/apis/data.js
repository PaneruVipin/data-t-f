import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getData = async () => {
  try {
    const { data } = await axios.get(baseUrl + "/data");
    return data;
  } catch {
    
  }
};

export const updateData = async (payload) => {
  try {
    const { data } = await axios.put(baseUrl + "/data", payload);
    return data;
  } catch {}
};
