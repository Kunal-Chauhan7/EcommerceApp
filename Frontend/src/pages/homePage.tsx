import { useEffect, useState } from "react";
import Card from "../components/card";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/products");
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-grid">
      {
        products.map((product: any) => (
          <Link to={`/product/${product.id}`} key={product.id}>
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            isAvailable={product.available}
            brand={product.brand}
          />
          </Link>
        ))
      }
    </div>
  );
};

export default HomePage;