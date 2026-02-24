import { useEffect, useRef, useState } from 'react';

/**
 * Section C — The Value Shift
 * Centered bold statement with abstract network visual building on scroll.
 */
export default function SectionValue() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Visual builds as user scrolls through
    useEffect(() => {
        const onScroll = () => {
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, 1 - rect.bottom / (window.innerHeight + rect.height)));
            setScrollProgress(pct);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const visualScale = 0.92 + scrollProgress * 0.08;
    const visualOpacity = inView ? (0.4 + scrollProgress * 0.5) : 0;

    return (
        <section
            ref={sectionRef}
            id="section-value"
            style={{
                width: '100vw',
                minHeight: '100vh',
                background: '#050505',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8rem 0',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 10,
            }}
        >
            {/* Background visual — network that builds on scroll */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/section-c-visual.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: visualOpacity,
                transform: `scale(${visualScale})`,
                transition: 'opacity 0.4s ease-out',
                willChange: 'transform, opacity',
            }} />

            {/* Top/bottom gradient fades */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, #050505 0%, transparent 25%, transparent 75%, #050505 100%)',
                pointerEvents: 'none',
            }} />

            {/* Content — centered */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 8%',
                maxWidth: '1000px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}>
                {/* Bold headline */}
                <h2
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
                        fontWeight: 700,
                        lineHeight: 1.08,
                        letterSpacing: '-0.04em',
                        color: '#ffffff',
                        margin: 0,
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(50px)',
                        transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: '0.15s',
                    }}
                >
                    Stop consuming information.<br />
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                        Start building understanding.
                    </span>
                </h2>

                {/* Thin divider */}
                <div style={{
                    width: '60px',
                    height: '1px',
                    background: 'rgba(255,255,255,0.2)',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 1s ease-out',
                    transitionDelay: '0.5s',
                }} />

                {/* Supporting paragraph */}
                <p
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                        fontWeight: 400,
                        lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.45)',
                        margin: 0,
                        maxWidth: '40ch',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(25px)',
                        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: '0.6s',
                    }}
                >
                    Most platforms give you more content.<br />
                    Curio helps you see patterns —<br />
                    so you think clearer, decide faster,<br />
                    and understand deeper.
                </p>
            </div>
        </section>
    );
}
