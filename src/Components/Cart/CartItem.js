import React, { useContext } from "react";
import Button from "../UI/Button";
import "./CartItem.css";
import CartContext from "../../Store/cart-context";
import axios from "axios";

const CartItem = (props) => {
  const ctxobj = useContext(CartContext);
  let username = localStorage.getItem("email");
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  username = t;
  const removeHandler = (item) => {
    axios
      .delete(
        `https://ecommerce-website-3164b-default-rtdb.firebaseio.com/${username}/${item._id}.json`
      )
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    ctxobj.removeItem(item);
  };

  const cartItems = (
    <ul className="cart-items">
      <li>
        <h4>ITEM</h4>
        <h4>PRICE</h4>
        <h4>QUANTITY</h4>
      </li>
      <hr />
      {ctxobj.items.map((item) => (
        <li key={Math.random() * 10}>
          <img src={item.imageUrl} alt={item.title} className="cart-img" />
          <p>{item.title}</p>
          <p>
            <b>{item.quantity}</b>
          </p>
          <Button
            className="btn-remove"
            onClick={removeHandler.bind(null, item)}
          >
            REMOVE
          </Button>
        </li>
      ))}
      <hr />
    </ul>
  );
  return (
    <div>
      <h3>CART</h3>
      {cartItems}
    </div>
  );
};

export default CartItem;
