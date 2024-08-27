import React, { useEffect, useState } from "react";
import { getProducts } from "../apis/api.js"; 

const Home = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  fetchProducts();
}, []);

return (
  <div>
    <h1>Welcome to the Product Store</h1>
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Manufacturer: {product.manufacturer}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  </div>
);
};

export default Home;