import MerchCard from "./components/MerchCard";
import type { CartItem, Merch } from "./types";
import "./App.css";

type Props = {
  setCart: (newValue: CartItem[]) => void;
  merch: Merch[];
};

export default function MerchList({ merch, setCart }: Props) {
  if (!merch.length) {
    return <div>Loading merchandise...</div>;
  } //loading message before merch populates

  return (
    <div>
      <h2 className="d-flex justify-content-center mt-2">Merch!</h2>
      <div className="container-fluid ">
        <div className="merch-container flex-wrap m-2 p-3 justify-content-center">
          {merch.map((m) => (
            <div className="p-3" key={m.id}>
              <MerchCard merch={m} setCart={setCart} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
