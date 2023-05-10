import React from "react";
import { useParams } from "react-router-dom";
import "./ProductsPage.css";

const PRODUCTS_ARR = [
  {
    id: 1,
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    id: 2,
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    id: 3,
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    id: 4,
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const ProductsPage = () => {
  const params = useParams();
  const product = PRODUCTS_ARR.find((product) => product.id === +params.id);
  return (
    <React.Fragment>
      <section className="products-page">
        <img src={product.imageUrl} alt={product.title} />
        <div className="product-detail">
          <p><span>Product:</span></p>
          <h2>{product.title}</h2>
          <h3><span>Price: </span>${product.price}</h3>
          <h4>Lorem ipsum</h4>
        </div>
      </section>
      <hr />
      <section className="reviews">
        <h3>Reviews</h3>
        <ul className="review-list">
          <li>⭐⭐⭐⭐ <span>Nice Work</span></li>
          <li>⭐⭐⭐ <span>Good</span></li>
          <li>⭐⭐⭐⭐<span>Nice Product</span></li>
        </ul>
      </section>
    </React.Fragment>
  )
};

export default ProductsPage;