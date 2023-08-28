import React, { createContext, useState } from "react";
import TableDriver, { IDriver, driverInitialState } from "./components/TableDriver";
import ModalAddDriver from "./components/ModalAddDriver";

interface IDriverContext {
  driver: IDriver[];
  setDriver: React.Dispatch<React.SetStateAction<IDriver[]>>;
}

export const DriverContext = createContext<IDriverContext>({
  driver: [],
  setDriver: () => {},
});

export const ModalContext = createContext<{
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showModal: false,
  setShowModal: () => {},
});

const App = () => {
  const [driver, setDriver] = useState<IDriver[]>(driverInitialState);
  const [showModal, setShowModal] = useState(false);

  return (
    <DriverContext.Provider value={{ driver, setDriver }}>
      <ModalContext.Provider value={{ showModal, setShowModal }}>
        <div className="d-flex flex-column align-items-start gap-2">
          <input
            className="btn btn-primary"
            type="button"
            value="Ajouter"
            onClick={() => setShowModal(true)}
          />
          <TableDriver />
          <ModalAddDriver />
        </div>
      </ModalContext.Provider>
    </DriverContext.Provider>
  );
};

export default App;
