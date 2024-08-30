import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart } from "../../apis/api.js";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart();
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching cart", error);
                alert("Failed to fetch cart");
            }
        };
        fetchCart();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        try {
          await removeFromCart(productId);
            alert("Product removed from cart");
        } catch (error) {
            console.error("Error removing from cart", error);
            alert("Failed to remove product from cart");
          }
        };

    if (!cart) {
        return <p>Loading cart...</p>;
    }
    
    return (
        <div>
          <h1>Cart</h1>
          {cart.products.length > 0 ? (
            cart.products.map((product) => (
              <div key={product.id} className="cart-product">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Manufacturer: {product.manufacturer}</p>
                <button onClick={() => handleRemoveFromCart(product.id)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      );
    };

export default Cart;