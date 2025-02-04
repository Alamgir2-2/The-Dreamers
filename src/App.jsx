import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/HomePage'
import Header from './Components/Layout/Header/Header'
import Footer from './Components/Layout/Footer'
import BranchPage from './Components/Layout/Branches/BranchPage'

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        {/* <div className='mt-5'> */}
        <Route path='/' element={<Home/>}></Route>
        <Route path="/branches/:id" element={<BranchPage></BranchPage>} />
        {/* </div> */}
      </Routes>
      <Footer></Footer>
     
    </div>
  )
}

export default App
