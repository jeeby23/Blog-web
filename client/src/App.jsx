import PostDetail from './components/PostDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { About } from './pages/About'
import { Project } from './pages/Project'
import { Post } from './pages/Post'
import { Toaster } from 'sonner'




export default function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Project" element={<Project/>}/>
          <Route path="/Post" element={<Post/>}/>
          <Route path="/blog/:id" element={<PostDetail />}/>
        </Routes>
      </Router>
     <Toaster richColors position="top-right" />
    </main>
  )
}
