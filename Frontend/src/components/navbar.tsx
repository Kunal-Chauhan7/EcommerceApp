import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate(`/search?keyword=${encodeURIComponent(query.trim())}`)
    }

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

                <form className="nav-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search products"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <Link to="/cart" className="cart-link">
                    <span className="cart-icon">🛒</span>
                </Link>
            </nav>
        </header>
  )
}
