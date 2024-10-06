import { Button } from "react-bootstrap";
import type { CartItem, Merch } from "../types";

type Props = {
  item: CartItem;
  merch: Merch[];
  deleteCartItem: (idToDelete: number) => void;
};

export default function CartItemRow({ item, merch, deleteCartItem }: Props) {
  const product = merch.find((p) => p.id === item.productId);

  const handleDelete = async () => {
    // Send DELETE request to backend
    const response = await fetch(`http://localhost:3000/cart/${item.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Call the parent function to update the front-end state
      deleteCartItem(item.id);
    } else {
      console.error("Failed to delete the item from the server.");
    }
  };

  return (
    <tr>
      <td>{product?.name}</td>
      <td>{item.amount}</td>
      <td>${product?.price.toFixed(2)}</td>
      <td>
        <Button onClick={handleDelete} className="bg bg-danger">
          X
        </Button>
      </td>
    </tr>
  );
}
