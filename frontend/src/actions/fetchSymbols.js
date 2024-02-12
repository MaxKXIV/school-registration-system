import axios from "axios";
const fetchSymbols = async () => {
  const sectionInfo = await axios.get(
    `http://localhost:8080/registration/getcourses`,
  );

  if (!sectionInfo.status === 200 && !sectionInfo.status === 304) {
    throw new Error(`failed to fetch symbols`);
  }
  return sectionInfo.data;
};

export default fetchSymbols;
