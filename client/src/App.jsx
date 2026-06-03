import PostDetail from './components/PostDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { About } from './pages/About'
import { Project } from './pages/Project'
import { Post } from './pages/Post'
import { Toaster } from 'sonner'
import EditPost from './components/Posts/EditPost'
import Login  from './pages/Login'
import SignUp from './pages/SignUp'
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from './pages/ResetPassword'




export default function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Project" element={<Project/>}/>
          <Route path="/Post" element={<Post/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Forgot-Password" element={<ForgetPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path="/blog/:slug" element={<PostDetail />}/>
          <Route path="/edit/:slug" element={<EditPost/>} />
        </Routes>
      </Router>
     <Toaster  position="top-right" />
    </main>
  )
}
