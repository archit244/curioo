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
                height: '100vh',
                background: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                fontFamily: "'Outfit', sans-serif",
                paddingTop: '5rem',
            }}
        >
            {/* ── Heading ── */}
            <h2
                style={{
                    fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                    fontWeight: 800,
                    color: '#000000',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    margin: '0 1rem 1rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 0.8s 0.1s, transform 0.8s 0.1s',
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                }}
            >
                Everyone is a learner
            </h2>

            {/* ── Subtitle ── */}
            <p
                style={{
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    fontWeight: 400,
                    color: 'rgba(0,0,0,0.55)',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    margin: '0 1rem 0',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 0.8s 0.25s',
                }}
            >
                Join over 10 million people learning interactively.
            </p>

            {/* ── Characters — fills remaining space, flush to bottom ── */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    width: '100%',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'opacity 1s 0.45s, transform 1s 0.45s',
                }}
            >
                <img
                    src="/cta-characters-white.png"
                    alt="Diverse group of learners"
                    style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '85%',
                        maxHeight: '72vh',
                        objectFit: 'contain',
                        display: 'block',
                        mixBlendMode: 'multiply',
                    }}
                />
            </div>
        </section>
    );
}
