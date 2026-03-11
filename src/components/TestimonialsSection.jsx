import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
    { id: 1, text: "I opened one concept and ended up understanding the whole topic.", by: "Beta learner" },
    { id: 2, text: "Feels like scrolling — but I actually leave knowing something.", by: "Early tester" },
    { id: 3, text: "It explains right where confusion usually happens.", by: "Student user" },
    { id: 4, text: "Short, clear, and surprisingly deep for the time it takes.", by: "Early user" },
    { id: 5, text: "I didn't plan to learn — but I kept tapping the next concept.", by: "Beta user" },
    { id: 6, text: "Good balance — not shallow, not overwhelming.", by: "Learner" },
];

export default function TestimonialsSection() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="testimonials-section"
            style={{
                position: 'relative',
                width: '100vw',
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 10,
                background: '#1A110D',
                padding: 'clamp(4rem, 8vw, 6rem) 6%',
            }}
        >
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '3.5rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
            }}>
    
                <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                    fontWeight: 300,
                    color: '#F5F2ED',
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    margin: 0,
                }}>
                    What beta users are saying
                </h2>
            </div>

            {/* Testimonial cards — masonry-like staggered grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem',
                width: '100%',
                maxWidth: 1000,
            }}>
                {TESTIMONIALS.map((t, i) => {
                    const staggerDelay = `${0.15 + i * 0.08}s`;
                    return (
                        <div
                            key={t.id}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: 18,
                                padding: '2rem 1.75rem 1.75rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                border: '1px solid rgba(26,17,13,0.06)',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
                                transitionDelay: staggerDelay,
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                                e.currentTarget.style.transform = '';
                            }}
                        >
                            {/* Quote mark */}
                            <span style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: '2.5rem',
                                lineHeight: 1,
                                color: '#C8956C',
                                opacity: 0.35,
                                userSelect: 'none',
                            }}>"</span>

                            {/* Quote text */}
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '1rem',
                                fontWeight: 400,
                                lineHeight: 1.65,
                                color: '#2C2520',
                                margin: 0,
                                flex: 1,
                            }}>
                                {t.text}
                            </p>

                            {/* Divider + attribution */}
                            <div style={{
                                borderTop: '1px solid rgba(26,17,13,0.06)',
                                paddingTop: '0.85rem',
                                marginTop: '0.25rem',
                            }}>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.78rem',
                                    fontWeight: 500,
                                    color: '#9A7B5B',
                                    margin: 0,
                                    letterSpacing: '0.02em',
                                }}>
                                    — {t.by}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
