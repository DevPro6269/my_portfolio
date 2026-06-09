const NAV_LINKS = [
  { label: 'Work',     href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
]

export function Navbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
        padding: '13px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: 'var(--font-lora), serif',
          fontWeight: 700,
          fontSize: 15,
          color: 'var(--text)',
          textDecoration: 'none',
        }}
      >
        Dev Rathore
      </a>
      <div style={{ display: 'flex', gap: 28 }}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="nav-link"
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 11,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
