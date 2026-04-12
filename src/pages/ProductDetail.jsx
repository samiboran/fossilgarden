import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ARTWORKS } from '../lib/artworks'
import { makeSVG } from '../lib/makeSVG'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const artwork = ARTWORKS.find(a => a.id === parseInt(id))
  const [activeSize, setActiveSize] = useState('61 × 76 cm')
  const [openAcc, setOpenAcc] = useState('desc')

  if (!artwork) return (
    <div style={{ paddingTop: '8rem', textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--muted)' }}>
      Eser bulunamadı
    </div>
  )

  const sizes = ['40 × 50 cm', '61 × 76 cm', '76 × 102 cm']
  const accs = [
    { key: 'desc', label: 'Eser Hakkında', content: artwork.desc },
    { key: 'specs', label: 'Teknik Detaylar', content: null },
    { key: 'ship', label: 'Kargo & İade', content: 'Yurt içi kargo ücretsiz, 3–5 iş günü. Eserler özel ambalajla gönderilir. 14 gün içinde iade edilebilir.' },
    { key: 'cert', label: 'Sertifika', content: 'Her eser sanatçı imzalı, numaralı orijinallik sertifikası ile gelir.' },
  ]

  return (
    <div style={{ paddingTop: '4.2rem' }}>

      {/* Breadcrumb */}
      <div style={{
        padding: '1.2rem 2rem .4rem',
        display: 'flex', gap: '.45rem', alignItems: 'center',
        fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase',
        color: 'var(--muted)', borderBottom: '1px solid var(--border)'
      }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Fossil Garden</span>
        <span style={{ opacity: .35 }}>/</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          {artwork.cat.charAt(0).toUpperCase() + artwork.cat.slice(1)}
        </span>
        <span style={{ opacity: .35 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{artwork.title}</span>
      </div>

      {/* Ana grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '55% 45%',
        maxWidth: 1300, margin: '0 auto', padding: '0 2rem 6rem'
      }}>

        {/* Sol — görsel */}
        <div style={{
          position: 'sticky', top: '4.5rem',
          height: 'calc(100vh - 4.5rem)',
          display: 'flex', flexDirection: 'column',
          gap: '.8rem', paddingRight: '3rem', paddingTop: '1.5rem', paddingBottom: '1.5rem'
        }}>
          <div style={{ flex: 1, overflow: 'hidden', background: 'var(--surface)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '.9rem', left: '.9rem', zIndex: 2, background: 'var(--ink)', color: '#fff', fontSize: '.56rem', letterSpacing: '.18em', textTransform: 'uppercase', padding: '.28rem .7rem' }}>
              {artwork.edition}
            </div>
            <div dangerouslySetInnerHTML={{ __html: makeSVG(artwork.id) }}
              style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* Sağ — bilgi */}
        <div style={{ paddingLeft: '2.5rem', paddingTop: '2rem' }}>

          {/* Sanatçı */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.9rem', marginBottom: '1.4rem' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Cormorant Garamond', serif", fontSize: '.95rem', color: 'var(--gold)'
            }}>
              {artwork.artist.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '.1rem' }}>
                {artwork.artist}
              </div>
              <div style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {artwork.sub}
              </div>
            </div>
          </div>

          <div style={{ color: 'var(--gold)', fontSize: '.78rem', marginBottom: '1.1rem' }}>
            ★★★★★ <span style={{ color: 'var(--muted)', fontSize: '.6rem', marginLeft: '.3rem' }}>{artwork.reviews}</span>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.9rem, 2.8vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '.3rem' }}>
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{artwork.em}</em>{' '}
            {artwork.title.replace(artwork.em, '').trim()}
          </h1>
          <div style={{ fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.4rem' }}>
            {artwork.year} · {artwork.type}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.4rem 0' }} />

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '.8rem', marginBottom: '1.3rem' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.1rem' }}>{artwork.price}</div>
            <div style={{ fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>KDV dahil · Ücretsiz kargo</div>
          </div>

          {/* Boyut */}
          <div style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.65rem' }}>Boyut</div>
          <div style={{ display: 'flex', gap: '.45rem', marginBottom: '1.4rem' }}>
            {sizes.map(s => (
              <button key={s} onClick={() => setActiveSize(s)} style={{
                padding: '.45rem .85rem',
                border: `1px solid ${activeSize === s ? 'var(--ink)' : 'var(--border)'}`,
                background: activeSize === s ? 'var(--ink)' : 'none',
                color: activeSize === s ? '#fff' : 'var(--ink)',
                fontSize: '.64rem', letterSpacing: '.1em', cursor: 'pointer'
              }}>
                {s}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginBottom: '1.4rem' }}>
            <button style={{ width: '100%', padding: '.9rem', background: 'var(--ink)', color: '#fff', border: 'none', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Sepete Ekle
            </button>
            <button style={{ width: '100%', padding: '.85rem', background: 'none', color: 'var(--ink)', border: '1px solid var(--border)', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Teklif Ver
            </button>
          </div>

          {/* Garanti */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem', padding: '.85rem 1rem', background: 'var(--surface)', borderLeft: '2px solid var(--gold)', marginBottom: '1.6rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🛡</span>
            <div style={{ fontSize: '.64rem', lineHeight: 1.7 }}>
              <strong style={{ display: 'block', fontSize: '.68rem' }}>14 Gün İade Garantisi</strong>
              Ücretsiz iade · Orijinallik sertifikası · Güvenli ödeme
            </div>
          </div>

          {/* Etiketler */}
          <div style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.65rem' }}>Etiketler</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.4rem' }}>
            {artwork.tags.map(tag => (
              <span key={tag} onClick={() => navigate(`/?category=${tag}`)} style={{
                fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase',
                color: 'var(--gold)', padding: '.25rem .65rem',
                border: '1px solid rgba(154,122,74,.28)', cursor: 'pointer'
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Accordion */}
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {accs.map(acc => (
              <div key={acc.key} style={{ borderBottom: '1px solid var(--border)' }}>
                <button
                  onClick={() => setOpenAcc(openAcc === acc.key ? null : acc.key)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '.9rem 0', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '.64rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink)'
                  }}
                >
                  {acc.label}
                  <span style={{ transition: 'transform .3s', transform: openAcc === acc.key ? 'rotate(45deg)' : 'none', color: 'var(--muted)' }}>+</span>
                </button>
                {openAcc === acc.key && (
                  <div style={{ paddingBottom: '1rem', fontSize: '.76rem', lineHeight: 1.9, color: '#555' }}>
                    {acc.key === 'specs' ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.45rem 2rem' }}>
                        {Object.entries(artwork.specs).map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.1rem' }}>{k}</div>
                            <div style={{ fontSize: '.73rem', color: 'var(--ink)' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    ) : acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail