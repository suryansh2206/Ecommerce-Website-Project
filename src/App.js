import React, { useContext, useState } from "react";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Cart from "./Components/Cart/Cart";
import Button from "./Components/UI/Button";
import "./App.css";
import Products from "./Components/Products/Products";
import ProductsPage from "./Components/Products/ProductsPage";
import ContextProvider from "./Store/ContextProvider";
import { Route, Routes, Navigate } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import AuthForm from "./Components/Auth/AuthForm";
import AuthContext from "./Store/auth-context";
import StartingPage from "./Pages/StartingPage";

const App = () => {
  const authCtx = useContext(AuthContext);
  const [isCartOpen, setCartOpen] = useState(false);
  // const isToken = localStorage.getItem('token')
  const closeHandler = () => {
    setCartOpen(false);
  };
  const openHandler = () => {
    setCartOpen(true);
  };

  return (
    <ContextProvider>
      {isCartOpen && <Cart onClose={closeHandler} />}
      <Header onOpen={openHandler} />
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/product-detail/:id" element={<ProductsPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/store"
          element={
            authCtx.isLoggedIn ? (
              <>
                <main>
                  <Products />
                </main>
                <Button onClick={openHandler}>Open Cart</Button>
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/about/*" element={<About />} />
        <Route path="/contact/*" element={<ContactUs />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthForm />} />}
        <Route path="*" element={<StartingPage />}/>
      </Routes>
      <Footer />
    </ContextProvider>
  );
};

export default App;
