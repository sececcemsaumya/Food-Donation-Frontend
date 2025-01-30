import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router'
import SignIn from './Components/SignIn.jsx'
import HeroSection from './Components/HeroSection.jsx'
import OrganizationLogin from './Components/OrganizationLogin.jsx'
import SignUp from './Components/SignUp.jsx'
import OrgRegistration from './Components/OrgRegistration.jsx'
import DonorRegistration from './Components/DonorRegistration.jsx'
import DonorHome from './Components/DonorHome.jsx'
import FoodDonateForm from './Components/FoodDonateForm.jsx'
import DonationHistory from './Components/DonationHistory.jsx'
import OrganizationDashboard from './Components/OrganizationDashboard.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection/>}/>
        <Route path ="/signin" element={<SignIn/>}/>
        <Route path = "/orglogin" element={<OrganizationLogin/>}/>
        <Route path = "/signup" element={<SignUp/>}/>
        <Route path = "/orgreg" element={<OrgRegistration/>}/>
        <Route path = "/donreg" element={<DonorRegistration/>}/>
        <Route path = "/donorhome" element={<DonorHome/>}/>
        <Route path = "/donateform" element={<FoodDonateForm/>}/>
        <Route path = "/history" element={<DonationHistory/>}/>
        <Route path = "/orgdashboard" element={<OrganizationDashboard/>}/>
      </Routes>
    </BrowserRouter>
    
 
)
