import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Gallery from './pages/Gallery'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  )
}

export default App