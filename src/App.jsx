import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import { useCart } from './hooks/useCart'
import Gallery from './pages/Gallery'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  const { count } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Navbar cartCount={count} onCartClick={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  )
}

export default App