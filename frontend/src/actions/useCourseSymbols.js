import { useState, useEffect } from "react";
import axios from "axios";

export const useCourseSymbols = () => {
  const [currentSymbols, setSymbols] = useState(["Type"]);

  useEffect(() => {
    const requestCourseSymbols = async () => {
      const courseSymbols = await axios.get(
        "http://localhost:8080/registration/getcourses",
      );
      setSymbols((currentSymbols) => [
        ...currentSymbols,
        ...courseSymbols.data,
      ]);
    };
    requestCourseSymbols();
  }, []);
  return [currentSymbols];
};
