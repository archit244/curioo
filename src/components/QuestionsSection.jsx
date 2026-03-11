import { useEffect, useRef } from 'react';

const ROWS = [
    [
        { text: "Why does time slow down near a black hole?", category: "physics" },
        { text: "How do habits form in the brain?", category: "psych" },
        { text: "Why do some economies grow faster than others?", category: "econ" },
        { text: "What makes a story resonate across cultures?", category: "culture" },
        { text: "How does sleep affect memory consolidation?", category: "psych" },
    ],
    [
        { text: "Why do we procrastinate even when we know better?", category: "psych" },
        { text: "How do supply chains break down?", category: "econ" },
        { text: "What is the observer effect in quantum physics?", category: "physics" },
        { text: "Why did ancient Rome really fall?", category: "history" },
        { text: "How do social networks influence behavior?", category: "culture" },
    ],
    [
        { text: "What causes inflation to spiral?", category: "econ" },
        { text: "How does CRISPR gene editing work?", category: "science" },
        { text: "Why is compound interest so powerful?", category: "econ" },
        { text: "What makes some ideas spread like wildfire?", category: "culture" },
        { text: "How do vaccines train the immune system?", category: "science" },
    ],
];

const BG = '#E8DCC8';
const CARD_BG = '#FFFFFF';

export default function QuestionsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;

            const header = section.querySelector('.questions-header');
            const rows = section.querySelectorAll('.q-row');

            if (header) {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }

            rows.forEach((row, r) => {
                row.style.opacity = '1';
                const dir = r % 2 === 0 ? -1 : 1;
                const speed = 28 + r * 5;
                let pos = 0;
                const totalW = row.scrollWidth / 3;
                let lastT = performance.now();
                (function tick(t) {
                    pos += ((t - lastT) / 1000) * speed * dir;
                    lastT = t;
                    if (dir === -1 && pos < -totalW) pos += totalW;
                    if (dir === 1 && pos > 0) pos -= totalW;
                    row.style.transform = `translateX(${pos}px)`;
                    row._raf = requestAnimationFrame(tick);
                })(performance.now());
            });
        }, { threshold: 0.12 });

        obs.observe(section);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="questions-section"
            style={{
                position: 'relative',
                width: '100vw',
                height: '60vh',
                background: BG,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem 0',
                zIndex: 20,
            }}
        >
            {/* Header */}
            <div
                className="questions-header"
                style={{
                    position: 'relative',
                    zIndex: 20,
                    textAlign: 'center',
                    padding: '0 2rem',
                    marginBottom: '2rem',
                    opacity: 0,
                    transform: 'translateY(24px)',
                    transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: 'none',
                }}
            >

                <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                    fontWeight: 300,
                    color: '#1A110D',
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    margin: 0,
                }}>
                    Think across domains.<br />Sound smarter everywhere.
                </h2>
            </div>

            {/* Marquee rows */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                width: '100%',
                overflow: 'hidden',
            }}>
                {ROWS.map((questions, r) => {
                    const pool = [...questions, ...questions, ...questions];
                    return (
                        <div
                            key={r}
                            className="q-row"
                            style={{
                                display: 'flex',
                                gap: '2rem',
                                flexShrink: 0,
                                opacity: 0,
                                padding: '0.25rem 0',
                                willChange: 'transform',
                            }}
                        >
                            {pool.map((q, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flexShrink: 0,
                                        padding: '0.8rem 0',
                                        cursor: 'default',
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '1.15rem',
                                        fontWeight: 400,
                                        lineHeight: 1.6,
                                        color: '#2C2520',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {q.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Fade masks */}
            <div style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, zIndex: 15,
                width: 160, pointerEvents: 'none',
                background: `linear-gradient(to right, ${BG} 0%, transparent 100%)`,
            }} />
            <div style={{
                position: 'absolute', top: 0, bottom: 0, right: 0, zIndex: 15,
                width: 160, pointerEvents: 'none',
                background: `linear-gradient(to left, ${BG} 0%, transparent 100%)`,
            }} />
        </section>
    );
}
