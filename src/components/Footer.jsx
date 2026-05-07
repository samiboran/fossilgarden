function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem',
      marginTop: '6rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      background: 'var(--bg)'
    }}>

      {/* Marka */}
      <div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          marginBottom: '.8rem'
        }}>
          Fossil Garden
        </div>
        <p style={{ fontSize: '.72rem', lineHeight: 1.8, color: 'var(--muted)', maxWidth: 220 }}>
          Hahnemühle sertifikalı fine art baskı ve özgün eserler. İstanbul.
        </p>
      </div>

      {/* Koleksiyon */}
      <div>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--ink)' }}>
          Koleksiyon
        </div>
        {['Fotoğraf', 'Resim', 'Baskı', 'Heykel'].map(item => (
          <div key={item} style={{ marginBottom: '.5rem' }}>
            <span style={{ fontSize: '.75rem', color: 'var(--muted)', cursor: 'pointer' }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Bilgi */}
      <div>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--ink)' }}>
          Bilgi
        </div>
        {['Hakkımızda', 'Kargo & İade', 'Sertifika', 'SSS'].map(item => (
          <div key={item} style={{ marginBottom: '.5rem' }}>
            <span style={{ fontSize: '.75rem', color: 'var(--muted)', cursor: 'pointer' }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* İletişim */}
      <div>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--ink)' }}>
          İletişim
        </div>
        <div style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 2 }}>
          <div>info@fossilgarden.com</div>
          <div>İstanbul, Türkiye</div>
        </div>
        <div style={{ display: 'flex', gap: '.8rem', marginTop: '1rem' }}>
          {['Instagram', 'Pinterest'].map(s => (
            <span key={s} style={{
              fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase',
              color: 'var(--gold)', cursor: 'pointer',
              borderBottom: '1px solid rgba(154,122,74,.3)', paddingBottom: '.1rem'
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Alt çizgi */}
      <div style={{
        gridColumn: '1 / -1',
        borderTop: '1px solid var(--border)',
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '.5rem'
      }}>
        <span style={{ fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Fossil Garden. Tüm hakları saklıdır.
        </span>
        <span style={{ fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Fine Art Print Studio · İstanbul
        </span>
      </div>

    </footer>
  )
}

export default Footer