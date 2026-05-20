import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import BaseLayout from '../Layout/BaseLayout'
import { Link } from 'react-router-dom'
const navLinks = [
  { name: 'Blog', path: '/blog' },
  { name: 'Project', path: '/project' },
  { name: 'About', path: '/About' },
  { name: 'Post', path: '/post' },
]

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  return (
    <header>
      <BaseLayout>
        <nav className="flex justify-between">
          <div>
            <Link to="/">
            BrandLogo
            </Link>
            </div>
          <div className="hidden md:block">
            <ul className="flex  gap-3.5">
              {navLinks.map((link, index) => (
                <Link to={link.path}>
                  <li key={index}>{link.name}</li>
                </Link>
              ))}
              <li>
                <button onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? 'Light' : 'Dark'}
                </button>
              </li>
            </ul>
          </div>

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
                      {darkMode ? 'Light' : 'Dark'}
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
