import { useQuery } from "@tanstack/react-query";
import fetchBreed from "../src/fetchBreed";

export default function useBreedList(animal) {
  const results = useQuery(["animals", animal], fetchBreed);

  return [results?.data? .breeds ?? [], results.status];
}
