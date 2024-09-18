import React, { useState } from "react";
import { getProductById } from "../../apis/api.js";

const ProductDetail = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await getProductById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  return (
    <div>
      <h1>Search Product by ID</h1>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID"
      />
      <button onClick={handleSearch}>Search</button>
      {product && (
        <div className="product-detail">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Manufacturer: {product.manufacturer}</p>
          <p>Stock: {product.stock}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
