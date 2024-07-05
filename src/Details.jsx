import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);
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
    // temptation to wrap ErrorBoundary here, but it only catches errors of wrapped components.
    // it won't catch any error happenning in useQuery above

    <div className="details">
      <Carousel images={pet.images}></Carousel>
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name} ?</h1>
              <div
                className="buttons"
                // onClick={(e)=>console.log(e)} if we try to get yes or no is clicked from here,
                // it may not work , it may show a fake event, so check for e, e.target always
              >
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

// export default <ErrorBoundary><Details/></ErrorBoundary>; if i do this props passed to Details are killed

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
