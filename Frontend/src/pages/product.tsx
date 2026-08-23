import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProductData = {
  available: boolean;
  brand: string;
  category: string;
  description: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  images: ProductImage[];
};

type ProductImage = {
  id: number;
  imageData: string;
  imageName: string;
  imageType: string;
};

const Product = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getProduct = async () => {
      if (!id) {
        setError("Product ID is missing.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8081/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data: ProductData = await response.json();
        setProduct(data);
      } catch (fetchError) {
        console.error("Error fetching product data:", fetchError);
        setError("Unable to load this product.");
      }
    };

    getProduct();
  }, [id]);

  if (error) {
    return <p className="product-message product-error">{error}</p>;
  }

  if (!product) {
    return <p className="product-message">Loading product...</p>;
  }

  return (
    <article className="product-detail">
      <header className="product-detail-header">
        <div>
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-brand">by {product.brand}</p>
        </div>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
      </header>

      {product.images.length > 0 && (
        <section className="product-image-gallery" aria-label="Product images">
          {product.images.map((image) => (
            <img
              key={image.id}
              src={`data:${image.imageType};base64,${image.imageData}`}
              alt={image.imageName}
              className="product-detail-image"
            />
          ))}
        </section>
      )}

      <div className="product-detail-status">
        <span className={product.available ? "in-stock" : "out-of-stock"}>
          {product.available ? "Available" : "Unavailable"}
        </span>
        <span>{product.quantity} in stock</span>
      </div>

      <section className="product-detail-section">
        <h2>Description</h2>
        <p>{product.description}</p>
      </section>

      <dl className="product-detail-meta">
        <div>
          <dt>Product ID</dt>
          <dd>{product.id}</dd>
        </div>
        <div>
          <dt>Release date</dt>
          <dd>{new Date(product.releaseDate).toLocaleDateString()}</dd>
        </div>
      </dl>
    </article>
  );
}

export default Product;