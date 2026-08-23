import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { category } from "../../types";

const categories = Object.values(category).filter(
  (value): value is string => typeof value === "string",
);

const humanReadableCategories = (category: string)=>{
  let formattedCategory = category.replace('_',' & ').toLowerCase();
  return formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1);
} 


const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const requestdata = new FormData();
    
    try {
      
      const image = formData.get("image");

      if(!(image instanceof File))
        throw new Error("Please Select a Image");
      
      let product = {
        name: formData.get("name"),
        brand: formData.get("brand"),
        category: formData.get("category"),
        description: formData.get("description"),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
        releaseDate: formData.get("releaseDate"),
        available: formData.has("available"),
      };


      requestdata.append(
        "product",
        new Blob([JSON.stringify(product)],{
          type: "application/json",
        })
      )

      requestdata.append("image",image);

      const response = await fetch("http://localhost:8081/api/product", {
        
        method: "POST",
        body: requestdata,

      });

      if (!response.ok) {
        throw new Error("Unable to add product");
      }

      setMessage("Product added successfully.");
      form.reset();
    } catch (submitError) {
      console.error("Error adding product:", submitError);
      setError("Unable to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="add-product-page">
      <div className="add-product-intro">
        <p className="product-category">CATALOG</p>
        <h1>Add a product</h1>
        <p>Enter the product details below to add a new item to your store.</p>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-field form-field-wide">
          <label htmlFor="name">Product name</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div className="form-field">
          <label htmlFor="brand">Brand</label>
          <input id="brand" name="brand" type="text" required />
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue="" required>
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{humanReadableCategories(category)}</option>
            ))}
          </select>
        </div>

        <div className="form-field form-field-wide">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4} required />
        </div>

        <div className="form-field">
          <label htmlFor="price">Price</label>
          <input id="price" name="price" type="number" min="0" step="0.01" required />
        </div>

        <div className="form-field">
          <label htmlFor="quantity">Quantity</label>
          <input id="quantity" name="quantity" type="number" min="0" step="1" required />
        </div>

        <div className="form-field">
          <label htmlFor="releaseDate">Release date</label>
          <input id="releaseDate" name="releaseDate" type="datetime-local" required />
        </div>

        <div className="form-field">
          <label htmlFor="image">Product image</label>
          <input id="image" name="image" type="file" accept="image/*" required />
        </div>

        <label className="availability-toggle">
          <input name="available" type="checkbox" defaultChecked />
          <span>Product is available</span>
        </label>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate("/")}>Cancel</button>
          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? "Adding product..." : "Add product"}
          </button>
        </div>

        {message && <p className="form-success" role="status">{message}</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </section>
  );
};

export default AddProduct;