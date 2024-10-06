import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type DeleteModalProps = {
  show: boolean; // Control whether the modal is visible
  setShow: (show: boolean) => void; // Function to toggle modal visibility
  onConfirm: () => void; // Function to handle confirmation action
};

export default function DeleteModal({
  show,
  setShow,
  onConfirm,
}: DeleteModalProps) {
  const handleClose = () => setShow(false);

  const handleConfirm = () => {
    onConfirm(); // Empty the cart
    handleClose(); // Close the modal after confirmation
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Cart Empty</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to empty the cart?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Empty Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
