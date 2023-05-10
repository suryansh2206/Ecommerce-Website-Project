import React, { Fragment, useContext } from "react";
import Button from "../UI/Button";
import "./Header.css";
import CartContext from "../../Store/cart-context";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const Header = (props) => {
  const ctxobj = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logOut();
    ctxobj.updateItems([]);
  };

  let totalQuantity = 0;
  const items = ctxobj.items;
  if (items) {
    for (let i = 0; i < items.length; i++) {
      totalQuantity = totalQuantity + items[i].quantity;
    }
  }
  return (
    <Fragment>
      <div className="container">
        <ul className="header-items">
          <NavLink activeClassName="active" className="link" to="/home">
            <>Home</>
          </NavLink>
          <NavLink activeClassName="active" className="link" to="/store">
            <>Store</>
          </NavLink>
          <NavLink activeClassName="active" className="link" to="/about">
            <>About</>
          </NavLink>
          <NavLink activeClassName="active" className="link" to="/contact">
            <>Contact Us</>
          </NavLink>
          {!isLoggedIn && (
            <NavLink activeClassName="active" className="link" to="/auth">
              <>Log In</>
            </NavLink>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler} className="button">
                Logout
              </button>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Button onClick={props.onOpen} className="btn">
                Cart {totalQuantity}
              </Button>
            </li>
          )}
        </ul>
      </div>
      <div className="header">
        <h1>Ecommerce Store</h1>
      </div>
    </Fragment>
  );
};

export default Header;
