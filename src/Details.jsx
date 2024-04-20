import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import { useContext, useState } from "react";
import Carousel from "./Carousel";
import AdoptedPetContext from "./AdoptPetContext";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPet);
  const [adoptedPet, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl animate-spin">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-lg md:mr-8">
        <Carousel images={pet.images} />
      </div>
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-4">{pet.name}</h1>
        <h2 className="text-lg text-gray-600 mb-2">
          {`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Adopt {pet.name}
        </button>
        <p className="mt-4">{pet.description}</p>
      </div>
      {showModal && (
        <Modal>
          <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-orange-500 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">
                Would you like to adopt {pet.name}?
              </h1>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                  className="bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
