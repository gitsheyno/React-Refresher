import { useQuery } from "@tanstack/react-query";
import fetchBreed from "./fetchBreed";

function useBreedList(animal) {
  const results = useQuery(["animals", animal], fetchBreed);
  console.log(results);
  return [results?.data?.breeds ?? [], results.status];
}

export default useBreedList;
