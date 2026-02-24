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
                minHeight: '70vh',
                background: '#E8DCC8',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                padding: '6rem 2rem',
            }}
        >
            {/* Image */}
            <img
                src="/cta-characters-3d.png"
                alt="3D Characters"
                style={{
                    width: 'clamp(200px, 40vw, 350px)',
                    objectFit: 'contain',
                    marginBottom: '2rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(35px)',
                    transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
                    position: 'relative',
                    zIndex: 2,
                }}
            />

            {/* Heading */}
            <h2
                style={{
                    fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: '-0.03em',
                    textAlign: 'center',
                    color: '#1A110D',
                    margin: '0 1rem 1.5rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(35px)',
                    transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: '0.15s',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                Everyone is a learner
            </h2>

            {/* Subtitle */}
            <p
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                    fontWeight: 400,
                    color: 'rgba(26, 17, 13, 0.65)',
                    lineHeight: 1.7,
                    textAlign: 'center',
                    margin: '0 1rem 3rem',
                    maxWidth: '42ch',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 1s ease-out',
                    transitionDelay: '0.35s',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                Join over 10 million people learning interactively.
            </p>

            {/* CTA Button — Brilliant green style */}
            <div style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.5s',
                position: 'relative',
                zIndex: 2,
            }}>
                <button
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        padding: '18px 48px',
                        borderRadius: 30,
                        border: 'none',
                        cursor: 'pointer',
                        background: '#7C5CFC',
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                        boxShadow: '0 4px 20px rgba(124,92,252,0.35)',
                        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,92,252,0.5)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,92,252,0.35)';
                    }}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
}
