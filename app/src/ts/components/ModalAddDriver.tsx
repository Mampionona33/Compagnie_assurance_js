import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DriverContext, ModalContext } from "../App";
import Form from "react-bootstrap/Form";
import { IDriver } from "./TableDriver";

const ModalAddDriver = () => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const driverContext = useContext(DriverContext);
  const [tarif, setTarif] = useState();

  const [newDriver, setNewDriver] = useState<IDriver>({
    id: null,
    name: "",
    lastName: "",
    dateObtDriverLicense: "2023-01-01",
    birthday: "2007-01-01",
    subscriptionDate: "2023-01-01",
    accidentNumber: 0,
  });

  const createId = () => {
    const existingIds = driverContext.driver.map((driver) => driver.id || 0);
    const maxId = Math.max(...existingIds);
    return maxId === -Infinity ? 1 : maxId + 1;
  };

  const handleClose = () => {
    setNewDriver({
      id: null,
      name: "",
      lastName: "",
      dateObtDriverLicense: "2020-01-01",
      birthday: "2007-01-01",
      subscriptionDate: "2021-01-01",
      accidentNumber: 0,
    });
    setShowModal(false);
  };

  const handleSave = () => {
    if (
      newDriver.name &&
      newDriver.lastName &&
      newDriver.birthday &&
      newDriver.subscriptionDate
    ) {
      const newId = createId();
      driverContext.setDriver((prevDrivers) => [
        ...prevDrivers,
        { ...newDriver, id: newId, accidentNumber: 0 },
      ]);
      handleClose();
    }
  };

  const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriver((prevDriver) => ({ ...prevDriver, name: ev.target.value }));
  };

  const createBody = () => (
    <Form>
      <Form.Group className="sm-3" controlId="formAddDriver.name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          autoFocus
          onChange={handleNameChange}
          value={newDriver.name}
        />
      </Form.Group>
      <Form.Group className="sm-3" controlId="formAddDriver.lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          onChange={(ev) =>
            setNewDriver({ ...newDriver, lastName: ev.target.value })
          }
          value={newDriver.lastName}
        />
      </Form.Group>
      <Form.Group className="sm-3" controlId="formAddDriver.birthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          onChange={(ev) =>
            setNewDriver({ ...newDriver, birthday: ev.target.value })
          }
          value={newDriver.birthday}
        />
      </Form.Group>

      <Form.Group
        className="sm-3"
        controlId="formAddDriver.dateObtDriverLicense"
      >
        <Form.Label>Driver's License Date</Form.Label>
        <Form.Control
          type="date"
          onChange={(ev) =>
            setNewDriver({
              ...newDriver,
              dateObtDriverLicense: ev.target.value,
            })
          }
          value={newDriver.dateObtDriverLicense}
        />
      </Form.Group>
      <Form.Group className="sm-3" controlId="formAddDriver.subscriptionDate">
        <Form.Label>Subscription Date</Form.Label>
        <Form.Control
          type="date"
          onChange={(ev) =>
            setNewDriver({ ...newDriver, subscriptionDate: ev.target.value })
          }
          value={newDriver.subscriptionDate}
        />
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
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddDriver;
