import React from "react";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
          <h1>Welcome to the Product Store</h1>
          <Link to="/products">Continue Shopping</Link>
    </div>
  );
}

export default Home;
