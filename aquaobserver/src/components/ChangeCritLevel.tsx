import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Props {
  showModal: boolean;
  changeThreshold: any;
  handleClose: () => void;
  current: number;
}

function ChangeCritLevel({
  showModal,
  changeThreshold,
  handleClose,
  current,
}: Props) {
  const [newCritical, setNewCritical] = useState("");

  const handleSubmit = () => {
    const newThreshold = Number(newCritical);
    if (!isNaN(newThreshold)) {
      changeThreshold(newThreshold);
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
          <Form
            onSubmit={(e) => {
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3" controlId="new-critical">
              <Form.Label>Unesite željenu kritičnu razinu:</Form.Label>
              <Form.Control
                type="number"
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
