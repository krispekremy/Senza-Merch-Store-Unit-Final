import type { CartItem, Merch } from "../types";
import CartItemRow from "./CartItemRow";
type Props = {
  cart: CartItem[];
  merch: Merch[];
  deleteCartItem: (idToDelete: number) => void;
};

export default function Cart({ cart, merch, deleteCartItem }: Props) {
  if (!merch.length) {
    return <div>Loading merchandise...</div>; //loading message for when the merch is loading in!
  }
  const cartTotal = cart.reduce((total, cartItem) => {
    const product = merch.find((m) => m.id === cartItem.productId);

    if (product) {
      return total + product.price * cartItem.amount;
    }
    return total;
  }, 0); // this function uses the reduce method to figure out how much money the cart totals!

  return (
    <div className="container d-flex justify-content-center">
      <div style={{ width: "50%" }}>
        <h1 className="d-flex justify-content-center">Cart</h1>
        <table className="table table-striped">
          <tbody>
            {cart.length === 0 && <p>Put some merch in that cart!</p>}{" "}
            {/* some short circuiting in case the cart is empty! */}
            {cart.map((item) => (
              <CartItemRow
                item={item}
                key={item.id}
                merch={merch}
                deleteCartItem={deleteCartItem}
              />
            ))}
          </tbody>
        </table>
        <h3>Total Amount Due: {cartTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
}
