import { useState } from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import ProductDetails from './pages/ProductDetails';


function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/product/:id" element={<ProductDetails/>} />
    </Routes>
   </Router>
  )
}

export default App
