import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../apis/api.js";

const Cart = () => {
    const [cart, setCart] = useState({ products: [] });
    const token = localStorage.getItem("token");

    useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart(token);
        console.log("Cart data:", response.data);
        setCart(response.data || { products: [] });
      } catch (error) {
        console.error("Error fetching cart", error);
        alert("Failed to fetch cart");
      }
    };
    fetchCart();
    }, []);
    
    const handleRemoveFromCart = async (productId) => {
        try {
          await removeFromCart(productId, token);
          alert("Product removed from cart");
          setCart((prevCart) => ({
            ...prevCart,
            products: prevCart.products.filter((p) => p.id !== productId),
          }));
        } catch (error) {
          console.error("Error removing from cart", error);
          alert("Failed to remove product from cart");
        }
      };

    return (
        <div>
            <h1>Cart</h1>
            {cart.products.map((product) => (
                <div key={product.id} className="cart-product">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Manufacturer: {product.manufacturer}</p>
                    <button onClick={() => handleRemoveFromCart(product.id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
