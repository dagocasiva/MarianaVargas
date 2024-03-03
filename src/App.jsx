import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import '../styles/styles.scss'

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ItemListContainer/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    
    </>
  )
}

export default App
