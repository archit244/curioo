export default function Navbar() {
    return (
        <header
            className="absolute top-0 left-0 w-full z-[1000]"
            style={{
                padding: '1.6rem 4rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
            }}
        >
            {/* Left — empty spacer to balance right nav */}
            <div />

            {/* Center — Logo */}
            <div
                style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                }}
            >
                CURIO
            </div>

            {/* Right — Nav buttons */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <a
                    href="#"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.88rem',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.3)',
                        padding: '0.6rem 1.5rem',
                        borderRadius: 9999,
                        textDecoration: 'none',
                        transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = '#ffffff';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = '';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                >
                    Log in
                </a>
                <a
                    href="#"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        background: '#ffffff',
                        color: '#000000',
                        padding: '0.6rem 1.5rem',
                        borderRadius: 9999,
                        textDecoration: 'none',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                        transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.88)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
                        e.currentTarget.style.transform = '';
                    }}
                >
                    Get Started
                </a>
            </nav>
        </header>
    );
}
