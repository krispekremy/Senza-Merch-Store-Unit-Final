import { Modal, Button } from "react-bootstrap";

type ThankYouModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function ThankYouModal({ show, onClose }: ThankYouModalProps) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thank You!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Thank you for your order! Your shipping information has been submitted.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
