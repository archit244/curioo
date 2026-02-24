import { useEffect, useRef, useState } from 'react';

function useReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, show];
}

/* ═══ PHONE MOCKUP — Clean white on periwinkle ═══ */
function PhoneFeedMockup({ show }) {
    const cards = [
        { q: 'Why do habits beat motivation?', tag: 'Psychology', progress: 82 },
        { q: 'How do incentives shape behavior?', tag: 'Economics', progress: 45 },
        { q: 'What makes systems fail slowly?', tag: 'Systems', progress: 20 },
    ];
    return (
        <div style={{
            width: 340, maxWidth: '90vw', position: 'relative',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
            transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)', transitionDelay: '0.3s',
        }}>
            {/* Phone frame */}
            <div style={{
                background: '#000000',
                borderRadius: 36, padding: '24px 16px 28px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Status bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0 8px 16px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)',
                    fontFamily: "'Inter', sans-serif", fontWeight: 600,
                }}>
                    <span>9:41</span>
                    <div style={{
                        width: 80, height: 24, borderRadius: 20,
                        background: '#1a1a1a',
                    }}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
                        </div>
                    </div>
                    <span style={{ opacity: 0.5 }}>●●●</span>
                </div>

                {/* Feed title */}
                <div style={{
                    padding: '0 8px 16px', fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
                }}>Your Feed</div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {cards.map((card, i) => (
                        <div key={i} style={{
                            background: '#ffffff',
                            borderRadius: 18, padding: '20px 18px',
                            opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)', transitionDelay: `${0.5 + i * 0.15}s`,
                        }}>
                            <div style={{
                                display: 'inline-block', padding: '4px 10px', borderRadius: 8,
                                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em',
                                color: '#000', background: '#E8EEFF',
                                fontFamily: "'Inter', sans-serif", marginBottom: 10,
                                textTransform: 'uppercase',
                            }}>{card.tag}</div>
                            <p style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', fontWeight: 700,
                                lineHeight: 1.35, color: '#000', margin: 0, marginBottom: 14,
                            }}>{card.q}</p>
                            <div style={{ height: 4, borderRadius: 3, background: '#E8EEFF', overflow: 'hidden' }}>
                                <div style={{
                                    width: show ? `${card.progress}%` : '0%', height: '100%',
                                    background: '#000', borderRadius: 3,
                                    transition: 'width 1.8s ease-out', transitionDelay: `${1 + i * 0.2}s`,
                                }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom nav */}
                <div style={{
                    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                    padding: '18px 0 4px', marginTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)',
                }}>
                    {['●', '○', '△', '☰'].map((icon, i) => (
                        <span key={i} style={{ fontSize: '0.9rem', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.2)' }}>{icon}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══ CONCEPT TREE — Clean black/white nodes on blue ═══ */
function ConceptTree({ show }) {
    const nodes = [
        { label: 'Core Idea', x: 50, y: 8, size: 'lg', completed: true },
        { label: 'Key insight', x: 25, y: 30, size: 'md', completed: true },
        { label: 'Real example', x: 75, y: 28, size: 'md', completed: true },
        { label: 'Why it matters', x: 15, y: 55, size: 'sm', completed: true },
        { label: 'How to apply', x: 50, y: 52, size: 'sm', completed: false },
        { label: 'Deep dive', x: 85, y: 55, size: 'sm', completed: false },
        { label: 'Connected ideas', x: 30, y: 78, size: 'sm', completed: false },
        { label: 'Further reading', x: 70, y: 80, size: 'sm', completed: false },
    ];
    const lines = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7]];

    return (
        <div style={{
            width: '100%', maxWidth: 520, position: 'relative', height: 480,
            opacity: show ? 1 : 0, transition: 'opacity 0.6s ease-out', transitionDelay: '0.2s',
        }}>
            <svg viewBox="0 0 100 90" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                {lines.map(([a, b], i) => (
                    <line key={i}
                        x1={nodes[a].x} y1={nodes[a].y + 3}
                        x2={show ? nodes[b].x : nodes[a].x}
                        y2={show ? nodes[b].y : nodes[a].y + 3}
                        stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" strokeDasharray="2,2"
                        style={{ transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)', transitionDelay: `${0.3 + i * 0.08}s` }}
                    />
                ))}
            </svg>
            {nodes.map((node, i) => {
                const fontSizes = { lg: '0.85rem', md: '0.78rem', sm: '0.7rem' };
                const paddings = { lg: '12px 20px', md: '10px 16px', sm: '8px 14px' };
                return (
                    <div key={i} style={{
                        position: 'absolute', left: `${node.x}%`, top: `${node.y}%`,
                        transform: show ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.7)',
                        opacity: show ? 1 : 0,
                        transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)', transitionDelay: `${0.2 + i * 0.1}s`,
                        background: '#ffffff',
                        borderRadius: 14, padding: paddings[node.size],
                        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.04)',
                        display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', zIndex: 10 - i,
                    }}>
                        <div style={{
                            width: 18, height: 18, borderRadius: 6,
                            background: node.completed ? '#000000' : '#D6E4FF',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                            {node.completed && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>
                        <span style={{
                            fontFamily: "'Inter', sans-serif", fontSize: fontSizes[node.size],
                            fontWeight: 600, color: '#000', letterSpacing: '-0.01em',
                        }}>{node.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

/* ═══ MAIN — Soft periwinkle blue backgrounds ═══ */
export default function BodySections() {
    const [ref1, show1] = useReveal(0.12);
    const [ref2, show2] = useReveal(0.12);

    const heading = (show, delay = '0.15s') => ({
        fontFamily: "'Outfit', sans-serif",
        fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
        fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em',
        color: '#000000', margin: 0,
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: delay,
    });

    const para = (show, delay = '0.4s') => ({
        fontFamily: "'Outfit', sans-serif",
        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
        fontWeight: 400, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)',
        margin: 0, maxWidth: '38ch',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: delay,
    });

    const sectionBase = {
        width: '100vw', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', zIndex: 10,
    };

    return (
        <>
            {/* SECTION 1 — Soft periwinkle blue */}
            <section ref={ref1} id="body-spark" style={{
                ...sectionBase, padding: 'clamp(5rem, 10vw, 10rem) 6%',
                background: 'linear-gradient(180deg, #D6E4FF 0%, #C4DAFF 50%, #B8D0FF 100%)',
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    width: '100%', maxWidth: 1300, gap: '6%', flexWrap: 'wrap', position: 'relative', zIndex: 1,
                }}>
                    <div style={{ flex: '1 1 400px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2vw, 2rem)' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            width: 'fit-content', padding: '6px 16px',
                            background: '#000', borderRadius: 999,
                            fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase',
                            letterSpacing: '0.12em', color: '#fff',
                            opacity: show1 ? 1 : 0, transition: 'opacity 0.8s 0.1s',
                        }}>Interactive Learning</div>
                        <h2 style={heading(show1)}>
                            Concepts<br />that stick
                        </h2>
                        <p style={para(show1)}>
                            Short videos on fascinating topics surface in your feed — like discovering
                            a great song. When one pulls you in, Curio breaks it down from curiosity
                            to deep understanding, one layer at a time.
                        </p>
                        <p style={{ ...para(show1, '0.55s'), fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)', color: 'rgba(0,0,0,0.35)', maxWidth: '32ch' }}>
                            Step-by-step interactive learning makes even complex ideas feel intuitive.
                        </p>
                    </div>
                    <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
                        <PhoneFeedMockup show={show1} />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — Slightly deeper periwinkle */}
            <section ref={ref2} id="body-different" style={{
                ...sectionBase, padding: 'clamp(5rem, 10vw, 10rem) 6%',
                background: 'linear-gradient(180deg, #B8D0FF 0%, #C4DAFF 50%, #D6E4FF 100%)',
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    width: '100%', maxWidth: 1300, gap: '4%', flexWrap: 'wrap', position: 'relative', zIndex: 1,
                }}>
                    <div style={{ flex: '1 1 380px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2vw, 2rem)' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            width: 'fit-content', padding: '6px 16px',
                            background: '#000', borderRadius: 999,
                            fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase',
                            letterSpacing: '0.12em', color: '#fff',
                            opacity: show2 ? 1 : 0, transition: 'opacity 0.8s 0.1s',
                        }}>Adaptive Paths</div>
                        <h2 style={heading(show2)}>
                            Personalized<br />paths
                        </h2>
                        <p style={para(show2)}>
                            No progress bars. No certificates. No 40-hour commitments.
                            Curio adapts to your curiosity — tracking what you've explored,
                            suggesting what clicks next, and building your knowledge map
                            one concept at a time.
                        </p>
                    </div>
                    <div style={{ flex: '1 1 400px', minWidth: 320, display: 'flex', justifyContent: 'center' }}>
                        <ConceptTree show={show2} />
                    </div>
                </div>
            </section>
        </>
    );
}
