import { useEffect, useRef, useState } from 'react';
import QuestionsSection from './QuestionsSection';

/* ─── Scroll-reveal hook ─── */
export function useReveal(threshold = 0.15) {
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


/* ─── Palette tokens — Elementis-inspired earth tones on dark ─── */
export const C = {
    deep:       '#1B1B20',
    charcoal:   '#242429',
    warm:       '#2C2A25',
    sand:       '#E8E2D8',
    cream:      '#D4CEC4',
    muted:      '#7A756D',
    accent:     '#C8956C',
    white:      '#F5F2ED',
    divider:    'rgba(232,226,216,0.08)',
};

export const FONT = "'Inter', sans-serif";


/* ─── Image Placeholder ─── */
function ImagePlaceholder({ show, label, hint, delay = '0.3s' }) {
    return (
        <div style={{
            width: '100%',
            maxWidth: 520,
            aspectRatio: '4 / 3',
            borderRadius: 16,
            border: `1.5px dashed ${C.muted}50`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: delay,
        }}>
            <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${C.accent}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
            }}>🖼️</div>
            <span style={{
                fontFamily: FONT,
                fontSize: '0.78rem',
                fontWeight: 500,
                color: C.cream,
                letterSpacing: '0.03em',
                textAlign: 'center',
            }}>{label}</span>
            {hint && (
                <span style={{
                    fontFamily: FONT,
                    fontSize: '0.65rem',
                    fontWeight: 400,
                    color: C.muted,
                    letterSpacing: '0.02em',
                    textAlign: 'center',
                    maxWidth: '30ch',
                }}>{hint}</span>
            )}
        </div>
    );
}


/* ─── Shared style helpers ─── */
export const label = (show, delay = '0.1s') => ({
    fontFamily: FONT,
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: C.accent,
    margin: 0,
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
    transitionDelay: delay,
});

export const heading = (show, delay = '0.2s') => ({
    fontFamily: FONT,
    fontSize: 'clamp(2.4rem, 5vw, 4rem)',
    fontWeight: 200,
    lineHeight: 1.12,
    letterSpacing: '-0.03em',
    color: C.white,
    margin: 0,
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(32px)',
    transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
    transitionDelay: delay,
});

export const body = (show, delay = '0.4s') => ({
    fontFamily: FONT,
    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
    fontWeight: 300,
    lineHeight: 1.75,
    color: C.cream,
    margin: 0,
    maxWidth: '40ch',
    opacity: show ? 0.7 : 0,
    transform: show ? 'translateY(0)' : 'translateY(18px)',
    transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
    transitionDelay: delay,
});

export const sectionBase = {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 10,
};

export const container = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1300,
    gap: '8%',
};

export const textCol = {
    flex: '1 1 380px',
    minWidth: 280,
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 1.8vw, 1.6rem)',
};

export const visualCol = {
    flex: '1.2 1 400px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT — BodySections
   Dark editorial palette flowing from hero → footer
   ═══════════════════════════════════════════════════════════════ */
export default function BodySections() {
    const [ref1, show1] = useReveal(0.12);
    const [ref2, show2] = useReveal(0.12);
    const [ref3, show3] = useReveal(0.12);
    const [ref4, show4] = useReveal(0.12);

    return (
        <>
            {/* ═══════════════════════════════════════════════
                SECTION 1 & 2 Background Wrapper
                ═══════════════════════════════════════════════ */}
            <div style={{
                background: '#1A110D',
                width: '100vw',
                position: 'relative'
            }}>
            {/* ═══════════════════════════════════════════════
                SECTION 1 — "Scroll into ideas. Leave with clarity."
                Charcoal — first bridge from hero
                Text LEFT, Image RIGHT
                ═══════════════════════════════════════════════ */}
            <section ref={ref1} id="body-spark" style={{
                ...sectionBase,
                minHeight: '65vh',
                height: '65vh',
                padding: 'clamp(4rem, 8vw, 8rem) 6%',
                background: 'transparent',
            }}>
                {/* Subtle top divider */}
                <div style={{
                    position: 'absolute', top: 0, left: '6%', right: '6%',
                    height: 1, background: C.divider,
                }} />

                <div style={{ ...container, flexWrap: 'wrap' }}>
                    {/* Text */}
                    <div style={textCol}>
                        <h2 style={{ ...heading(show1), fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.04em' }}>
                            Scroll into ideas.<br />Leave with clarity.
                        </h2>
                        <p style={{ ...body(show1), fontSize: 'clamp(1.15rem, 1.4vw, 1.3rem)', fontWeight: 400 }}>
                            Learning here doesn't start with effort. It starts with curiosity.
                            You explore ideas like a feed — when something grabs you, we slow it
                            down until you truly understand it.
                        </p>

                    </div>

                    {/* Visual */}
                    <div style={visualCol}>
                        <ImagePlaceholder
                            show={show1}
                            label="Concept feed / scrolling interface"
                            hint="Add a screenshot of the Curio feed UI here"
                        />
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════
                SECTION 2 — "Start where your curiosity pulls you."
                Warm — subtle tonal shift
                Image LEFT, Text RIGHT
                ═══════════════════════════════════════════════ */}
            <section ref={ref2} id="body-different" style={{
                ...sectionBase,
                minHeight: '65vh',
                height: '65vh',
                padding: 'clamp(4rem, 8vw, 8rem) 6%',
                background: 'transparent',
            }}>
                <div style={{ ...container, flexWrap: 'wrap' }}>
                    {/* Visual */}
                    <div style={visualCol}>
                        <ImagePlaceholder
                            show={show2}
                            label="Concept tree / learning path"
                            hint="Add illustration showing branching topics here"
                        />
                    </div>

                    {/* Text */}
                    <div style={textCol}>
                        <h2 style={{ ...heading(show2), fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.04em' }}>
                            No courses.<br />No lectures.<br />No obligation.
                        </h2>
                        <p style={{ ...body(show2), fontSize: 'clamp(1.15rem, 1.4vw, 1.3rem)', fontWeight: 400 }}>
                            Curio is a totally free platform in which you Start where your curiosity pulls you.
                            We meet you there and break the concept down into clear, simple steps
                            until it makes complete sense.
                        </p>
                    </div>
                </div>
            </section>
            </div>

            <QuestionsSection />


        </>
    );
}
