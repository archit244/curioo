import { useEffect, useRef, useState } from 'react';

/* ─── Scroll-reveal hook ─── */
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


/* ═════════════════════════════════════════════════════════════════
   SECTION 1 VISUAL — "Phone Feed Mockup"
   Brilliant-style product mockup: a phone-like frame with
   stacked video cards inside it — large and prominent
   ═════════════════════════════════════════════════════════════════ */
function PhoneFeedMockup({ show }) {
    const cards = [
        { q: 'Why do habits beat motivation?', tag: 'Psychology', color: '#E8D5FF', tagColor: '#7C3AED', progress: 82 },
        { q: 'How do incentives shape behavior?', tag: 'Economics', color: '#D5EDFF', tagColor: '#2563EB', progress: 45 },
        { q: 'What makes systems fail slowly?', tag: 'Systems', color: '#D5FFE8', tagColor: '#059669', progress: 20 },
    ];
    return (
        <div style={{
            width: 340, maxWidth: '90vw', position: 'relative',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
            transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '0.3s',
        }}>
            {/* Phone frame */}
            <div style={{
                background: '#1a1a1a',
                borderRadius: 36,
                padding: '24px 16px 28px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Status bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0 8px 16px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'Inter', sans-serif", fontWeight: 600,
                }}>
                    <span>9:41</span>
                    <div style={{
                        width: 80, height: 24, borderRadius: 20,
                        background: '#000', display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
                    </div>
                    <span>●●●</span>
                </div>

                {/* Feed title */}
                <div style={{
                    padding: '0 8px 16px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.1rem', fontWeight: 700, color: '#fff',
                    letterSpacing: '-0.02em',
                }}>
                    Your Feed
                </div>

                {/* Feed cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {cards.map((card, i) => (
                        <div key={i} style={{
                            background: card.color,
                            borderRadius: 18,
                            padding: '20px 18px',
                            opacity: show ? 1 : 0,
                            transform: show ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
                            transitionDelay: `${0.5 + i * 0.15}s`,
                        }}>
                            <div style={{
                                display: 'inline-block', padding: '4px 10px', borderRadius: 8,
                                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.04em',
                                color: card.tagColor, background: 'rgba(255,255,255,0.7)',
                                fontFamily: "'Inter', sans-serif", marginBottom: 10,
                                textTransform: 'uppercase',
                            }}>{card.tag}</div>
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.35,
                                color: '#1a1a1a', margin: 0, marginBottom: 14,
                            }}>{card.q}</p>
                            {/* Progress bar */}
                            <div style={{
                                height: 4, borderRadius: 3, background: 'rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    width: show ? `${card.progress}%` : '0%',
                                    height: '100%',
                                    background: card.tagColor,
                                    borderRadius: 3,
                                    transition: 'width 1.8s ease-out',
                                    transitionDelay: `${1 + i * 0.2}s`,
                                }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom nav bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                    padding: '18px 0 4px', marginTop: 14,
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                }}>
                    {['⦿', '◇', '▵', '☰'].map((icon, i) => (
                        <span key={i} style={{
                            fontSize: '1rem',
                            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.25)',
                        }}>{icon}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}


/* ═════════════════════════════════════════════════════════════════
   SECTION 2 VISUAL — "Concept Breakdown Tree"
   Brilliant-style floating concept tags forming a learning path
   ═════════════════════════════════════════════════════════════════ */
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
    const lines = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7]];

    return (
        <div style={{
            width: '100%', maxWidth: 520, position: 'relative', height: 480,
            opacity: show ? 1 : 0,
            transition: 'opacity 0.6s ease-out',
            transitionDelay: '0.2s',
        }}>
            {/* SVG connecting lines */}
            <svg viewBox="0 0 100 90" style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                overflow: 'visible',
            }}>
                {lines.map(([a, b], i) => (
                    <line key={i}
                        x1={nodes[a].x} y1={nodes[a].y + 3}
                        x2={show ? nodes[b].x : nodes[a].x}
                        y2={show ? nodes[b].y : nodes[a].y + 3}
                        stroke="rgba(124,58,237,0.2)"
                        strokeWidth="0.4"
                        strokeDasharray="2,2"
                        style={{
                            transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
                            transitionDelay: `${0.3 + i * 0.08}s`,
                        }}
                    />
                ))}
            </svg>

            {/* Floating concept nodes */}
            {nodes.map((node, i) => {
                const fontSizes = { lg: '0.85rem', md: '0.78rem', sm: '0.7rem' };
                const paddings = { lg: '12px 20px', md: '10px 16px', sm: '8px 14px' };
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${node.x}%`, top: `${node.y}%`,
                        transform: show
                            ? 'translate(-50%, -50%) scale(1)'
                            : 'translate(-50%, -50%) scale(0.7)',
                        opacity: show ? 1 : 0,
                        transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
                        transitionDelay: `${0.2 + i * 0.1}s`,
                        background: node.completed ? '#ffffff' : 'rgba(255,255,255,0.6)',
                        borderRadius: 14,
                        padding: paddings[node.size],
                        boxShadow: node.completed
                            ? '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(124,58,237,0.1)'
                            : '0 2px 10px rgba(0,0,0,0.04)',
                        display: 'flex', alignItems: 'center', gap: 8,
                        whiteSpace: 'nowrap',
                        zIndex: 10 - i,
                    }}>
                        {/* Checkmark */}
                        <div style={{
                            width: 18, height: 18, borderRadius: 6,
                            background: node.completed
                                ? 'linear-gradient(135deg, #7C3AED, #A78BFA)'
                                : '#e5e5e5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            {node.completed && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                    stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: fontSizes[node.size],
                            fontWeight: 600, color: '#1a1a1a',
                            letterSpacing: '-0.01em',
                        }}>{node.label}</span>
                        {/* Colored progress bar */}
                        {node.completed && (
                            <div style={{
                                width: 32, height: 3, borderRadius: 2,
                                background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
                                opacity: 0.5,
                            }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}


/* ═════════════════════════════════════════════════════════════════
   SECTION 3 VISUAL — "3D Streak / Compound Growth"
   Brilliant-style 3D glassmorphic icons showing streaks
   ═════════════════════════════════════════════════════════════════ */
function StreakVisual({ show }) {
    const days = [
        { day: 'M', offset: 0, color: '#7C3AED' },
        { day: 'T', offset: 1, color: '#8B5CF6' },
        { day: 'W', offset: 2, color: '#A78BFA' },
        { day: 'T', offset: 3, color: '#C4B5FD' },
        { day: 'F', offset: 4, color: '#DDD6FE', current: true },
    ];

    return (
        <div style={{
            width: '100%', maxWidth: 480, position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32,
        }}>
            {/* Big streak number */}
            <div style={{
                textAlign: 'center',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.85)',
                transition: 'all 1s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.2s',
            }}>
                <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(4rem, 8vw, 7rem)',
                    fontWeight: 800, lineHeight: 1,
                    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.04em',
                }}>5</div>
                <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1rem', fontWeight: 600,
                    color: 'rgba(0,0,0,0.4)',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    marginTop: 4,
                }}>day streak</div>
            </div>

            {/* Day streak icons */}
            <div style={{
                display: 'flex', gap: 16, alignItems: 'flex-end',
            }}>
                {days.map((d, i) => (
                    <div key={i} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                        opacity: show ? 1 : 0,
                        transform: show
                            ? `translateY(0) scale(1)`
                            : `translateY(${30 + i * 10}px) scale(0.8)`,
                        transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
                        transitionDelay: `${0.4 + i * 0.12}s`,
                    }}>
                        {/* 3D-ish blob */}
                        <div style={{
                            width: d.current ? 72 : 58,
                            height: d.current ? 72 : 58,
                            borderRadius: d.current ? 22 : 18,
                            background: `linear-gradient(145deg, ${d.color} 0%, ${d.color}88 100%)`,
                            boxShadow: `0 ${d.current ? 12 : 6}px ${d.current ? 30 : 16}px ${d.color}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative',
                            transition: 'transform 0.3s ease',
                        }}>
                            {/* Lightning bolt */}
                            <svg width={d.current ? 28 : 22} height={d.current ? 28 : 22}
                                viewBox="0 0 24 24" fill="#fff" opacity="0.9">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            {/* Glass shine */}
                            <div style={{
                                position: 'absolute', top: 4, left: 6, right: 6,
                                height: '40%', borderRadius: '14px 14px 50% 50%',
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)',
                            }} />
                        </div>
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.85rem', fontWeight: 700,
                            color: d.current ? '#7C3AED' : 'rgba(0,0,0,0.3)',
                        }}>{d.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


/* ═════════════════════════════════════════════════════════════════
   MAIN COMPONENT — BodySections
   Brilliant-style alternating tinted backgrounds with
   large prominent visuals, serif headings, generous spacing
   ═════════════════════════════════════════════════════════════════ */
export default function BodySections() {
    const [ref1, show1] = useReveal(0.12);
    const [ref2, show2] = useReveal(0.12);
    const [ref3, show3] = useReveal(0.12);

    /* Shared heading style — Brilliant-inspired serif */
    const heading = (show, delay = '0.15s') => ({
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
        fontWeight: 700,
        lineHeight: 1.08,
        letterSpacing: '-0.03em',
        color: '#1a1a1a',
        margin: 0,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: delay,
    });

    const para = (show, delay = '0.4s') => ({
        fontFamily: "'Outfit', sans-serif",
        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
        fontWeight: 400,
        lineHeight: 1.8,
        color: 'rgba(26,26,26,0.55)',
        margin: 0,
        maxWidth: '38ch',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: delay,
    });

    const sectionBase = {
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
    };

    return (
        <>
            {/* ═══════════════════════════════════════════════
                SECTION 1 — "Concepts that stick"
                Soft green tint — Visual RIGHT (Brilliant style)
                ═══════════════════════════════════════════════ */}
            <section ref={ref1} id="body-spark" style={{
                ...sectionBase,
                padding: 'clamp(5rem, 10vw, 10rem) 6%',
                background: 'linear-gradient(170deg, #f0f7f0 0%, #e8f4e8 40%, #f5f0eb 100%)',
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    width: '100%', maxWidth: 1300, gap: '6%',
                    flexWrap: 'wrap',
                }}>
                    {/* Text LEFT */}
                    <div style={{
                        flex: '1 1 400px', minWidth: 300,
                        display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2vw, 2rem)',
                    }}>
                        <h2 style={heading(show1)}>
                            Concepts<br />that stick
                        </h2>
                        <p style={para(show1)}>
                            Short videos on fascinating topics surface in your feed — like discovering
                            a great song. When one pulls you in, Curio breaks it down from curiosity
                            to deep understanding, one layer at a time.
                        </p>
                        <p style={{
                            ...para(show1, '0.55s'),
                            fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                            color: 'rgba(26,26,26,0.35)',
                            maxWidth: '32ch',
                        }}>
                            Step-by-step interactive learning makes even complex ideas feel intuitive.
                        </p>
                    </div>

                    {/* Phone Mockup RIGHT */}
                    <div style={{
                        flex: '0 0 auto',
                        display: 'flex', justifyContent: 'center',
                    }}>
                        <PhoneFeedMockup show={show1} />
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════
                SECTION 2 — "Personalized paths"
                Soft lavender tint — Visual RIGHT (Brilliant learning tree)
                ═══════════════════════════════════════════════ */}
            <section ref={ref2} id="body-different" style={{
                ...sectionBase,
                padding: 'clamp(5rem, 10vw, 10rem) 6%',
                background: 'linear-gradient(170deg, #f0eef8 0%, #ebe7f5 40%, #f3eff8 100%)',
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    width: '100%', maxWidth: 1300, gap: '4%',
                    flexWrap: 'wrap',
                }}>
                    {/* Text LEFT */}
                    <div style={{
                        flex: '1 1 380px', minWidth: 280,
                        display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2vw, 2rem)',
                    }}>
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

                    {/* Concept Tree RIGHT */}
                    <div style={{
                        flex: '1 1 400px', minWidth: 320,
                        display: 'flex', justifyContent: 'center',
                    }}>
                        <ConceptTree show={show2} />
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════
                SECTION 3 — "Stay curious"
                Warm beige tint — Visual RIGHT (Streak visual)
                Like Brilliant's "Stay motivated" section
                ═══════════════════════════════════════════════ */}
            <section ref={ref3} id="body-compound" style={{
                ...sectionBase,
                padding: 'clamp(5rem, 10vw, 10rem) 6%',
                background: 'linear-gradient(170deg, #f7f5ef 0%, #f3efe5 40%, #f5f3ef 100%)',
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    width: '100%', maxWidth: 1300, gap: '6%',
                    flexWrap: 'wrap',
                }}>
                    {/* Text LEFT */}
                    <div style={{
                        flex: '1 1 400px', minWidth: 300,
                        display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2vw, 2rem)',
                    }}>
                        <h2 style={heading(show3)}>
                            Stay<br />curious
                        </h2>
                        <p style={para(show3)}>
                            Every concept you explore builds on the last.
                            Over time, you start seeing patterns — in decisions,
                            in systems, in how the world actually works.
                            That's not content consumption. That's real growth.
                        </p>
                        <p style={{
                            ...para(show3, '0.55s'),
                            fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                            color: 'rgba(26,26,26,0.35)',
                            maxWidth: '34ch',
                        }}>
                            Build streaks, unlock insights, and watch your understanding compound.
                        </p>
                    </div>

                    {/* Streak Visual RIGHT */}
                    <div style={{
                        flex: '0 0 auto',
                        display: 'flex', justifyContent: 'center',
                    }}>
                        <StreakVisual show={show3} />
                    </div>
                </div>
            </section>
        </>
    );
}
