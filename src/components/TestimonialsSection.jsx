import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
    { id: 1, text: "My favorite solution in the market. We work 5x faster with Curio.", by: "Alex", role: "CEO at TechCorp", img: "https://i.pravatar.cc/150?img=11" },
    { id: 2, text: "I'm confident my data is safe with Curio. I can't say that about other providers.", by: "Dan", role: "CTO at SecureNet", img: "https://i.pravatar.cc/150?img=12" },
    { id: 3, text: "I know it's cliche, but we were lost before we found Curio. Can't thank you guys enough!", by: "Stephanie", role: "COO at InnovateCo", img: "https://i.pravatar.cc/150?img=13" },
    { id: 4, text: "Curio's products make planning for the future seamless. Can't recommend them enough!", by: "Marie", role: "CFO at FuturePlanning", img: "https://i.pravatar.cc/150?img=14" },
    { id: 5, text: "If I could give 11 stars, I'd give 12.", by: "Andre", role: "Head of Design", img: "https://i.pravatar.cc/150?img=15" },
    { id: 6, text: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.", by: "Jeremy", role: "Product Lead", img: "https://i.pravatar.cc/150?img=16" },
    { id: 7, text: "Took some convincing, but now that we're on Curio, we're never going back.", by: "Pam", role: "Brand Director", img: "https://i.pravatar.cc/150?img=17" },
    { id: 8, text: "I would be lost without Curio's in-depth analytics. The ROI is EASILY 100X.", by: "Daniel", role: "Data Scientist", img: "https://i.pravatar.cc/150?img=18" },
    { id: 9, text: "It's just the best. Period. No other tool comes close to this efficiency.", by: "Fernando", role: "Lead UX", img: "https://i.pravatar.cc/150?img=19" },
    { id: 10, text: "I switched 5 years ago and never looked back. Best decision for our team.", by: "Andy", role: "DevOps Lead", img: "https://i.pravatar.cc/150?img=20" },
];

function shortestPath(centerIndex, target, total) {
    let diff = target - centerIndex;
    const half = total / 2;
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    return diff;
}

