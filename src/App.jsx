import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/HomePage'
import Header from './Components/Layout/Header/Header'
import Footer from './Components/Layout/Footer'
import BranchPage from './Components/Layout/Branches/BranchPage'
import BloodGroupPage from './Components/BloodGroups/BloodGroup'

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/branches/:id" element={<BranchPage></BranchPage>} />
        <Route path="/blood-groups/:bloodGroup" element={<BloodGroupPage></BloodGroupPage>} />
      </Routes>
      <Footer></Footer>
     
    </div>
  )
}

export default App
