import { Button, Card } from "react-bootstrap";
import type { CartItem } from "../types";

type MerchCardProps = {
  merch: {
    id: number;
    name: string;
    description: string;
    sizes: string;
    price: number;
    quantityInStock: number;
    category: string;
    image: string;
  };
  setCart: (newValue: CartItem[]) => void;
};

//This function is set up to add a merch item to the cart it takes in a productId and the setCart function.
const addToCart = async (
  productId: number,
  setCart: (newValue: CartItem[]) => void
) => {
  const newCartItem = {
    productId: productId,
    amount: 1,
  }; //makes a new cartItem variable that matches the productId, with the amount set to 1.
  const response = await fetch("http://localhost:3000/cart", {
    method: "POST",
    body: JSON.stringify(newCartItem),
    headers: {
      "Content-Type": "application/json",
    },
  }); //posts the new item to the back end

  if (response.ok) {
    const updatedCart = await fetch("http://localhost:3000/cart").then((res) =>
      res.json()
    ); //this checks to see if the response was okay, then fetch the cart again and take that data and set it as the cart for the frontend!

    setCart(updatedCart);
  }
};

export default function MerchCard({ merch, setCart }: MerchCardProps) {
  return (
    <Card color="dark" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={merch.image} />
      <Card.Body className="bg-light">
        <Card.Title>{merch.name}</Card.Title>
        <Card.Subtitle>{merch.price.toFixed(2)}</Card.Subtitle>
        <Card.Text>{merch.description}</Card.Text>
        <Button variant="primary" onClick={() => addToCart(merch.id, setCart)}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
