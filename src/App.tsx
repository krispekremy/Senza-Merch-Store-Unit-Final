import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Home.tsx";
import NavBar from "./components/NavBar";
import MerchList from "./MerchList.tsx";
import Cart from "./components/Cart.tsx";
import type { CartItem, Merch } from "./types.ts";
import { useEffect, useState } from "react";
import Checkout from "./components/Checkout.tsx";

//this is our main app where the react routing happens!
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]); //one state for the cart
  const [merch, setMerch] = useState<Merch[]>([]); //one state for the merch

  // Fetch cart data on initial load
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("http://localhost:3000/cart");
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData); // Update the cart state with the fetched data
      }
    };

    fetchCart(); // Call the function on component mount
  }, []); // Empty dependency array to run once on component load

  //fetch the merch data on initial load, same as above but for merch
  useEffect(() => {
    const getMerch = async () => {
      const response = await fetch("http://localhost:3000/merch");
      const merchData = await response.json();
      setMerch(merchData);
    };
    getMerch();
  }, []);
  //a function to delete a cart item in the cart!
  const deleteCartItem = (idToDelete: number) => {
    setCart(cart.filter((item) => item.id !== idToDelete));
  };

  //here's where I create my router! the navbar is the parent element, and then the children are everything else!
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar setCart={setCart} cart={cart} />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/merch",
          element: <MerchList merch={merch} setCart={setCart} />, // MerchList gets the merch state and setter function passed as props
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: (
            <Cart cart={cart} merch={merch} deleteCartItem={deleteCartItem} />
          ), // Cart gets the cart state and setter function, and the merch state as well as the deleteCartItem function passed down as props.
        },
        {
          path: "/checkout",
          element: <Checkout setCart={setCart} />,
        }, // Checkout just gets setCart as a prop.
      ],
    },
  ]);

  return <RouterProvider router={router} />; // and here's where we return the router!
}
