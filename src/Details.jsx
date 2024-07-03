import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  // useQuery(queryKey,...)"details" is caching key if you don't have details[id] in cache run fetchPet
  // you can't await useQuery inside a component. use loading states . tries to refetch, with exponential backup eg. 3 times
  // results.refetch()

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">⚽</h2>
      </div>
    );
  }

  if (results.isError) {
    return <h2>oh no</h2>;
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;
