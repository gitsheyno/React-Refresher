import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreed from "./fetchBreed";
import { Animal } from "./APIResponsesTypes";

function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreed);
  console.log(results);
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}

export default useBreedList;
