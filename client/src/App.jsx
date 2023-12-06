import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import ContactUs from './pages/contactus'
import SignUp from './pages/signup'
import Header from './components/Header'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/create-listing' element={<CreateListing/>}/>
      <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
