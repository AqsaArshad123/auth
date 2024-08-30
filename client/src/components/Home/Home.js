import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts,addToCart, createCart, getCart } from "../../apis/api.js";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleSearch = () => {
    navigate("/product-details");
  };

  const handleManageProducts = () => {
    navigate("/manage-products");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Failed to add product to cart");
    }
  };

  const handleViewCart = async () => {
    try {
      const response = await getCart();
      if (response.data) {
        navigate("/cart");
      } else {
        alert("No cart found, creating a cart");
        await createCart();
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      <button onClick={handleSearch}>Search Product by ID</button>
      <button onClick={handleManageProducts}>Manage Products</button>
      <button onClick={handleProfileClick}>Profile</button>
      <button onClick={handleViewCart}>View Cart</button>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Manufacturer: {product.manufacturer}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleAddToCart(product.id)}>
              Add to cart
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
