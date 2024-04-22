import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import '../styles/styles.scss'
import AgregarVestido from './components/AgregarVestido.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ItemListContainer/>}></Route>
        <Route path='/nuevo-vestido' element={<AgregarVestido/>}></Route>
        <Route path="/not-found" element={ <h2 className='notFound'>Not found</h2> }/>
        <Route path="*" element={ <Navigate to={"/not-found"}/> }/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
