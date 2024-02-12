import axios from "axios";
const fetchSection = async ({ queryKey }) => {
  const id = queryKey[1];
  const sectionInfo = await axios.get(
    `http://localhost:8080/registration/${id}`,
  );

  if (!sectionInfo.status === 200 && !sectionInfo.status === 304) {
    throw new Error(`registration/${id} failed to fetch`);
  }
  return sectionInfo.data;
};

export default fetchSection;
