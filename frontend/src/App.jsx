import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Product from './pages/Product'
import Footer from './components/Footer'
import About from "./pages/About"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/product" element={<Product/>} />
      <Route path="/About" element={<About/>} />

    </Routes>
    <Footer />
    
    </BrowserRouter>
  )
}

export default App
