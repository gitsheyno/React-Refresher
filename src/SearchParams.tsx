import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptPetContext";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import { Animal } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const [queryParam, setQueryParam] = useState({
    animal: "" as Animal,
    location: "",
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [breeds] = useBreedList(animal as Animal);

  const res = useQuery(["search", queryParam], fetchSearch);
  const pets = res?.data?.pets ?? [];
  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const objData = {
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            location: formData.get("location")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
          };

          setQueryParam(objData);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container w-32 h-32 rounded-full shadow-md bg-gray-200 flex items-center justify-center">
            <img
              src={adoptedPet.images[0]}
              alt={adoptedPet.name}
              className="rounded-full"
            />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="mb-5 block w-60"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            className="mb-5 block w-60"
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            className="mb-5 block w-60 disabled:opacity-50"
            name="breed"
            disabled={!breeds.length}
            id="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className="rounded px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
