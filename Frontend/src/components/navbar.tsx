import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
        <header className="navbar-wrap">
            <nav className="navbar" aria-label="Main navigation">
                <a
                    className="brand-link"
                    href="https://portfolio-rose-three-51.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Kunal Chauhan
                </a>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/add-product">Add Product</Link>
                    <Link to="/category">Category</Link>
                    <Link to="/about">About</Link>
                </div>

                <form className="nav-search" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" id="search" placeholder="Search products" />
                    <button type="submit">Search</button>
                </form>
                <Link to="/cart" className="cart-link">
                    <span className="cart-icon">🛒</span>
                </Link>
            </nav>
        </header>
  )
}
