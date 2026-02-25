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

    const count = TESTIMONIALS.length;

    return (
        <section
            id="testimonials-section"
            className="relative w-screen min-h-[50vh] flex flex-col items-center justify-center overflow-hidden z-10 py-20"
            style={{ background: '#1A110D', perspective: '1000px' }}
        >
            {/* Header */}
            <div className="relative z-[100] pointer-events-none w-full flex flex-col items-center mb-12">
                <h2
                    className="m-0"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        color: '#F5F2ED',
                        letterSpacing: '-0.03em',
                    }}
                >
                    Wall of Love
                </h2>
            </div>

            {/* Cards */}
            <div className="relative w-full h-[380px]">
                {TESTIMONIALS.map((t, i) => {
                    let rel = i - centerIndex;
                    if (rel > count / 2) rel -= count;
                    if (rel < -count / 2) rel += count;

                    const isCenter = rel === 0;
                    const absRel = Math.abs(rel);
                    const isHidden = absRel > 2; // Show 5 cards: center, +/- 1, +/- 2

                    // Position X for left, center and right
                    const tx = rel * 320;
                    // Match the baseline height
                    const ty = 0;
                    const sc = isCenter ? 1 : 1 - (absRel * 0.1);

                    return (
                        <div
                            key={t.id}
                            onClick={() => move(shortestPath(centerIndex, i, count))}
                            className="absolute left-1/2 top-1/2 cursor-pointer flex flex-col"
                            style={{
                                width: '380px',
                                height: 'auto',
                                zIndex: isHidden ? 0 : (50 - absRel * 10),
                                opacity: isHidden ? 0 : (isCenter ? 1 : (absRel === 1 ? 0.6 : 0.3)),
                                pointerEvents: isHidden ? 'none' : 'auto',
                                filter: isHidden ? 'blur(10px)' : (isCenter ? 'blur(0px)' : (absRel === 1 ? 'blur(2px)' : 'blur(4px)')),
                                transform: `translate(-50%, -50%) translateX(${tx}px) translateY(${ty}px) scale(${sc})`,
                                transition: isHidden
                                    ? 'none'
                                    : 'transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.8s cubic-bezier(0.22,1,0.36,1)',
                                background: '#ffffff',
                                borderRadius: '24px',
                                boxShadow: isCenter ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
                                padding: '2.5rem',
                                userSelect: 'none',
                                willChange: 'transform, opacity, filter',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div className="flex flex-col text-left w-full h-full pointer-events-none">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={t.img}
                                            alt={t.by}
                                            className="w-14 h-14 rounded-full object-cover"
                                            style={{
                                                filter: isCenter ? 'grayscale(0%)' : 'grayscale(100%)',
                                                transition: 'filter 0.5s ease',
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            <h4 className="font-bold text-[1.1rem] m-0 text-[#1A110D] leading-none mb-1">
                                                {t.by} {t.by === 'Alex' ? 'Chen' : ''}
                                            </h4>
                                            <p className="text-[0.85rem] font-medium m-0 text-[#8C8C8C]">
                                                {t.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-11 h-11 rounded-full bg-[#F3F4F6] text-[#6366F1] flex items-center justify-center shrink-0">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>
                                </div>
                                <p
                                    className="text-[1.1rem] font-medium leading-relaxed m-0 text-[#333333]"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    "{t.text}"
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
