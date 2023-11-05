import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import ContactUs from './pages/contactus'
import SignUp from './pages/signup'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}
