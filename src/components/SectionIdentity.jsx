import { useEffect, useRef, useState } from 'react';

/**
 * Section B — The Identity
 * Editorial split layout with bold typography and floating concept visual.
 */
export default function SectionIdentity() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.18 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="section-identity"
            style={{
                width: '100vw',
                minHeight: '100vh',
                background: '#080808',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8rem 0',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 10,
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1400px',
                padding: '0 6%',
                gap: '6%',
            }}>
                {/* Text Side — LEFT */}
                <div style={{
                    flex: '0 0 50%',
                    maxWidth: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2.5rem',
                }}>
                    {/* Headline */}
                    <h2
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 'clamp(2.4rem, 4.2vw, 4rem)',
                            fontWeight: 700,
                            lineHeight: 1.08,
                            letterSpacing: '-0.035em',
                            color: '#ffffff',
                            margin: 0,
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                            transitionDelay: '0.15s',
                        }}
                    >
                        Curio is not a platform<br />you complete.<br />
                        <span style={{ color: 'rgba(255,255,255,0.45)' }}>
                            It's a place you return to.
                        </span>
                    </h2>

                    {/* Paragraph */}
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                            fontWeight: 400,
                            lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.45)',
                            margin: 0,
                            maxWidth: '32ch',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                            transitionDelay: '0.4s',
                        }}
                    >
                        No progress bars.<br />
                        No pressure.<br />
                        Just ideas that pull you deeper<br />
                        the more you explore.
                    </p>
                </div>

                {/* Visual Side — RIGHT */}
                <div
                    style={{
                        flex: '0 0 44%',
                        maxWidth: '44%',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
                        transition: 'opacity 1.3s cubic-bezier(0.16,1,0.3,1), transform 1.3s cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: '0.25s',
                    }}
                >
                    <div style={{
                        width: '100%',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        aspectRatio: '1 / 1',
                        background: '#111',
                    }}>
                        <img
                            src="/section-b-visual.png"
                            alt="Floating concept cards representing ideas orbiting freely"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
