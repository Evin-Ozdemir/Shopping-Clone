import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const BasketContext = createContext();
const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  // ! Ürünü sepete ekle / miktarını arttır
  const addToBasket = (product) => {
    // Sepette ürün varsa bunu tespit et
    const found = basket.find((i) => i.id === product.id);

    if (!found) {
      // Sepette ürü yoksa bunu sepete ekle
      setBasket(basket.concat({ ...product, amount: 1 }));
      toast.success("Ürün sepete eklendi");
    } else {
      // Sepette bulunan ürünün miktarını bir arttır
      const updated = { ...found, amount: found.amount + 1 };
      // Bulunan ürünü dizi içerisinde güncelle
      const newBasket = basket.map((i) => (updated.id === i.id ? updated : i));
      // Diziyi güncelle
      setBasket(newBasket);
      toast.info(`Ürünün miktarı arttırıldı (${updated.amount})`);
    }
  };

  // ! id'si bilenen ürünü state'den kaldır
  const removeFromBasket = (delete_id) => {
    const filtred = basket.filter((item) => item.id !== delete_id);
    setBasket(filtred);
    toast.error("Ürün sepetten silindi");
  };

  // ! Ürünün miktarını azalt
  const decreaseAmount = (delete_id) => {
    // İd'sini bildiğimiz elemanı dizide bul
    const found = basket.find((item) => item.id === delete_id);

    //Eğer miktar 1'den büyükse miktarı azalt
    if (found.amount > 1) {
      // Nesnenin amount değerini 1 azalt
      const updated = { ...found, amount: found.amount - 1 };
      // Diziyi güncelle
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );

      // State'i güncelle
      setBasket(newBasket);
      toast.info(`Ürünün miktarı azaltıldı ${updated.amount}`);
    } else {
      // Eğer miktar 1'e eşitse ürünü direkt sil
      removeFromBasket(delete_id);
    }
  };
  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, decreaseAmount }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
