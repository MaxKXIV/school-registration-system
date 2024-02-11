import { useState, useEffect } from "react";
import axios from "axios";

export const useCourseSymbols = () => {
  const [currentSymbols, setSymbols] = useState([]);

  useEffect(() => {
    const requestCourseSymbols = async () => {
      const courseSymbols = await axios.get(
        "http://localhost:8080/registration/getcourses",
      );
      setSymbols(courseSymbols.data);
    };
    requestCourseSymbols();
  }, []);
  return [currentSymbols];
};
