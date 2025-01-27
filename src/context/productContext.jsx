import { createContext, useEffect, useState } from "react";
import api from "../api";

// ! Create Contexti çağır Bunu bir değişkene aktar
export const ProductContext = createContext();

// Context yapısında tutulacak verileri bileşenlere aktaracak yapıyı tanımla
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Api isteği at
  useEffect(() => {
    // Eğer seçili bir kategori varsa buna istek at yoksa tüm ürünlere istek at
    const url =
      selectedCategory === "all"
        ? "/products"
        : `/products/category/${selectedCategory}`;

    api.get(url).then((res) => {
      setProducts(res.data);
    });
  }, [selectedCategory]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, selectedCategory, setSelectedCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
