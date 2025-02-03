import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/HomePage'
import Header from './Components/Layout/Header/Header'

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
     
    </div>
  )
}

export default App
