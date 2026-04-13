import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const dropdowns = {
  workshops: [
    { label: 'Workshop Status', path: '/status' },
    { label: 'Workshop Types', path: '/types' },
    { label: 'Propose Workshop', path: '/propose' },
  ],
  statistics: [
    { label: 'Workshop Statistics', path: '/statistics' },
    { label: 'Team Statistics', path: '/teams' },
  ],
  profile: [
    { label: 'View Profile', path: '/profile' },
    { label: 'Change Password', path: '/change-password' },
    { label: 'Logout', path: '/logout' },
  ],
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggleDropdown(name) {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm" ref={ref}>
      <div className="flex items-center justify-between px-4 h-14">

        <NavLink to="/" className="font-bold text-gray-900 tracking-tight">
          FOSSEE <span className="text-[#e85d04]">Workshops</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded text-sm transition-colors hover:bg-[#e85d04] hover:text-white ${
                isActive ? 'text-gray-900 font-medium' : 'text-gray-600'
              }`
            }
          >
            Home
          </NavLink>

          {['workshops', 'statistics'].map(key => (
            <div key={key} className="relative">
              <button
                onClick={() => toggleDropdown(key)}
                className="px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-[#e85d04] hover:text-white transition-colors capitalize flex items-center gap-1"
              >
                {key}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {activeDropdown === key && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-md py-1 min-w-44 z-50">
                  {dropdowns[key].map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <button
              onClick={() => toggleDropdown('profile')}
              className="flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
            >
              <div className="w-7 h-7 rounded-full bg-[#e85d04] text-white text-xs font-medium flex items-center justify-center">
                AK
              </div>
              Aryan Kalra
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {activeDropdown === 'profile' && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-md py-1 min-w-40 z-50">
                {dropdowns.profile.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="open menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 pb-2 bg-white">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block px-5 py-2.5 text-sm text-gray-600">Home</NavLink>
          <p className="px-5 pt-3 pb-1 text-xs text-gray-400 uppercase tracking-wide">Workshops</p>
          {dropdowns.workshops.map(item => (
            <NavLink key={item.path} to={item.path} onClick={() => setMenuOpen(false)} className="block px-5 py-2 text-sm text-gray-600">
              {item.label}
            </NavLink>
          ))}
          <p className="px-5 pt-3 pb-1 text-xs text-gray-400 uppercase tracking-wide">Statistics</p>
          {dropdowns.statistics.map(item => (
            <NavLink key={item.path} to={item.path} onClick={() => setMenuOpen(false)} className="block px-5 py-2 text-sm text-gray-600">
              {item.label}
            </NavLink>
          ))}
          <div className="mx-5 my-2 h-px bg-gray-100" />
          <div className="flex items-center gap-2 px-5 py-2 text-gray-500 text-sm">
            <div className="w-6 h-6 rounded-full bg-[#e85d04] text-white text-xs font-medium flex items-center justify-center">AK</div>
            Aryan Kalra
          </div>
        </div>
      )}
    </nav>
  )
}