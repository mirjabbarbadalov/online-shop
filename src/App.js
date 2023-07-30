import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Modal from "./components/Modal";

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allFavorites, setAllFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedCart, setAddedCart] = useState([]);

  const favoritesNum = allFavorites.length;
  const addedCartNum = addedCart.length;

  useEffect(() => {
    async function getData() {
      const data = await fetch("/data.json");
      const products = await data.json();
      setAllProducts(products);
    }

    getData();
  }, []);

  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites"));
    if (favoritesFromStorage) {
      setAllFavorites(favoritesFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(allFavorites));
  }, [allFavorites]);

  function closeModal(event) {
    if (cartOpen) {
      if (!event.target.closest(".modal")) {
        setCartOpen(false);
      }
    }
  }

  function addToCart(product) {
    setAddedCart((prevCart) => [...prevCart, product]);
  }

  function clearCart() {
    setAddedCart([]);
    localStorage.removeItem("cart");
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(addedCart));
  }, [addedCart]);

  return (
    <div onClick={closeModal} className="container">
      <Navbar favoritesNum={favoritesNum} addedCartNum={addedCartNum} />
      {allProducts.products && allProducts.products.length > 0 ? (
        <div className="product-list">
          {allProducts.products.map((product) => (
            <Product
              key={product.id}
              name={product.Name}
              price={product.Price}
              imgUrl={product.ImageURL}
              sku={product.SKU}
              BackgroundColor={product.BackgroundColor}
              allFavorites={allFavorites}
              setAllFavorites={setAllFavorites}
              id={product.id}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      {cartOpen && selectedProduct && (
        <Modal
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          name={selectedProduct.name}
          price={selectedProduct.price}
          imgUrl={selectedProduct.imgUrl}
          sku={selectedProduct.sku}
          BackgroundColor={selectedProduct.BackgroundColor}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}
