import { useEffect, useRef } from 'react';

const ROWS = [
    [
        { text: 'Why do smart people make bad decisions?', category: 'language' },
        { text: 'Why do incentives change behavior faster than rules?', category: 'econ' },
        { text: 'Why do markets overreact before they stabilize?', category: 'econ' },
        { text: 'Why do habits beat motivation long-term?', category: 'language' },
        { text: 'Why do groups often choose worse options than individuals?', category: 'language' },
    ],
    [
        { text: 'Why does scarcity increase perceived value?', category: 'econ' },
        { text: 'Why do simple systems scale better than complex ones?', category: 'code' },
        { text: 'Why does confidence grow after action — not before?', category: 'language' },
        { text: 'Why do people follow bad trends early?', category: 'econ' },
        { text: 'Why does removing friction change behavior instantly?', category: 'language' },
    ],
    [
        { text: 'Why do small probabilities get ignored?', category: 'math' },
        { text: 'Why do defaults control most decisions?', category: 'language' },
        { text: 'Why does feedback accelerate learning?', category: 'science' },
        { text: 'Why do constraints improve creativity?', category: 'art' },
        { text: 'Why do short-term rewards beat long-term logic?', category: 'econ' },
    ],
    [
        { text: 'Why do mental models outperform memorization?', category: 'language' },
        { text: 'Why do systems fail slowly — then suddenly?', category: 'code' },
        { text: 'Why do people trust stories more than data?', category: 'language' },
        { text: 'Why does timing matter more than speed?', category: 'econ' },
        { text: 'Why do second-order effects surprise everyone?', category: 'code' },
    ],
];

const CHIP_COLORS = {
    math: { bg: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: 'rgba(99,102,241,0.35)' },
    science: { bg: 'rgba(16,185,129,0.15)', color: '#6ee7b7', border: 'rgba(16,185,129,0.3)' },
    language: { bg: 'rgba(236,72,153,0.15)', color: '#f9a8d4', border: 'rgba(236,72,153,0.3)' },
    code: { bg: 'rgba(14,165,233,0.15)', color: '#7dd3fc', border: 'rgba(14,165,233,0.3)' },
    art: { bg: 'rgba(168,85,247,0.15)', color: '#d8b4fe', border: 'rgba(168,85,247,0.3)' },
    econ: { bg: 'rgba(234,179,8,0.15)', color: '#fde047', border: 'rgba(234,179,8,0.3)' },
};

export default function QuestionsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.classList.add('in-view');
                    obs.disconnect();
                }
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
            style={{ height: '90vh', background: '#000000', padding: '2.5rem 0', position: 'relative', zIndex: 20 }}
        >
            {/* Header */}
            <div
                className="questions-header relative z-20 text-center px-8 mb-14 pointer-events-none opacity-0"
                style={{ marginBottom: '3.5rem' }}
            >
                <p
                    className="uppercase mb-4"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.35em',
                        color: 'rgba(0,0,0,0.45)',
                    }}
                >
                    Explore
                </p>
                <h2
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.05,
                        letterSpacing: '-0.04em',
                        marginBottom: '1.25rem',
                    }}
                >
                    Every question<br />deserves an answer.
                </h2>
                <p
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
                        fontWeight: 400,
                        color: 'rgba(0,0,0,0.45)',
                        lineHeight: 1.65,
                    }}
                >
                    Millions of curious minds ask these every day.<br />
                    Curio makes finding out feel effortless.
                </p>
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
                            {pool.map((q, i) => {
                                const chip = CHIP_COLORS[q.category] || CHIP_COLORS.econ;
                                return (
                                    <div
                                        key={i}
                                        className="q-card flex-shrink-0 rounded-2xl cursor-pointer relative overflow-hidden"
                                        style={{
                                            background: 'rgba(0,0,0,0.07)',
                                            border: '1px solid rgba(255,255,255,0.25)',
                                            padding: '1.25rem 1.35rem',
                                            minWidth: 260,
                                            maxWidth: 320,
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                                                fontWeight: 600,
                                                lineHeight: 1.5,
                                                letterSpacing: '-0.015em',
                                                color: '#ffffff',
                                                margin: 0,
                                            }}
                                        >
                                            {q.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Fade masks */}
            <div
                className="absolute top-0 bottom-0 left-0 z-[15] pointer-events-none"
                style={{ width: 160, background: 'linear-gradient(to right, #000000 0%, transparent 100%)' }}
            />
            <div
                className="absolute top-0 bottom-0 right-0 z-[15] pointer-events-none"
                style={{ width: 160, background: 'linear-gradient(to left, #000000 0%, transparent 100%)' }}
            />
        </section>
    );
}