export default function TestimonialsSection() {
    const [centerIndex, setCenterIndex] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const moveTimeoutRef = useRef(null);
    const cardSizeRef = useRef(window.innerWidth < 640 ? 160 : 210);
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const onResize = () => {
            cardSizeRef.current = window.innerWidth < 640 ? 160 : 210;
            forceUpdate(n => n + 1);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    function move(steps) {
        if (steps === 0) return;
        setCenterIndex(prev => (prev + steps + TESTIMONIALS.length) % TESTIMONIALS.length);
        setIsMoving(true);
        if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
        moveTimeoutRef.current = setTimeout(() => setIsMoving(false), 800);
    }

    const cardSize = cardSizeRef.current;
    const count = TESTIMONIALS.length;

    return (
        <section
            id="testimonials-section"
            className="relative w-screen h-[70vh] flex flex-col items-center justify-center overflow-hidden z-10"
            style={{ background: '#1A110D', perspective: '1000px' }}
        >
            {/* Header */}
            <div className="absolute top-6 text-center z-[100] pointer-events-none">
                <h2
                    className="uppercase m-0 mb-2"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        color: '#F5F2ED',
                        letterSpacing: '-0.04em',
                    }}
                >
                    What beta users are saying
                </h2>
            </div>

            {/* Cards */}
            <div className="relative w-full h-full">
                {TESTIMONIALS.map((t, i) => {
                    let rel = i - centerIndex;
                    if (rel > count / 2) rel -= count;
                    if (rel < -count / 2) rel += count;

                    const isCenter = rel === 0;
                    const isHidden = Math.abs(rel) > 2;

                    const tx = (cardSize / 1.4) * rel;
                    const ty = isCenter ? -40 : (rel % 2 === 0 ? 20 : -20);
                    const rot = isCenter ? 0 : rel * 5;
                    const sc = isCenter ? 1 : 0.82;

                    return (
                        <div
                            key={t.id}
                            onClick={() => move(shortestPath(centerIndex, i, count))}
                            className="absolute left-1/2 top-1/2 cursor-pointer flex flex-col"
                            style={{
                                width: cardSize,
                                height: cardSize,
                                zIndex: isHidden ? 0 : (50 - Math.abs(rel) * 10),
                                opacity: isHidden ? 0 : (isCenter ? 1 : 0.3),
                                pointerEvents: isHidden ? 'none' : 'auto',
                                filter: isHidden ? 'blur(10px)' : (isCenter ? 'blur(0px)' : 'blur(3px)'),
                                transform: `translate(-50%, -50%) translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${sc})`,
                                transition: isHidden
                                    ? 'none'
                                    : 'transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.8s cubic-bezier(0.22,1,0.36,1)',
                                background: '#ffffff',
                                color: isCenter ? '#1A110D' : 'rgba(27,27,32,0.6)',
                                border: isCenter ? '1px solid rgba(27,27,32,0.1)' : '1px solid rgba(27,27,32,0.06)',
                                boxShadow: isCenter ? '16px 16px 0px 0px rgba(124,92,252,0.06)' : 'none',
                                clipPath: 'polygon(40px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40px)',
                                padding: '2rem',
                                userSelect: 'none',
                                willChange: 'transform, opacity, filter',
                                boxSizing: 'border-box',
                                // floating animation for center card
                                animation: isCenter && !isMoving ? 'tmFloat 5s ease-in-out infinite' : 'none',
                            }}
                        >
                            {/* Corner line */}
                            <span
                                className="absolute"
                                style={{
                                    left: -1, top: 28,
                                    width: 56.5, height: 2,
                                    transformOrigin: 'top left',
                                    transform: 'rotate(135deg)',
                                     background: isCenter ? 'rgba(27,27,32,0.08)' : 'rgba(27,27,32,0.04)',
                                }}
                            />
                            <div className="flex flex-col h-full pointer-events-none">
                                <div className="flex justify-between items-start mb-6">
                                    <img
                                        src={t.img}
                                        alt={t.by}
                                        className="w-14 h-14 object-cover"
                                        style={{
                                            border: `2px solid currentColor`,
                                            filter: isCenter ? 'grayscale(0%)' : 'grayscale(100%)',
                                            transition: 'filter 0.5s ease',
                                        }}
                                    />
                                    <svg
                                        className="w-9 h-9 opacity-15"
                                        viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.5"
                                        strokeLinecap="round" strokeLinejoin="round"
                                    >
                                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                                    </svg>
                                </div>
                                <h3
                                    className="flex-1"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)',
                                        fontWeight: 700,
                                        lineHeight: 1.35,
                                        letterSpacing: '-0.02em',
                                        margin: '0 0 1rem',
                                    }}
                                >
                                    "{t.text}"
                                </h3>
                                <div
                                    className="mt-auto pt-4"
                                    style={{ borderTop: '1px solid currentColor', opacity: 0.5 }}
                                >
                                    <p
                                        className="m-0 uppercase"
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            letterSpacing: '0.1em',
                                        }}
                                    >
                                        {t.by}
                                    </p>
                                    <p
                                        className="m-0 mt-1 uppercase"
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: '0.62rem',
                                            fontWeight: 500,
                                            opacity: 0.6,
                                        }}
                                    >
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="absolute bottom-12 flex gap-6 z-[60]">
                {[
                    { label: 'Previous', icon: <path d="m15 18-6-6 6-6" />, step: -1 },
                    { label: 'Next', icon: <path d="m9 18 6-6-6-6" />, step: 1 },
                ].map(btn => (
                    <button
                        key={btn.label}
                        aria-label={btn.label}
                        onClick={() => move(btn.step)}
                        className="flex items-center justify-center w-16 h-16 bg-transparent cursor-pointer transition-all duration-300"
                        style={{
                            border: '2px solid rgba(232,220,200,0.15)',
                            color: '#D4CEC4',
                            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.borderColor = '#F5F2ED';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,92,252,0.1)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = '';
                            e.currentTarget.style.borderColor = 'rgba(232,220,200,0.15)';
                            e.currentTarget.style.boxShadow = '';
                        }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            {btn.icon}
                        </svg>
                    </button>
                ))}
            </div>
        </section>
    );
}
