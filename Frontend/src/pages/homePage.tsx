import { useEffect, useState } from "react";
import Card from "../components/card";


const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/products");
      const data = await response.json();

      console.log(data);

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log("working");
  }, []);

  return (
    <div className="products-grid">
      {
        products.map((product: any) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            isAvailable={product.available}
            brand={product.brand}
          />
        ))
      }
    </div>
  );
};

export default HomePage;