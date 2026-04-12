import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/?search=${search}`)
    }
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.1rem 2rem',
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)'
    }}>

      <Link to="/" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.4rem', fontWeight: 600,
        letterSpacing: '.22em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '.7rem',
        color: 'var(--ink)'
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10" stroke="#111" strokeWidth="1.2"/>
          <ellipse cx="11" cy="11" rx="4.5" ry="10" stroke="#111" strokeWidth="1"/>
          <line x1="1" y1="11" x2="21" y2="11" stroke="#111" strokeWidth="1"/>
        </svg>
        Fossil Garden
      </Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        {['Fotoğraf', 'Resim', 'Baskı', 'Heykel'].map(cat => (
          <li key={cat}>
            <Link to={`/?category=${cat.toLowerCase()}`} style={{
              fontSize: '.68rem', letterSpacing: '.16em',
              textTransform: 'uppercase', color: 'var(--muted)'
            }}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '.42rem 2rem .42rem .85rem',
              fontSize: '.7rem', color: 'var(--ink)',
              width: '190px', outline: 'none'
            }}
          />
          <span style={{
            position: 'absolute', right: '.6rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--muted)'
          }}>⌕</span>
        </div>

        <button style={{
          background: 'none', border: 'none',
          fontSize: '.68rem', letterSpacing: '.14em',
          textTransform: 'uppercase', color: 'var(--muted)'
        }}>
          Sepet (0)
        </button>
      </div>

    </nav>
  )
}

export default Navbar