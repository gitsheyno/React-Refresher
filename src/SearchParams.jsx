import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptPetContext";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [queryParam, setQueryParam] = useState({
    animal: "",
    location: "",
    breeds: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [breeds] = useBreedList(animal);

  const res = useQuery(["search", queryParam], fetchSearch);
  const pets = res?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const objData = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breeds: formData.get("breeds") ?? "",
          };
          setQueryParam(objData);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
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
          <select name="breed" disabled={!breeds.length} id="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
