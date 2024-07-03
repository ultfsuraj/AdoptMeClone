import { useState} from "react";
import {useQuery} from '@tanstack/react-query'
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState(""); 
  const [breeds] = useBreedList(animal);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  })

  const results = useQuery(['search', requestParams], fetchSearch)
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target)
          const data = {
            animal: formData.get('animal') ?? "",
            breed: formData.get('breed') ?? "",
            location: formData.get('location') ?? "",
          }
          setRequestParams(data)
        }}
      >
        <label htmlFor="location">
          Location
          <input
            name="location"
            id="location"
            placeholder="location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
          name="animal"
            id="animal"
            value={animal}
            placeholder="animal"
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
           name="breed"
            id="breed"
            disabled={breeds.length === 0}
         
            placeholder="breed"
          >
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
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
