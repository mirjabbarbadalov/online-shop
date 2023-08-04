import React, { Component } from "react";

class Modal extends Component {
  handleAddToCart = () => {
    const { id, name, price, imgUrl, sku, BackgroundColor, addToCart } =
      this.props;
    const product = {
      id,
      name,
      price,
      imgUrl,
      sku,
      BackgroundColor,
    };
    addToCart(product);
    this.props.setCartOpen(false);
  };

  handleCloseModal = () => {
    this.props.setCartOpen(false);
  };

  render() {
    const { name, price } = this.props;

    return (
      <div className="modal">
        <header>
          {name}, Price: {price}$
          <button className="modal--close-btn" onClick={this.handleCloseModal}>
            X
          </button>
        </header>
        <main>Do you want to add this product to the cart?</main>
        <footer>
          <button className="modal-btn" onClick={this.handleAddToCart}>
            Add to cart
          </button>
        </footer>
      </div>
    );
  }
}

export default Modal;
