import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  handleSubmit: (arg: number) => void;
  current: number;
}

function ChangeCritLevel({
  showModal,
  handleClose,
  handleSubmit,
  current,
}: Props) {
  const [newCritical, setNewCritical] = useState("");

  const handleButtonClick = () => {
    const newCriticalNumber = Number(newCritical);
    if (!isNaN(newCriticalNumber)) {
      handleSubmit(newCriticalNumber);
    }
    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          Trenutna kritična razina: {current}%
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="new-critical">
              <Form.Label>Unesite željenu kritičnu razinu:</Form.Label>
              <Form.Control
                type="text"
                value={newCritical}
                onChange={(e) => setNewCritical(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleButtonClick}>
              OK
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangeCritLevel;
