import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Subtitle script — each line is spoken word-by-word ─── */
const LINES = [
    'You scroll through ideas',
    'One catches your attention',
    'We break it down',
    'Beginner to expert',
];

const WORD_DELAY_MS = 280;    // ~speaking cadence per word
const LINE_PAUSE_MS = 1200;   // pause after full line appears
const WIPE_MS = 700;          // scroll-wipe between full cycles

export default function ScrollingIdeasVisual({ show }) {
    const [lineIdx, setLineIdx] = useState(0);
    const [wordCount, setWordCount] = useState(0); // how many words of current line to show
    const [wiping, setWiping] = useState(false);
    const progressRef = useRef(null);
    const timerRef = useRef(null);

    const words = LINES[lineIdx].split(' ');
    const visibleText = words.slice(0, wordCount).join(' ');

    /* ── Word-by-word reveal + line advancement ── */
    const tick = useCallback(() => {
        setWordCount(prev => {
            const totalWords = LINES[lineIdx].split(' ').length;

            if (prev < totalWords) {
                // reveal next word
                return prev + 1;
            }
            return prev;
        });
    }, [lineIdx]);

    useEffect(() => {
        if (!show) return;

        // start revealing words for current line
        setWordCount(0);
        let w = 0;
        const totalWords = LINES[lineIdx].split(' ').length;

        // reveal each word with speaking cadence
        const wordTimer = setInterval(() => {
            w++;
            setWordCount(w);
            if (w >= totalWords) {
                clearInterval(wordTimer);

                // pause, then move to next line
                timerRef.current = setTimeout(() => {
                    const nextLine = (lineIdx + 1) % LINES.length;

                    if (nextLine === 0) {
                        // full cycle done — wipe
                        setWiping(true);
                        setTimeout(() => {
                            setWiping(false);
                            setLineIdx(0);
                        }, WIPE_MS);
                    } else {
                        setLineIdx(nextLine);
                    }
                }, LINE_PAUSE_MS);
            }
        }, WORD_DELAY_MS);

        return () => {
            clearInterval(wordTimer);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [show, lineIdx]);

    /* ── Progress bar ── */
    useEffect(() => {
        if (!progressRef.current) return;
        const bar = progressRef.current;
        const fraction = (lineIdx + 1) / LINES.length;
        bar.style.transition = wiping ? 'width 0.3s ease' : `width ${WORD_DELAY_MS * words.length + LINE_PAUSE_MS}ms linear`;
        bar.style.width = wiping ? '0%' : `${fraction * 100}%`;
    }, [lineIdx, wiping, words.length]);

    return (
        <div style={{
            width: '100%',
            maxWidth: 220,
            aspectRatio: '9 / 16',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 18,
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '0.35s',
            boxShadow: '0 12px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,226,216,0.06)',
            margin: '0 auto',
        }}>

            {/* ── Cinematic moving background ── */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                background: '#1A110D',
                overflow: 'hidden',
            }}>
                {/* Mesh gradient layer 1 — warm amber */}
                <div style={{
                    position: 'absolute',
                    width: '280%', height: '280%',
                    top: '-80%', left: '-80%',
                    background: `
                        radial-gradient(ellipse 40% 50% at 30% 40%, rgba(200,149,108,0.5) 0%, transparent 60%),
                        radial-gradient(ellipse 35% 45% at 70% 60%, rgba(180,130,80,0.35) 0%, transparent 55%),
                        radial-gradient(ellipse 50% 40% at 50% 30%, rgba(140,95,55,0.25) 0%, transparent 50%)
                    `,
                    filter: 'blur(60px)',
                    animation: 'vidMeshPan1 22s ease-in-out infinite',
                }} />

                {/* Mesh gradient layer 2 — deep coffee */}
                <div style={{
                    position: 'absolute',
                    width: '250%', height: '250%',
                    top: '-60%', left: '-60%',
                    background: `
                        radial-gradient(ellipse 45% 55% at 60% 50%, rgba(100,65,40,0.45) 0%, transparent 55%),
                        radial-gradient(ellipse 35% 40% at 25% 65%, rgba(80,50,30,0.3) 0%, transparent 50%),
                        radial-gradient(ellipse 30% 35% at 75% 30%, rgba(160,110,70,0.22) 0%, transparent 45%)
                    `,
                    filter: 'blur(55px)',
                    animation: 'vidMeshPan2 18s ease-in-out infinite',
                }} />

                {/* Mesh gradient layer 3 — sand highlights */}
                <div style={{
                    position: 'absolute',
                    width: '220%', height: '220%',
                    top: '-50%', left: '-50%',
                    background: `
                        radial-gradient(ellipse 30% 40% at 45% 55%, rgba(232,226,216,0.14) 0%, transparent 50%),
                        radial-gradient(ellipse 25% 30% at 65% 35%, rgba(200,180,150,0.1) 0%, transparent 45%)
                    `,
                    filter: 'blur(50px)',
                    animation: 'vidMeshPan3 26s ease-in-out infinite',
                }} />

                {/* Film grain */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
                    opacity: 0.45,
                    mixBlendMode: 'overlay',
                    animation: 'vidGrainShift 0.8s steps(4) infinite',
                }} />

                {/* Light flicker */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(200,149,108,0.08) 0%, transparent 60%)',
                    animation: 'vidLightFlicker 6s ease-in-out infinite',
                }} />
            </div>

            {/* ── Scroll-wipe overlay ── */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 5,
                background: 'linear-gradient(to bottom, #1A110D 0%, rgba(26,17,13,0.9) 40%, transparent 100%)',
                transform: wiping ? 'translateY(0)' : 'translateY(-105%)',
                transition: wiping
                    ? `transform ${WIPE_MS * 0.5}ms cubic-bezier(0.4,0,0.2,1)`
                    : `transform ${WIPE_MS * 0.5}ms cubic-bezier(0.4,0,0.2,1) ${WIPE_MS * 0.4}ms`,
                pointerEvents: 'none',
            }} />

            {/* ── Bokeh particles ── */}
            {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    width: 3 + (i % 3) * 2,
                    height: 3 + (i % 3) * 2,
                    borderRadius: '50%',
                    background: `rgba(200, 149, 108, ${0.06 + (i % 3) * 0.04})`,
                    filter: 'blur(1px)',
                    left: `${8 + i * 12}%`,
                    top: `${10 + ((i * 19) % 70)}%`,
                    animation: `vidBokeh${i % 3} ${12 + i * 2}s ease-in-out infinite`,
                    zIndex: 1,
                }} />
            ))}

            {/* ── Center subtitle — word by word ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1.8rem',
                pointerEvents: 'none',
            }}>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#F5F2ED',
                    margin: 0,
                    textAlign: 'center',
                    letterSpacing: '0.01em',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)',
                    minHeight: '2.5em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.3s ease',
                    opacity: wiping ? 0 : 1,
                }}>
                    {visibleText}
                    {/* Blinking cursor after last word */}
                    {wordCount > 0 && wordCount < words.length && (
                        <span style={{
                            display: 'inline-block',
                            width: 2,
                            height: '1.2em',
                            background: 'rgba(200,149,108,0.7)',
                            marginLeft: 4,
                            animation: 'vidCursorBlink 0.8s steps(2) infinite',
                            verticalAlign: 'middle',
                        }} />
                    )}
                </p>
            </div>

            {/* ── Vignettes ── */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '20%',
                background: 'linear-gradient(to bottom, rgba(26,17,13,0.4) 0%, transparent 100%)',
                zIndex: 2, pointerEvents: 'none',
                borderRadius: '18px 18px 0 0',
            }} />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%',
                background: 'linear-gradient(to top, rgba(26,17,13,0.3) 0%, transparent 100%)',
                zIndex: 2, pointerEvents: 'none',
                borderRadius: '0 0 18px 18px',
            }} />

            {/* ── Video player chrome ── */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                zIndex: 6,
            }}>
                <div style={{
                    height: 3,
                    background: 'rgba(232,226,216,0.1)',
                    position: 'relative',
                    borderRadius: '0 0 18px 18px',
                    overflow: 'hidden',
                }}>
                    <div
                        ref={progressRef}
                        style={{
                            position: 'absolute',
                            top: 0, left: 0,
                            height: '100%',
                            width: '0%',
                            background: 'linear-gradient(to right, rgba(200,149,108,0.6), rgba(200,149,108,0.9))',
                            borderRadius: 2,
                        }}
                    />
                </div>
            </div>

            {/* ── Play icon ── */}
            <div style={{
                position: 'absolute',
                top: 14, left: 14,
                zIndex: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                opacity: 0.35,
            }}>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ display: 'block' }}>
                    <path d="M1 1L9 6L1 11V1Z" fill="#F5F2ED" fillOpacity="0.8" />
                </svg>
                <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.52rem',
                    fontWeight: 500,
                    color: 'rgba(245,242,237,0.65)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                }}>
                    curio
                </span>
            </div>

            {/* ── Keyframes ── */}
            <style>{`
                @keyframes vidMeshPan1 {
                    0%   { transform: translate(0, 0) rotate(0deg) scale(1); }
                    25%  { transform: translate(8%, 5%) rotate(2deg) scale(1.05); }
                    50%  { transform: translate(15%, -3%) rotate(-1deg) scale(0.98); }
                    75%  { transform: translate(5%, 8%) rotate(1.5deg) scale(1.03); }
                    100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                }
                @keyframes vidMeshPan2 {
                    0%   { transform: translate(0, 0) rotate(0deg) scale(1); }
                    30%  { transform: translate(-10%, 6%) rotate(-2deg) scale(1.06); }
                    60%  { transform: translate(-5%, -8%) rotate(1.5deg) scale(0.96); }
                    100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                }
                @keyframes vidMeshPan3 {
                    0%   { transform: translate(0, 0) scale(1); }
                    35%  { transform: translate(6%, -5%) scale(1.08); }
                    65%  { transform: translate(-8%, 4%) scale(0.95); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                @keyframes vidGrainShift {
                    0%   { transform: translate(0, 0); }
                    25%  { transform: translate(-2%, 1%); }
                    50%  { transform: translate(1%, -2%); }
                    75%  { transform: translate(-1%, 2%); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes vidLightFlicker {
                    0%, 100% { opacity: 0.3; }
                    20%  { opacity: 0.5; }
                    40%  { opacity: 0.25; }
                    60%  { opacity: 0.55; }
                    80%  { opacity: 0.35; }
                }
                @keyframes vidBokeh0 {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.06; }
                    50%      { transform: translateY(-20px) translateX(8px); opacity: 0.14; }
                }
                @keyframes vidBokeh1 {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.05; }
                    50%      { transform: translateY(-26px) translateX(-10px); opacity: 0.12; }
                }
                @keyframes vidBokeh2 {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.08; }
                    50%      { transform: translateY(-16px) translateX(5px); opacity: 0.16; }
                }
                @keyframes vidCursorBlink {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
