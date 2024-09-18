import React, { useState, useEffect } from "react";
import { createProduct, updateProduct, deleteProduct } from "../../apis/api.js";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    manufacturer: "",
    stock: "",
  });

  const navigate = useNavigate();
  const [action, setAction] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await createProduct(product);
      alert("Product created successfully");
      setProduct({
        id: "",
        name: "",
        price: "",
        description: "",
        manufacturer: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error creating product", error);
      if (error.response.status === 401) {
        alert("You are not authorized to create products. Please log in.");
        navigate("/");
      } else {
        alert("Failed to create product");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(product.id, product);
      alert("Product updated successfully");
      setProduct({
        id: "",
        name: "",
        price: "",
        description: "",
        manufacturer: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error updating product", error);
      if (error.response.status === 401) {
        alert("You are not authorized to update products. Please log in.");
        navigate("/");
      } else {
        alert("Failed to update product");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      alert("Product deleted successfully");
      setProduct({
        id: "",
        name: "",
        price: "",
        description: "",
        manufacturer: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error deleting product", error);
      if (error.response.status === 401) {
        alert("You are not authorized to delete products. Please log in.");
        navigate("/");
      } else {
        alert("Failed to delete product");
      }
    }
  };

  const renderForm = () => {
    if (action === "create") {
      return (
        <>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="manufacturer"
            value={product.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
          />
          <button onClick={handleCreate}>Create Product</button>
        </>
      );
    } else if (action === "update") {
      return (
        <>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            placeholder="Product ID"
          />
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="manufacturer"
            value={product.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
          />
          <button onClick={handleUpdate}>Update Product</button>
        </>
      );
    } else if (action === "delete") {
      return (
        <>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            placeholder="Product ID"
          />
          <button onClick={handleDelete}>Delete Product</button>
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Manage Products</h1>
      <button onClick={() => setAction("create")}>Create Product</button>
      <button onClick={() => setAction("update")}>Update Product</button>
      <button onClick={() => setAction("delete")}>Delete Product</button>
      {renderForm()}
    </div>
  );
};

export default ProductManagement;
