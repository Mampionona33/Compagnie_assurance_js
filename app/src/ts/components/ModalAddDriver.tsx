import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalContext } from "../App";

const ModalAddDriver = () => {
  const { showModal, setShowModal } = useContext(ModalContext);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Titre de la modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Super, vous lisez ce texte dans une modal !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Enregistrer les modifications
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddDriver;
