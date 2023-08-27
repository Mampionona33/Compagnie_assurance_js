import React, { createContext, useState } from "react";
import TableDriver from "./components/TableDriver";
import ModalAddDriver from "./components/ModalAddDriver";

export const DriverContext = createContext([]);
export const ModalContext = createContext<{
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showModal: false,
  setShowModal: () => {},
});

const App = () => {
  const [driver, setDriver] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <DriverContext.Provider value={driver}>
      <ModalContext.Provider value={{ showModal, setShowModal }}>
        <div className="d-flex flex-column align-items-start gap-2">
          <input
            className="btn btn-primary"
            type="button"
            value="Ajouter"
            onClick={() => setShowModal(true)} // Affiche la modal lors du clic sur le bouton
          />
          <TableDriver />
          <ModalAddDriver />
        </div>
      </ModalContext.Provider>
    </DriverContext.Provider>
  );
};

export default App;
