import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchArtworks } from '../lib/artworks'
import ArtCard from '../components/ArtCard'

const TAGS = ['tümü', 'fotoğraf', 'resim', 'baskı', 'heykel', 'landscape', 'botanik', 'siyah-beyaz', 'portre', 'soyut', 'deniz']

function Gallery() {
  const [searchParams] = useSearchParams()
  const [activeTag, setActiveTag] = useState(searchParams.get('category') || 'tümü')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetchArtworks({
      tag: activeTag === 'tümü' ? null : activeTag,
      search: search.trim() || null
    })
      .then(setArtworks)
      .finally(() => setLoading(false))
  }, [activeTag, search])

  return (
    <div style={{ paddingTop: '4.2rem' }}>

      {/* Hero */}
      <div style={{
        padding: '3rem 2rem 2rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 300, lineHeight: 1.1
          }}>
            Fine Art<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Koleksiyonu</em>
          </h1>
          <p style={{
            fontSize: '.7rem', letterSpacing: '.12em',
            textTransform: 'uppercase', color: 'var(--muted)', marginTop: '.5rem'
          }}>
            Özgün eserler, sınırlı edisyonlar
          </p>
        </div>
        <div style={{ fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {loading ? '...' : `${artworks.length} eser`}
        </div>
      </div>

      {/* Arama + Filtre */}
      <div style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '.8rem',
        padding: '.9rem 2rem',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: '4.2rem', zIndex: 100,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(6px)'
      }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <input
            type="text"
            placeholder="Ara: landscape, botanik..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '.48rem 2.2rem .48rem 1rem',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '.95rem', fontStyle: 'italic',
              color: 'var(--ink)', width: '240px', outline: 'none'
            }}
          />
          <span style={{
            position: 'absolute', right: '.7rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--muted)'
          }}>⌕</span>
        </div>

        <div style={{ width: 1, height: 22, background: 'var(--border)', flexShrink: 0 }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.45rem' }}>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: '.35rem .85rem',
                border: `1px solid ${activeTag === tag ? 'var(--ink)' : 'var(--border)'}`,
                background: activeTag === tag ? 'var(--ink)' : 'none',
                color: activeTag === tag ? '#fff' : 'var(--muted)',
                fontSize: '.64rem', letterSpacing: '.12em',
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all .2s', whiteSpace: 'nowrap'
              }}
            >
              {tag}
            </button>
          ))}
          {(search || activeTag !== 'tümü') && (
            <button
              onClick={() => { setSearch(''); setActiveTag('tümü') }}
              style={{
                padding: '.35rem .85rem',
                border: '1px solid #ccc', background: 'none',
                color: '#ccc', fontSize: '.64rem', letterSpacing: '.12em',
                textTransform: 'uppercase', cursor: 'pointer'
              }}
            >
              ✕ Temizle
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div style={{ margin: '0 2rem' }}>
        {loading ? (
          <div style={{
            textAlign: 'center', padding: '6rem 2rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem', color: '#bbb', fontStyle: 'italic'
          }}>
            Yükleniyor…
          </div>
        ) : artworks.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '6rem 2rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem', color: '#bbb', fontStyle: 'italic'
          }}>
            "{search || activeTag}" için sonuç bulunamadı
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            borderTop: '1px solid var(--border)'
          }}>
            {artworks.map((artwork, i) => (
              <ArtCard
                key={artwork.id}
                artwork={artwork}
                index={i}
                onTagClick={(tag) => setActiveTag(tag)}
                onClick={() => navigate(`/product/${artwork.slug}`)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Gallery