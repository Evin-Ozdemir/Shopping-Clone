import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className="text-center fs-5">
      <p>Öncelikle sepete bir ürün ekleyiniz.</p>
      <Link to="/" className="btn btn-primary">
        Ürünlere Git
      </Link>
    </div>
  );
};

export default Info;
