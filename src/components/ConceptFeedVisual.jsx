import { useEffect, useRef } from 'react';

const CONCEPTS = [
    'Why do habits beat motivation?',
    'How do incentives shape behavior?',
    'What makes ideas spread?',
    'Why do people follow trends?',
    'How do systems influence decisions?',
    'What drives compound growth?',
    'Why does context change meaning?',
];

export default function ConceptFeedVisual({ show }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!show || !containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.concept-card');
        cards.forEach((card, i) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        });
    }, [show]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                maxWidth: 420,
                height: 380,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 20,
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
                transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.35s',
            }}
        >
            {/* Radial vignette for depth */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(200,149,108,0.06) 0%, transparent 70%)',
                zIndex: 0,
                borderRadius: 20,
            }} />

            {/* Floating cards container — duplicated for seamless loop */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                }}
            >
                <div
                    className="concept-scroll"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        padding: '0 1rem',
                        animation: 'conceptFloat 18s linear infinite',
                    }}
                >
                    {/* Render cards twice for seamless loop */}
                    {[...CONCEPTS, ...CONCEPTS].map((text, i) => {
                        const isFirst = i < CONCEPTS.length;
                        const depth = i % 3; // 0 = front, 1 = mid, 2 = back
                        const xOffset = depth === 0 ? 0 : depth === 1 ? 24 : -16;
                        const scale = depth === 0 ? 1 : depth === 1 ? 0.96 : 0.93;
                        const opacity = depth === 0 ? 0.95 : depth === 1 ? 0.7 : 0.5;
                        const blur = depth === 2 ? 'blur(1.5px)' : 'none';

                        return (
                            <div
                                key={i}
                                className="concept-card"
                                style={{
                                    background: 'rgba(232, 226, 216, 0.07)',
                                    border: '1px solid rgba(232, 226, 216, 0.1)',
                                    borderRadius: 16,
                                    padding: '1rem 1.25rem',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(245,242,237,0.04)',
                                    transform: `translateX(${xOffset}px) scale(${scale})`,
                                    opacity,
                                    filter: blur,
                                    transition: 'opacity 0.6s ease',
                                    willChange: 'transform',
                                }}
                            >
                                <p style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.88rem',
                                    fontWeight: 400,
                                    lineHeight: 1.5,
                                    color: '#D4CEC4',
                                    margin: 0,
                                    letterSpacing: '-0.01em',
                                }}>
                                    {text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top + bottom fade for seamless scroll appearance */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 80,
                background: 'linear-gradient(to bottom, #1A110D 0%, transparent 100%)',
                zIndex: 2,
                borderRadius: '20px 20px 0 0',
            }} />
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 80,
                background: 'linear-gradient(to top, #1A110D 0%, transparent 100%)',
                zIndex: 2,
                borderRadius: '0 0 20px 20px',
            }} />

            {/* Keyframe animation injected via style tag */}
            <style>{`
                @keyframes conceptFloat {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
            `}</style>
        </div>
    );
}
