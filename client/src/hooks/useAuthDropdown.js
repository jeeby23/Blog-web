import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../store/auth'

export const useAuthDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return {
    user,
    logout,
    showDropdown,
    setShowDropdown,
    dropdownRef,
  }
}