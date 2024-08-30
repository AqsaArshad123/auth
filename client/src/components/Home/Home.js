import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts,addToCart, createCart, getCart } from "../../apis/api.js";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

 useEffect(() => {
    const initializeCart = async () => {
      try {
        const cartResponse = await getCart(token);
        if (cartResponse.status === 404) {
          const newCart = await createCart(token);
          setCart(newCart.data);
        } else {
          setCart(cartResponse.data);
        }
      } catch (error) {
        console.error("Error initializing cart", error);
      }
    };
    initializeCart();
    fetchProducts();
  }, );

  const fetchProducts = async () => {
    try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    

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
      await addToCart(productId, token);
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Failed to add product to cart");
    }
  };

  const handleViewCart = async () => {
    try {
      const response = await getCart(token);
      if (response.data) {
        navigate("/cart");
      } else {
        alert("No cart found, creating a cart");
        await createCart(token);
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
