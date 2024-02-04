import React, { useState, useEffect } from "react";
import ProductRow from "../molecules/productrow";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.products);
      });
  }, []);
  return (
    <div id="products" className="flex flex-col">
      <div className="font-bold">Products</div>
      {products.map((product) => (
        <ProductRow product={product} />
      ))}
    </div>
  );
};

export default Products;
