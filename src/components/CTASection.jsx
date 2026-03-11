import { useEffect, useRef, useState } from 'react';

export default function CTASection() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="cta-section"
            style={{
                position: 'relative',
                width: '100vw',
                minHeight: '60vh',
                background: '#E8DCC8',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                padding: 'clamp(5rem, 10vw, 8rem) 2rem',
            }}
        >
            {/* ── Decorative gradient orbs ── */}






            {/* ── Heading ── */}
            <h2
                style={{
                    fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                    fontWeight: 300,
                    color: '#1A110D',
                    lineHeight: 1.1,
                    letterSpacing: '-0.04em',
                    textAlign: 'center',
                    margin: '0 1rem 1.2rem',
                    whiteSpace: 'nowrap',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 1s 0.1s, transform 1s 0.1s',
                }}
            >
                Every mind is a curious mind
            </h2>

            {/* ── Subtitle ── */}
            <p
                style={{
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                    fontWeight: 400,
                    color: 'rgba(26, 17, 13, 0.45)',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    margin: '0 1rem 0',
                    maxWidth: '48ch',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 0.8s 0.25s',
                }}
            >
                Some people chase knowledge. Others just wonder why.<br />
                Curio is for the second kind, and for anyone<br />
                who wants to become one.
            </p>

            {/* ── CTA Button ── */}
            <div style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s 0.35s, transform 0.8s 0.35s',
                marginTop: '2.5rem',
            }}>
                <button
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        padding: '14px 36px',
                        borderRadius: 50,
                        border: 'none',
                        cursor: 'pointer',
                        background: '#1A110D',
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)';
                        e.currentTarget.style.background = '#2A2017';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                        e.currentTarget.style.background = '#1A110D';
                    }}
                >
                    Get Started
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '2px' }}>
                        <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>


        </section>
    );
}
