import { useState } from 'react'
import { makeSVG } from '../lib/makeSVG'

function ArtCard({ artwork, index, onClick, onTagClick }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--surface)' : 'var(--bg)',
        transition: 'background .2s',
        animation: `fadeUp .4s ease ${index * 0.04}s both`
      }}
    >
   {/* Görsel */}
<div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative', background: 'var(--surface)' }}>
  {artwork.image_url
    ? <img src={artwork.image_url} alt={artwork.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    : <div dangerouslySetInnerHTML={{ __html: makeSVG(index) }}
        style={{ width: '100%', height: '100%' }} />
  }
        {/* Edisyon badge */}
        <div style={{
          position: 'absolute', top: '.75rem', left: '.75rem',
          background: 'var(--ink)', color: '#fff',
          fontSize: '.52rem', letterSpacing: '.18em',
          textTransform: 'uppercase', padding: '.22rem .6rem'
        }}>
          {artwork.edition}
        </div>

        {/* Favori butonu */}
        <button
          onClick={e => { e.stopPropagation(); setLiked(!liked) }}
          style={{
            position: 'absolute', top: '.65rem', right: '.65rem',
            background: 'rgba(255,255,255,.88)',
            border: `1px solid ${liked ? 'var(--red)' : 'var(--border)'}`,
            width: 30, height: 30,
            display: hovered || liked ? 'flex' : 'none',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '.9rem', color: liked ? 'var(--red)' : 'var(--muted)',
            cursor: 'pointer'
          }}
        >
          {liked ? '♥' : '♡'}
        </button>
      </div>

      {/* Bilgi */}
      <div style={{ padding: '.85rem 1rem 1rem' }}>
        <div style={{ fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.2rem' }}>
          {artwork.artist}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', marginBottom: '.45rem', lineHeight: 1.2 }}>
          {artwork.title}
        </div>

        {/* Etiketler */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginBottom: '.7rem' }}>
          {artwork.tags.map(tag => (
            <span
              key={tag}
              onClick={e => { e.stopPropagation(); onTagClick(tag) }}
              style={{
                fontSize: '.56rem', letterSpacing: '.1em',
                textTransform: 'uppercase', color: 'var(--gold)',
                padding: '.18rem .45rem',
                border: '1px solid rgba(154,122,74,.22)',
                cursor: 'pointer'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem' }}>
            {artwork.price}
          </div>
          <div style={{ fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {artwork.type}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtCard