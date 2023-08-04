import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };
  }

  handleFavorite = () => {
    console.log(this.props.allFavorites);
    const { isFavorite } = this.state;
    const {
      id,
      setAllFavorites,
      allFavorites,
      name,
      price,
      imgUrl,
      sku,
      BackgroundColor,
    } = this.props;

    const newFavorite = {
      id,
      name,
      price,
      imgUrl,
      sku,
      BackgroundColor,
    };

    if (isFavorite) {
      setAllFavorites(allFavorites.filter((favorite) => favorite.id !== id));
    } else {
      setAllFavorites([...allFavorites, newFavorite]);
    }

    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }));
  };

  handleModal = () => {
    const {
      name,
      price,
      imgUrl,
      sku,
      BackgroundColor,
      id,
      setCartOpen,
      setSelectedProduct,
    } = this.props;

    setSelectedProduct({
      name,
      price,
      imgUrl,
      sku,
      BackgroundColor,
      id,
    });

    setCartOpen(true);
  };

  render() {
    const { name, price, imgUrl, sku, BackgroundColor } = this.props;
    const { isFavorite } = this.state;

    return (
      <div style={{ backgroundColor: BackgroundColor }} className="product">
        <div>
          <img className="product--img" src={imgUrl} alt={name} />
        </div>
        <p className="product--name">{name}</p>
        <p className="product--price">${price}</p>
        <p className="product--sku">|||{sku}|||</p>
        <div className="card--icons">
          <FontAwesomeIcon
            className="fav-icon"
            icon={isFavorite ? faStarSolid : faStar}
            onClick={this.handleFavorite}
          />
          <FontAwesomeIcon
            className="cart-icon"
            icon={faCartShopping}
            onClick={this.handleModal}
          />
        </div>
      </div>
    );
  }
}

export default Product;
