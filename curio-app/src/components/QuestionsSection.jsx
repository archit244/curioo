import { useEffect, useRef } from 'react';

const ROWS = [
    [
        { text: 'Why do smart people make bad decisions?', category: 'lang' },
        { text: 'Why do incentives change behavior faster than rules?', category: 'econ' },
        { text: 'Why do markets overreact before they stabilize?', category: 'econ' },
        { text: 'Why do habits beat motivation long-term?', category: 'lang' },
        { text: 'Why do groups often choose worse options than individuals?', category: 'lang' },
    ],
    [
        { text: 'Why does scarcity increase perceived value?', category: 'econ' },
        { text: 'Why do simple systems scale better than complex ones?', category: 'code' },
        { text: 'Why does confidence grow after action — not before?', category: 'lang' },
        { text: 'Why do people follow bad trends early?', category: 'econ' },
        { text: 'Why does removing friction change behavior instantly?', category: 'lang' },
    ],
    [
        { text: 'Why do small probabilities get ignored?', category: 'math' },
        { text: 'Why do defaults control most decisions?', category: 'lang' },
        { text: 'Why does feedback accelerate learning?', category: 'sci' },
        { text: 'Why do constraints improve creativity?', category: 'art' },
        { text: 'Why do short-term rewards beat long-term logic?', category: 'econ' },
    ],
    [
        { text: 'Why do mental models outperform memorization?', category: 'lang' },
        { text: 'Why do systems fail slowly — then suddenly?', category: 'code' },
        { text: 'Why do people trust stories more than data?', category: 'lang' },
        { text: 'Why does timing matter more than speed?', category: 'econ' },
        { text: 'Why do second-order effects surprise everyone?', category: 'code' },
    ],
];

export default function QuestionsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { section.classList.add('in-view'); obs.disconnect(); }
            });
        }, { threshold: 0.12 });
        obs.observe(section);
        return () => obs.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="questions-section"
            className="questions-section relative w-screen overflow-hidden z-10 flex flex-col items-center justify-center"
            style={{
                height: '90vh',
                background: 'linear-gradient(180deg, #B8D0FF 0%, #A8C4FF 50%, #B8D0FF 100%)',
                padding: '2.5rem 0', position: 'relative', zIndex: 20,
            }}
        >
            {/* Header */}
            <div className="questions-header relative z-20 text-center px-8 mb-14 pointer-events-none opacity-0" style={{ marginBottom: '4.5rem' }}>
                <div style={{
                    display: 'inline-block', padding: '6px 16px', background: '#000', borderRadius: 999,
                    fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 16,
                }}>Explore</div>
                <h2 style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                    fontWeight: 800, color: '#000', lineHeight: 1.05, letterSpacing: '-0.04em',
                }}>
                    Every question<br />deserves an answer.
                </h2>
            </div>

            {/* Marquee */}
            <div className="questions-marquee-wrap relative z-10 flex flex-col gap-4 w-full overflow-hidden">
                {ROWS.map((questions, r) => {
                    const pool = [...questions, ...questions, ...questions];
                    return (
                        <div key={r} className="q-row flex flex-row gap-4 flex-shrink-0 opacity-0 py-1" data-row={r} style={{ willChange: 'transform' }}>
                            {pool.map((q, i) => (
                                <div key={i}
                                    className="q-card flex-shrink-0 cursor-pointer relative overflow-hidden flex flex-col justify-start"
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid rgba(0,0,0,0.04)',
                                        borderRadius: 16, padding: '1.25rem 1.35rem',
                                        minWidth: 260, maxWidth: 320,
                                        transition: 'box-shadow 0.3s, transform 0.3s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem',
                                        fontWeight: 500, lineHeight: 1.5, color: '#000', margin: 0,
                                    }}>{q.text}</p>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Fade masks */}
            <div className="absolute top-0 bottom-0 left-0 z-[15] pointer-events-none"
                style={{ width: 160, background: 'linear-gradient(to right, #B8D0FF 0%, transparent 100%)' }} />
            <div className="absolute top-0 bottom-0 right-0 z-[15] pointer-events-none"
                style={{ width: 160, background: 'linear-gradient(to left, #B8D0FF 0%, transparent 100%)' }} />
        </section>
    );
}
