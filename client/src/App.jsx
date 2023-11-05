import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import ContactUs from './pages/contactus'
import SignUp from './pages/signup'
import Header from './components/header'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}
