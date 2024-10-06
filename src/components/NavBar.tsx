import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal"; // Import DeleteModal
import type { CartItem } from "../types";

type NavBarProps = {
  cart: CartItem[];
  setCart: (newValue: CartItem[]) => void;
};

//I got the most of the code for this navbar from react bootstrap
function NavBar({ cart, setCart }: NavBarProps) {
  const [showModal, setShowModal] = useState(false); //state for showing the modal or not
  const totalCartItems = cart.reduce((total, item) => total + item.amount, 0); //this keeps track of the total amount of items in the cart

  const handleEmptyCart = async () => {
    try {
      const deletePromises = cart.map(async (item) => {
        // Send delete request for each cart item
        const response = await fetch(`http://localhost:3000/cart/${item.id}`, {
          method: "DELETE",
        });
        // error handling if the response isn't okay
        if (!response.ok) {
          throw new Error(`Failed to delete item with id ${item.id}`);
        }
      });

      // Wait for all delete requests to finish
      await Promise.all(deletePromises);

      // Clear the cart on the frontend
      setCart([]);
    } catch (error) {
      console.error("Error emptying the cart:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Senza Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="merch">
                Merch
              </Nav.Link>
              <NavDropdown
                title={`Cart (${totalCartItems})`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="cart">
                  View Cart
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="checkout">
                  Checkout
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setShowModal(true)}>
                  Empty Cart
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <DeleteModal
        show={showModal}
        setShow={setShowModal}
        onConfirm={handleEmptyCart}
      />
    </>
  );
}

export default NavBar;
