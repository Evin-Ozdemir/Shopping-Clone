import { Link } from "react-router-dom";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productContext";
import api from "../api";

const Header = () => {
  // Context'e abone ol
  const { selectedCategory, setSelectedCategory } = useContext(ProductContext);

  const [categories, setCategories] = useState([]);

  // Api'a kategori bilgisi için istek at
  useEffect(() => {
    api
      .get("/products/categories")
      .then((res) => setCategories(["all", ...res.data]));
  });
  return (
    <nav className="navbar navbar-expand-lg bg-secondary d-flex justify-content-around py-3">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fs-3 d-flex align-items-center gap-3 text-warning"
        >
          <PiShoppingBagOpenFill />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex mb-2 mt-2 mb-lg-0 ms-auto me-5">
            <li className="nav-item">
              <Link className="nav-link fs-5" aria-current="page" to="/">
                Ana Sayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/sepet">
                Sepet Sayfası
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle fs-5"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kategoriler
              </a>
              <ul className="dropdown-menu">
                <li>
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="dropdown-item"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
