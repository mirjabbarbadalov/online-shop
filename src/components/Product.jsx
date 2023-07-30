import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Product({
  name,
  price,
  imgUrl,
  sku,
  BackgroundColor,
  allFavorites,
  setAllFavorites,
  id,
  cartOpen,
  setCartOpen,
  setSelectedProduct,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const newFavorite = {
    id,
    name,
    price,
    imgUrl,
    sku,
    BackgroundColor,
  };

  function handleFavorite() {
    if (isFavorite) {
      setAllFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== id)
      );
    } else {
      setAllFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
    }
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  }

  function handleModal() {
    setSelectedProduct({
      name,
      price,
      imgUrl,
      sku,
      BackgroundColor,
      id,
    });
    setCartOpen(true);
  }

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
          onClick={handleFavorite}
        />
        <FontAwesomeIcon
          className="cart-icon"
          icon={faCartShopping}
          onClick={handleModal}
        />
      </div>
    </div>
  );
}
