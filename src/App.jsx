import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/HomePage'
import Header from './Components/Layout/Header/Header'
import Footer from './Components/Layout/Footer'
import BranchPage from './Components/Layout/Branches/BranchPage'
import BloodGroupPage from './Components/BloodGroups/BloodGroup'
import BloodBank from './Components/BloodBank/BloodBank'
import Events from './Components/Events/Events'
import Contact from './Components/Contact/Contact'
import Advisory from './Components/AboutUs/Advisory'
import AboutDreamers from './Components/AboutUs/AboutDreamers'
import DirectorSpace from './Components/AboutUs/DirectorSpeech'
// import AboutUs from './Components/AboutUs/AboutUs'

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/branches/:id" element={<BranchPage></BranchPage>} />
        <Route path="/blood-groups/:bloodGroup" element={<BloodGroupPage></BloodGroupPage>} />
        <Route path="/blood" element={<BloodBank></BloodBank>} />
        <Route path="/events" element={<Events></Events>} />
        {/* <Route path="/about" element={<AboutUs></AboutUs>} /> */}
        <Route path="/contact" element={<Contact></Contact>} />


        {/* About Us */}
        <Route path="/about/advisory" element={<Advisory></Advisory>} />
        <Route path="/about/the-dreamers" element={<AboutDreamers></AboutDreamers>} />
        <Route path="/about/director-speech" element={<DirectorSpace></DirectorSpace>} />

      </Routes>
      <Footer></Footer>

    </div>
  )
}

export default App
