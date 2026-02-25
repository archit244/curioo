import { useEffect, useRef, useState } from 'react';

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

export default function QuestionsSection() {
    const sectionRef = useRef(null);
    const rowRefs = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const header = section.querySelector('.questions-header');
        const rows = section.querySelectorAll('.q-row');

        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            if (header) header.style.opacity = '1';

            rows.forEach((row, r) => {
                row.style.opacity = '1';
                const dir = r % 2 === 0 ? -1 : 1;
                const speed = 40 + r * 8;
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
            className="questions-section relative w-screen overflow-hidden z-10 flex flex-col items-center justify-center"
            style={{ height: '80vh', background: '#E8DCC8', padding: '2.5rem 0', position: 'relative', zIndex: 20 }}
        >
            {/* Header */}
            <div
                className="questions-header relative z-20 text-center px-8 mb-14 pointer-events-none opacity-0"
                style={{ marginBottom: '3.5rem' }}
            >

                <h2
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                        fontWeight: 300,
                        color: '#1A110D',
                        lineHeight: 1.12,
                        letterSpacing: '-0.03em',
                        marginBottom: '1.25rem',
                    }}
                >
                    Think across domains.<br />Sound smarter everywhere.
                </h2>

            </div>

            {/* Marquee rows */}
            <div
                className="questions-marquee-wrap relative z-10 flex flex-col gap-4 w-full overflow-hidden"
            >
                {ROWS.map((questions, r) => {
                    const pool = [...questions, ...questions, ...questions];
                    return (
                        <div
                            key={r}
                            className="q-row flex flex-row gap-4 flex-shrink-0 opacity-0 py-1"
                            data-row={r}
                            style={{ willChange: 'transform' }}
                        >
                            {pool.map((q, i) => (
                                <div
                                    key={i}
                                    className="q-card flex-shrink-0 rounded-2xl cursor-pointer relative overflow-hidden"
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid rgba(27,27,32,0.08)',
                                        padding: '1.25rem 1.35rem',
                                        minWidth: 260,
                                        maxWidth: 320,
                                        boxShadow: '0 2px 8px rgba(27,27,32,0.04)',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                                            fontWeight: 500,
                                            lineHeight: 1.75,
                                            color: '#1A110D',
                                            margin: 0,
                                        }}
                                    >
                                        {q.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Fade masks */}
            <div
                className="absolute top-0 bottom-0 left-0 z-[15] pointer-events-none"
                style={{ width: 160, background: 'linear-gradient(to right, #E8DCC8 0%, transparent 100%)' }}
            />
            <div
                className="absolute top-0 bottom-0 right-0 z-[15] pointer-events-none"
                style={{ width: 160, background: 'linear-gradient(to left, #E8DCC8 0%, transparent 100%)' }}
            />
        </section>
    );
}
