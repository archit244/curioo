import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Theme Colors
    const primaryColor = isHome ? '#ffffff' : '#1A110D';
    const secondaryColor = isHome ? 'rgba(255,255,255,0.7)' : 'rgba(26, 17, 13, 0.7)';
    const borderColor = isHome ? 'rgba(255,255,255,0.3)' : 'rgba(26, 17, 13, 0.2)';

    const navLinkStyle = {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: '0.92rem',
        color: secondaryColor,
        textDecoration: 'none',
        letterSpacing: '0.02em',
        transition: 'color 0.25s ease',
        cursor: 'pointer',
    };

    const NAV_ITEMS = [
        { label: 'About', path: '/about' },
        { label: 'Features', path: '/features' },
        { label: 'How it Works', path: '/how-it-works' }
    ];

    return (
        <header
            className="absolute top-0 left-0 w-full z-[1000]"
            style={{
                padding: 'calc(1.6rem + 15px) 4rem 1.6rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
            }}
        >
            {/* Left — Logo */}
            <Link
                to="/"
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: primaryColor,
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    textDecoration: 'none',
                }}
            >
                CURIO
            </Link>

            {/* Center — Nav links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', justifyContent: 'center' }}>
                {NAV_ITEMS.map(item => (
                    <Link
                        key={item.label}
                        to={item.path}
                        style={navLinkStyle}
                        onMouseEnter={e => { e.currentTarget.style.color = primaryColor; }}
                        onMouseLeave={e => { e.currentTarget.style.color = secondaryColor; }}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Right — Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <a
                    href="#"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.88rem',
                        color: primaryColor,
                        border: `1px solid ${borderColor}`,
                        padding: '0.6rem 1.5rem',
                        borderRadius: 9999,
                        textDecoration: 'none',
                        transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = isHome ? 'rgba(255,255,255,0.1)' : 'rgba(26, 17, 13, 0.05)';
                        e.currentTarget.style.borderColor = primaryColor;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = '';
                        e.currentTarget.style.borderColor = borderColor;
                    }}
                >
                    Log in
                </a>
                <a
                    href="#"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        background: primaryColor,
                        color: isHome ? '#000000' : '#E8DCC8',
                        padding: '0.6rem 1.5rem',
                        borderRadius: 9999,
                        textDecoration: 'none',
                        boxShadow: isHome ? '0 2px 12px rgba(0,0,0,0.25)' : 'none',
                        transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = isHome ? 'rgba(255,255,255,0.88)' : '#2C2A25';
                        if (isHome) e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = primaryColor;
                        if (isHome) e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
                        e.currentTarget.style.transform = '';
                    }}
                >
                    Get Started
                </a>
            </div>
        </header>
    );
}
