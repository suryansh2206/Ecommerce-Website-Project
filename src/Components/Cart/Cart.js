import React, { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import CartContext from "../../Store/cart-context";
import "./Cart.css";
import axios from "axios";

const Cart = (props) => {
  let amount = 0;
  const ctxobj = useContext(CartContext);
  
  const [items, setItems] = useState([]);
  
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
    
    ctxobj.items.map((item) => {
      amount = amount + Number(item.quantity) * Number(item.price);
    });
    console.log(items)
  return (
    <Modal onClose={props.onClose}>
      <CartItem />
      <div className="total">
        <span>
          <b>Total</b>
        </span>
        <span>${amount}</span>
      </div>
      <Button onClick={props.onClose} className="btn btn-order">
        CLOSE
      </Button>
      <Button className="btn btn-order">PURCHASE</Button>
    </Modal>
  );
};

export default Cart;
