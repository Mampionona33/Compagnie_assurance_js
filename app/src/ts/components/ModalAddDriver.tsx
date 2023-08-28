import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DriverContext, ModalContext } from "../App";
import Form from "react-bootstrap/Form"; 
import { IDriver } from "./TableDriver";

const ModalAddDriver = () => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const driverContext = useContext(DriverContext);

  const [newDriver, setNewDriver] = useState<IDriver>({
    id: null,
    name: "",
    lastName: "",
    birthday: "",
    subscriptionDate: "",
    accidentNumber: null,
  });

  
  const createId = () => {
    const existingIds = driverContext.driver.map(driver => driver.id || 0);
    const maxId = Math.max(...existingIds);
    return maxId + 1;
  }

  const handleClose = () => {
    setNewDriver({
      id: null,
      name: "",
      lastName: "",
      birthday: "",
      subscriptionDate: "",
      accidentNumber: null,
    });
    setShowModal(false);
  };

  const handleSave = () => {
    if (newDriver.name && newDriver.lastName && newDriver.birthday && newDriver.subscriptionDate) {
      const newId = createId(); 
      driverContext.setDriver(prevDrivers => [...prevDrivers, { ...newDriver, id: newId }]);
      handleClose();
    }
  };


  const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriver(prevDriver => ({ ...prevDriver, name: ev.target.value }));
  };

  const createBody = () => (
    <Form>
      <Form.Group className="sm-3" controlId="formAddDriver.name">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Nom" autoFocus onChange={handleNameChange} value={newDriver.name} />
      </Form.Group>
      <Form.Group className="sm-3" controlId="formAddDriver.lastName">
        <Form.Label>Prénom</Form.Label>
        <Form.Control type="text" placeholder="Prénom" onChange={(ev) => setNewDriver({ ...newDriver, lastName: ev.target.value })} value={newDriver.lastName} />
      </Form.Group>
      <Form.Group className="sm-3" controlId="formAddDriver.birthday">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control type="date"  onChange={(ev) => setNewDriver({ ...newDriver, birthday: ev.target.value })} value={newDriver.birthday} />
      </Form.Group>
      <Form.Group className="sm-3" controlId="formAddDriver.subscriptionDate">
        <Form.Label>Date d'adhésion</Form.Label>
        <Form.Control type="date" onChange={(ev) => setNewDriver({ ...newDriver, subscriptionDate: ev.target.value })} value={newDriver.subscriptionDate} />
      </Form.Group>
    </Form>
  );

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajout client</Modal.Title>
      </Modal.Header>
      <Modal.Body>{createBody()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddDriver;
