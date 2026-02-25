import { useEffect, useRef, useState } from 'react';

/**
 * Section A — The Emotional Hook
 * Full-width cinematic section with background visual and giant centered text.
 */
export default function SectionHook() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [scrollY, setScrollY] = useState(0);

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

    // Parallax scroll effect
    useEffect(() => {
        const onScroll = () => {
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const progress = -rect.top / window.innerHeight;
            setScrollY(progress);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const parallaxOffset = scrollY * 40;

    return (
        <section
            ref={sectionRef}
            id="section-hook"
            style={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                background: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
            }}
        >
            {/* Background visual with parallax */}
            <div
                style={{
                    position: 'absolute',
                    inset: '-60px',
                    backgroundImage: 'url(/section-a-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: inView ? 0.45 : 0,
                    transform: `translateY(${parallaxOffset}px) scale(1.1)`,
                    transition: 'opacity 2s ease-out',
                    willChange: 'transform',
                }}
            />

            {/* Gradient overlays for depth */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, #000 0%, transparent 30%, transparent 70%, #000 100%)',
                pointerEvents: 'none',
            }} />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 8%',
                maxWidth: '1100px',
            }}>
                {/* Big headline */}
                <h2
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.08,
                        letterSpacing: '-0.04em',
                        color: '#ffffff',
                        margin: 0,
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(50px)',
                        transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: '0.2s',
                    }}
                >
                    You were never meant to learn<br />like everyone else.
                </h2>

                {/* Support text */}
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                        letterSpacing: '0.01em',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: '0.6s',
                    }}
                >
                    Curiosity isn't linear.<br />
                    Why should learning be?
                </p>
            </div>
        </section>
    );
}
