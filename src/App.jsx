import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import ItemDetailContainer from './components/ItemDetailContainer.jsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import '../styles/styles.scss'

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ItemListContainer/>}></Route>
        <Route path='/vestidos/:colorId' element={<ItemListContainer/>}></Route>
        <Route path='/item/:itemId' element={<ItemDetailContainer/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    
    </>
  )
}

export default App
