import classes from "./ContactUs.module.css";
import React, { useRef } from "react";

function ContactUs() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const numberRef = useRef("");

  const submitHandler = async (event) => {
    event.preventDefault();

    // could add validation here...

    const contact = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      number: numberRef.current.value,
    };

    const response = await fetch(
      "https://ecommerce-website-3164b-default-rtdb.firebaseio.com/contacts.json",
      {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className={classes.auth}>
      <h1>Please share your contact details</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef} required/>
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email ID</label>
          <input type="text" id="email" ref={emailRef} required></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="number">Phone Number</label>
          <input type="tel" id="number" ref={numberRef} required/>
        </div>
        <button className={classes.actions}>Store</button>
      </form>
    </section>
  );
}

export default ContactUs;
