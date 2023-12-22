import { FormEvent, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Props {
  showModal: boolean;
  updateThreshold: any;
  handleClose: () => void;
  current: number;
}

function ChangeCritLevel({
  showModal,
  updateThreshold,
  handleClose,
  current,
}: Props) {
  const [newThreshold, setNewThreshold] = useState(current);

  useEffect(() => {
    setNewThreshold(current);
  }, [current]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateThreshold(newThreshold);
    handleClose();
  };

  function hide() {
    setNewThreshold(current);
    handleClose();
  }

  return (
    <>
      <Modal show={showModal} onHide={hide}>
        <Modal.Header closeButton>
          Trenutna kritična razina: {current}%
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3" controlId="new-critical">
              <Form.Label>Unesite željenu kritičnu razinu:</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                value={newThreshold.toString()}
                onChange={(e) => {
                  setNewThreshold(Number(e.target.value));
                }}
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
