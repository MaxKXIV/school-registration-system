import { useQuery } from "@tanstack/react-query";
import fetchSymbols from "./fetchSymbols";

export const useCourseSymbols = () => {
  const results = useQuery({ queryKey: ["symbols"], queryFn: fetchSymbols });
  return [results?.data ?? [], results.status];
};
