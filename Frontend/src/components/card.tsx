
import '../styles/card.css'

type CardProps = {
    id: number;
    name: string;
    price: number;                     
    isAvailable: boolean;
    brand: string;
  };

const Card = ({ id, name, price, isAvailable, brand }: CardProps) => {
  return (
    <article className="product-card">
      <div className="card-head">
        <p className="product-id">Product #{id}</p>
        <span className={`availability ${isAvailable ? 'in-stock' : 'out-of-stock'}`}>
          {isAvailable ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <h3 className="product-name">{name}</h3>

      <p className="product-brand">
        Brand: <strong>{brand}</strong>
      </p>

      <p className="product-price">${price.toFixed(2)}</p>
    </article>
  )
}

export default Card