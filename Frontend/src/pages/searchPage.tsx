import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../components/card";

type SearchProduct = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  brand: string;
};

const SearchPage = () => {
    const [products, setProducts] = useState<SearchProduct[]>([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("keyword") || "";

    useEffect(() => {
      const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/products/search?keyword=${encodeURIComponent(query)}`);
        const data = await response.json();
  
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      };

      fetchProducts();
    }, [query]);
  
    return (
      <div className="products-grid">
        {
          products.map((product) => (
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
}

export default SearchPage;