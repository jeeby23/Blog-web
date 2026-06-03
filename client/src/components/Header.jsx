import { useEffect, useState } from 'react'
import { Menu, PowerOffIcon, User, X } from 'lucide-react'
import BaseLayout from '../Layout/BaseLayout'
import { Link, useNavigate } from 'react-router-dom'
import { ToggleLeft, ToggleRight } from 'lucide-react'
import { useAuthStore } from '../store/auth'
const navLinks = [
  // { name: 'Blog', path: '/blog' },
  { name: 'Project', path: '/project' },
  { name: 'About', path: '/About' },
  { name: 'Post', path: '/post' },
]

import { useAuthDropdown } from '../hooks/useAuthDropdown'
import api from '../utils/api'

export default function Header() {
  const navigte = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout, showDropdown, setShowDropdown, dropdownRef } = useAuthDropdown()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      logout() 
      navigate('/Login')
    }
  }
  return (
    <header>
      <BaseLayout>
        <nav className="flex  justify-between">
          <nav className="flex items-center justify-between w-full">
            {/* LEFT */}
            <div>
              <Link to="/">BrandLogo</Link>
            </div>

            <ul className="hidden md:flex gap-3.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}

              <li className="flex items-center">
                <button onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? (
                    <ToggleRight size={40} color="green" />
                  ) : (
                    <ToggleLeft size={40} color="gray" />
                  )}
                </button>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <User />
                    {/* <p>{user.email}</p> */}
                  </div>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-50">
                      <p className="text-sm  text-gray-500 rounded-xl hover:bg-green-400  mb-2 w-43 p-2">{user.email}</p>

                      <Link
                        to="/profile"
                        className="block text-sm bg-blue-300 text-gray-500 rounded-xl p-2 hover:bg-blue-400 mb-2"
                      >
                        View Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left bg-red-300 text-gray-500 rounded-xl p-2 hover:bg-red-400"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2 ">
                  <Link to="/Login" className='border border-dashed p-2 rounded-full'>Login</Link>
                  <Link to="/SignUp" className='border border-dashed p-2 rounded-full'>Get Started</Link>
                </div>
              )}
            </div>
          </nav>

          <section>
            <nav>
              <div className="p-4 block md:hidden " onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </nav>
            {menuOpen && (
              <div className=" md:hidden absolute bg-gray-100 left-0 w-full shadow-2xl p-4 cursor-pointer">
                <ul className="flex flex-col gap-3.5">
                  {navLinks.map((link, index) => (
                    <Link to={link.path}>
                      <li key={index} className="hover:bg-gray-200 p-2 ">
                        {link.name}
                      </li>
                    </Link>
                  ))}
                  <li className="text-center ">
                    <button onClick={() => setDarkMode(!darkMode)}>
                      {darkMode ? (
                        <ToggleRight size={40} color="green" />
                      ) : (
                        <ToggleLeft size={40} color="gray" />
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </section>
        </nav>
      </BaseLayout>
    </header>
  )
}
