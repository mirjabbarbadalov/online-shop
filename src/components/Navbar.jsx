import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ favoritesNum, addedCartNum }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1 className="logo--name">
          Miri<span>Shop</span>
        </h1>
      </div>
      <div className="icons">
        <div className="icon--shop">
          <a href="#" className="icon--shop-link">
            <FontAwesomeIcon
              className="icon--shop-icon"
              icon={faCartShopping}
            />
          </a>
          {addedCartNum > 0 && (
            <div className="shop--number">{addedCartNum}</div>
          )}
        </div>
        <div className="icon--fav">
          <a href="#" className="icon--fav-link">
            <FontAwesomeIcon className="icon--fav-icon" icon={faStar} />
          </a>
          {favoritesNum > 0 && (
            <div className="shop--number">{favoritesNum}</div>
          )}
        </div>
      </div>
    </nav>
  );
}
