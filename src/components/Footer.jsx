import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = {
    Product: [
        { name: 'How it works', path: '/how-it-works' },
        { name: 'Features', path: '/features' }
    ],
    Company: [
        { name: 'About us', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ],
    Resources: [
        { name: 'Privacy', path: '/privacy' },
        { name: 'Terms', path: '/terms' },
        { name: 'Cookies', path: '/cookies' },
    ],
};

const SOCIALS = [
    {
        id: 'x',
        label: 'Twitter / X',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        id: 'instagram',
        label: 'Instagram',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 11 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        id: 'youtube',
        label: 'YouTube',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer
            style={{
                background: '#1A110D',
                color: '#E8DCC8',
                fontFamily: "'Inter', sans-serif",
                width: '100%',
                borderTop: '1px solid rgba(232, 220, 200, 0.08)',
            }}
        >
            {/* Top gradient accent line */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(232, 220, 200, 0.2) 50%, transparent 100%)' }} />

            {/* Main footer grid */}
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '5rem 2rem 4rem',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '4rem',
                }}
            >
                {/* Brand column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Link
                        to="/"
                        style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            letterSpacing: '0.25em',
                            color: '#E8DCC8',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                        }}
                    >
                        CURIO
                    </Link>
                    <p
                        style={{
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            color: 'rgba(232, 220, 200, 0.5)',
                            maxWidth: '30ch',
                            margin: 0,
                        }}
                    >
                        Learning that starts with curiosity. Explore ideas at your own pace, in your own way.
                    </p>

                    {/* Social icons */}
                    <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                        {SOCIALS.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                className={`social-link social-${s.id}`}
                                style={{
                                    borderColor: 'rgba(232, 220, 200, 0.15)',
                                    color: 'rgba(232, 220, 200, 0.45)'
                                }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Link columns */}
                {Object.entries(LINKS).map(([heading, links]) => (
                    <div key={heading} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <span
                            style={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: '#E8DCC8',
                                opacity: 0.9
                            }}
                        >
                            {heading}
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {links.map(link => {
                                const styles = {
                                    fontSize: '0.92rem',
                                    color: 'rgba(232, 220, 200, 0.6)',
                                    textDecoration: 'none',
                                    transition: 'all 0.25s ease',
                                    width: 'fit-content',
                                    letterSpacing: '0.01em'
                                };

                                const handleEnter = (e) => {
                                    e.currentTarget.style.color = '#ffffff';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                };
                                const handleLeave = (e) => {
                                    e.currentTarget.style.color = 'rgba(232, 220, 200, 0.6)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                };

                                return link.path.startsWith('/') ? (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        style={styles}
                                        onMouseEnter={handleEnter}
                                        onMouseLeave={handleLeave}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        style={styles}
                                        onMouseEnter={handleEnter}
                                        onMouseLeave={handleLeave}
                                    >
                                        {link.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div
                style={{
                    borderTop: '1px solid rgba(232, 220, 200, 0.06)',
                    padding: '2rem',
                    textAlign: 'center',
                    maxWidth: 1200,
                    margin: '0 auto',
                }}
            >
                <span style={{ fontSize: '0.85rem', color: 'rgba(232, 220, 200, 0.4)', fontWeight: 400 }}>
                    © {new Date().getFullYear()} Curio. All rights reserved.
                </span>
            </div>
        </footer>
    );
}
