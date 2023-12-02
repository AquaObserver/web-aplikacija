import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  current: number;
}

function ChangeCritLevel({ showModal, handleClose, current }: Props) {
  const [newCritical, setNewCritical] = useState("");
  function handleSubmit() {
    // POST newCritical
  }
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          Trenutna kritična razina: {current}%
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="new-critical">
              <Form.Label>Unesite željenu kritičnu razinu:</Form.Label>
              <Form.Control
                type="text"
                value={newCritical}
                onChange={(e) => setNewCritical(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              OK
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangeCritLevel;
