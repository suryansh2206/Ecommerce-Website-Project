import React, { useState, useEffect } from "react";
import CartContext from "./cart-context";
import axios from "axios";

const ContextProvider = (props) => {
  const [items, updateItems] = useState([]);
  const [totalAmount, settotalAmount] = useState(0);

  let username = localStorage.getItem("email") || " ";
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  username = t;

  const addItemHandler = (item) => {
    let existingIndex = items.findIndex((each) => each.id === item.id);
    let existingItem = items[existingIndex];
    let newAmount = 0;
    let updatedItems;
    if (existingItem !== undefined) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity,
      };
      updatedItems = [...items];
      updatedItems[existingIndex] = updatedItem;
      updateItems([...updatedItems]);
    } else {
      updateItems([...items, item]);
    }
    items.forEach((each) => {
      newAmount = newAmount + each.quantity * each.price;
      // console.log(newAmount);
    });
    settotalAmount(newAmount);
  };

  if (items[0]) {
    axios
      .put(
        `https://ecommerce-website-3164b-default-rtdb.firebaseio.com/${username}.json`,
        {
          orderItems: items,
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log("called");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get(
        `https://ecommerce-website-3164b-default-rtdb.firebaseio.com/${username}.json`
      )
      .then((res) => {
        console.log(res.data.orderItems);
        updateItems(res.data.orderItems);
      })

      .catch((err) => console.log(err));
  }, [username]);

  const removeItemHandler = (item) => {
    const existingIndex = items.findIndex((each) => each.id === item.id);
    const existingItem = items[existingIndex];
    let updatedItems,
      quantity = 0;
    let newAmount = 0;
    if (existingItem !== undefined) {
      quantity = existingItem.quantity - 1;
      if (quantity < 0 || quantity === 0) {
        quantity = 0;
        updatedItems = items.filter((each) => each.id !== item.id);
        updateItems([...updatedItems]);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: quantity,
        };
        updatedItems = [...items];
        updatedItems[existingIndex] = updatedItem;
        updateItems([...updatedItems]);
      }
    } else {
      updateItems([...items]);
    }
    items.forEach((each) => {
      newAmount = newAmount - each.quantity * each.price;
    });
    settotalAmount(newAmount);
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    updateItems: updateItems,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default ContextProvider;
