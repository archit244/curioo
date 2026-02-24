import { useEffect, useRef, useState } from 'react';

export default function CTASection() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="cta-section" style={{
            position: 'relative', width: '100vw', height: '100vh',
            background: 'linear-gradient(180deg, #C4DAFF 0%, #B8D0FF 40%, #A8C4FF 100%)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
            fontFamily: "'Outfit', sans-serif", paddingTop: '5rem',
        }}>
            {/* Badge */}
            <div style={{
                display: 'inline-block', padding: '6px 16px', background: '#000', borderRadius: 999,
                fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 20,
                opacity: inView ? 1 : 0, transition: 'opacity 0.8s 0.05s',
            }}>Join the Community</div>

            {/* Heading */}
            <h2 style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', fontWeight: 800, color: '#000',
                lineHeight: 1.1, letterSpacing: '-0.03em', textAlign: 'center',
                margin: '0 1rem 1rem',
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.8s 0.1s, transform 0.8s 0.1s',
            }}>Everyone is a learner</h2>

            {/* Subtitle */}
            <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 400, color: 'rgba(0,0,0,0.5)',
                lineHeight: 1.6, textAlign: 'center', margin: '0 1rem 2rem',
                opacity: inView ? 1 : 0, transition: 'opacity 0.8s 0.25s',
            }}>Join over 10 million people learning interactively.</p>

            {/* CTA Button — Solid black pill */}
            <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.9rem 2.4rem',
                background: '#000', color: '#fff',
                fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem',
                borderRadius: 999, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(16px)',
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                }}
            >
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </a>

            {/* Characters image */}
            <div style={{
                flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%',
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 1s 0.45s, transform 1s 0.45s',
            }}>
                <img src="/ChatGPT Image Feb 20, 2026 at 11_44_32 PM.png" alt="Diverse group of learners"
                    style={{ width: 'auto', height: 'auto', maxWidth: '85%', maxHeight: '72vh', objectFit: 'contain', display: 'block' }} />
            </div>
        </section>
    );
}
