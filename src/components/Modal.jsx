import React from "react";

export default function Modal({
  cartOpen,
  setCartOpen,
  name,
  price,
  id,
  imgUrl,
  sku,
  BackgroundColor,
  addToCart,
}) {
  function handleAddToCart() {
    const product = {
      id,
      name,
      price,
      imgUrl,
      sku,
      BackgroundColor,
    };
    addToCart(product);
    setCartOpen(false);
  }

  function handleCloseModal() {
    setCartOpen(false);
  }

  return (
    <div className="modal">
      <header>
        {name}, Price: {price}$
        <button className="modal--close-btn" onClick={handleCloseModal}>
          X
        </button>
      </header>
      <main>Do you want to add this product to the cart?</main>
      <footer>
        <button className="modal-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </footer>
    </div>
  );
}
