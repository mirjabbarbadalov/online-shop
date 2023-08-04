import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Modal from "./components/Modal";
import { useState } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      allFavorites: [],
      cartOpen: false,
      selectedProduct: null,
      addedCart: [],
    };
  }

  setAllFavorites = (newFavorites) => {
    this.setState({ allFavorites: newFavorites });
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const data = await fetch("/data.json");
    const products = await data.json();
    this.setState({ allProducts: products });
  };

  addToCart = (product) => {
    this.setState((prevState) => ({
      addedCart: [...prevState.addedCart, product],
    }));
  };

  clearCart = () => {
    this.setState({ addedCart: [] });
    localStorage.removeItem("cart");
  };

  closeModal = (event) => {
    if (this.state.cartOpen) {
      if (!event.target.closest(".modal")) {
        this.setState({ cartOpen: false });
      }
    }
  };

  componentDidUpdate() {
    this.saveFavoritesToLocalStorage();
    this.saveCartToLocalStorage();
  }

  saveFavoritesToLocalStorage = () => {
    localStorage.setItem("favorites", JSON.stringify(this.state.allFavorites));
  };

  saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.addedCart));
  };

  render() {
    const { allProducts, allFavorites, cartOpen, selectedProduct, addedCart } =
      this.state;
    const favoritesNum = allFavorites.length;
    const addedCartNum = addedCart.length;
    // console.log(favoritesNum);
    // console.log(allFavorites);
    console.log(this.state.allFavorites);

    return (
      <div onClick={this.closeModal} className="container">
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
                setAllFavorites={this.setAllFavorites} // Pass the function here
                id={product.id}
                cartOpen={cartOpen}
                setCartOpen={(isOpen) => this.setState({ cartOpen: isOpen })}
                setSelectedProduct={(product) =>
                  this.setState({ selectedProduct: product })
                }
              />
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}

        {cartOpen && selectedProduct && (
          <Modal
            cartOpen={cartOpen}
            setCartOpen={(isOpen) => this.setState({ cartOpen: isOpen })}
            name={selectedProduct.name}
            price={selectedProduct.price}
            imgUrl={selectedProduct.imgUrl}
            sku={selectedProduct.sku}
            BackgroundColor={selectedProduct.BackgroundColor}
            addToCart={this.addToCart}
          />
        )}
      </div>
    );
  }
}

export default App;
