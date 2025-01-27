import { useContext } from "react";
import { BasketContext } from "../context/basketContext";
import Info from "../components/info";
import Total from "../components/total";
import BasketItem from "../components/basketItem";

const Basket = () => {
  const { basket } = useContext(BasketContext);
  return (
    <div className="container mt-5">
      <h1>Sepet</h1>
      <div className="row">
        <div className="d-flex flex-column gap-5 mt-5 col-lg-8">
          {basket.length === 0 ? (
            <Info />
          ) : (
            basket.map((item) => <BasketItem key={item.id} item={item} />)
          )}
        </div>
        <div className="col-lg-4">
          <Total basket={basket} />
        </div>
      </div>
    </div>
  );
};

export default Basket;
