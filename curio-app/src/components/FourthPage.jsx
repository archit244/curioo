import React, { useState, useRef } from 'react';

export default function FourthPage() {
    const containerRef = useRef(null);
    const [transform, setTransform] = useState('perspective(1000px) rotateX(15deg) rotateY(-12deg) rotateZ(2deg) scale3d(1, 1, 1)');
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const concepts = [
        { tag: "Question 01", title: "What if the opposite were true?" },
        { tag: "Problem Solving", title: "Occam's Razor" },
        { tag: "01. Foundational", title: "First Principles Thinking" },
        { tag: "Exploration", title: "Mapping the System" },
        { tag: "Mental Model", title: "The Map is Not the Territory" },
    ];

    const handleNextConcept = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => setActiveIndex(prev => (prev + 1) % concepts.length), 350);
        setTimeout(() => setIsAnimating(false), 400);
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -10;
        const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
        setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`);
    };
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setTransform('perspective(1000px) rotateX(15deg) rotateY(-12deg) rotateZ(2deg) scale3d(1, 1, 1)');
    };

    const c = concepts[activeIndex];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #D6E4FF 0%, #C4DAFF 50%, #B8D0FF 100%)',
            color: '#000', fontFamily: "'Outfit', sans-serif",
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', position: 'relative',
        }}>
            <main style={{ width: '100%', maxWidth: 1200, padding: '0 24px', position: 'relative' }}>
                <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', minHeight: '85vh' }}>
                    {/* Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 10 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content',
                            padding: '6px 16px', background: '#000', borderRadius: 999,
                            fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em',
                            color: '#fff',
                        }}>Scientific Inquiry</div>

                        <h1 style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0 }}>
                            Stay <br />
                            <span style={{ fontStyle: 'italic' }}>curious.</span>
                        </h1>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '28rem' }}>
                            <p style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
                                Every concept you explore builds on the last. Over time, you start seeing patterns — in decisions, in systems, in how the world actually works.
                            </p>
                            <div style={{ height: 1, width: 60, background: 'rgba(0,0,0,0.12)' }} />
                            <p style={{ fontSize: '1.05rem', fontWeight: 500, color: 'rgba(0,0,0,0.6)', margin: 0, lineHeight: 1.6 }}>
                                That's not content consumption. That's real growth.
                            </p>
                        </div>
                    </div>

                    {/* 3D Card */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 500, position: 'relative', width: '100%', paddingTop: 40, paddingBottom: 80 }}>
                        <div ref={containerRef}
                            style={{ width: '100%', maxWidth: 380, aspectRatio: '1', position: 'relative', zIndex: 20, cursor: 'pointer', transform, transition: 'transform 500ms ease-out' }}
                            onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleNextConcept}
                        >
                            {/* Layer 3 */}
                            <div style={{
                                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.06)', borderRadius: '2rem',
                                transition: 'all 700ms ease-in-out', opacity: isAnimating ? 0 : 1,
                                transform: isAnimating ? 'translateY(-128px) scale(0.75)' : isHovered ? 'translateY(48px) translateX(48px)' : 'translateY(32px) translateX(32px)',
                            }} />
                            {/* Layer 2 */}
                            <div style={{
                                position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.03)', borderRadius: '2rem',
                                transition: 'all 700ms ease-in-out', opacity: isAnimating ? 0 : 1,
                                transform: isAnimating ? 'translateY(-192px) translateX(-32px) rotate(-6deg) scale(0.9)' : isHovered ? 'translateY(24px) translateX(24px)' : 'translateY(16px) translateX(16px)',
                            }} />
                            {/* Layer 1 */}
                            <div style={{
                                position: 'absolute', inset: 0, background: '#ffffff', borderRadius: '2rem',
                                boxShadow: '0 10px 50px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
                                transition: 'all 700ms ease-in-out', padding: '2.5rem',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                opacity: isAnimating ? 0 : 1,
                                transform: isAnimating ? 'translateY(-256px) translateX(32px) rotate(6deg) scale(1.05)' : isHovered ? 'translateY(-4px) translateX(-4px)' : 'translateY(0) translateX(0)',
                            }}>
                                <div style={{
                                    position: 'absolute', top: 28, right: 28, fontSize: '0.58rem', color: 'rgba(0,0,0,0.3)',
                                    fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em',
                                    background: '#E8EEFF', padding: '5px 12px', borderRadius: 999,
                                }}>Tap to next</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', textAlign: 'center', alignItems: 'center', padding: '0 1rem' }}>
                                    <div style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', textTransform: 'uppercase',
                                        letterSpacing: '0.2em', fontWeight: 700, color: 'rgba(0,0,0,0.4)',
                                    }}>{c.tag}</div>
                                    <h3 style={{
                                        fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                                        fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em',
                                        color: '#000', margin: 0, width: '100%',
                                    }}>{c.title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
