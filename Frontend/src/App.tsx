import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import About from './pages/about'
import AddProduct from './pages/addProduct'
import CategoryPage from './pages/categoryPage'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import Cart from './pages/cart'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
