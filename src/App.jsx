import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
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
import Members from './Components/AboutUs/Member'
import Registration from './Authentication/Registration'
import Login from './Authentication/Login'
import ScrollToTop from './Components/Layout/ScrollTop'
import TestDonors from './Components/TestDonors'
import Profile from './Components/Profile/Profile'
import AdminLogin from './Admin/AdminLogin'
import AdminLayout from './Admin/AdminLayout'
import Dashboard from './Admin/Dashboard'
import ManageBloodBank from './Admin/ManageBloodBank'
import ManageEvents from './Admin/ManageEvents'
import ManageMembers from './Admin/ManageMembers'
import ManageBranches from './Admin/ManageBranches'
import ManageMessages from './Admin/ManageMessages'
import ProtectedRoute from './Admin/ProtectedRoute'

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Header></Header>
      <ScrollToTop/>
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
        <Route path="/about/members" element={<Members></Members>} />
        <Route path="/test-donors" element={<TestDonors />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blood-bank" element={<ManageBloodBank />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="members" element={<ManageMembers />} />
          <Route path="branches" element={<ManageBranches />} />
          <Route path="messages" element={<ManageMessages />} />
        </Route>
      </Routes>
      <Footer></Footer>

    </div>
  )
}

export default App
