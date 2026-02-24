import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
    { id: 1, text: "Complex ideas feel intuitive now. Our onboarding time has dropped by 60% since switching.", by: "Elena Rodriguez", role: "Operations at Scale", img: "https://i.pravatar.cc/150?img=47" },
    { id: 2, text: "My favorite solution in the market. We work 5x faster with Curio.", by: "Alex Chen", role: "CEO at TechCorp", img: "https://i.pravatar.cc/150?img=11" },
    { id: 3, text: "I'm confident my data is safe with Curio. I can't say that about other providers.", by: "Dan Smith", role: "CTO at SecureNet", img: "https://i.pravatar.cc/150?img=12" },
    { id: 4, text: "I know it's cliche, but we were lost before we found Curio. Can't thank you guys enough!", by: "Stephanie Lee", role: "COO at InnovateCo", img: "https://i.pravatar.cc/150?img=5" },
    { id: 5, text: "Curio's products make planning for the future seamless. Can't recommend them enough!", by: "Marie Dupont", role: "CFO at FuturePlanning", img: "https://i.pravatar.cc/150?img=9" },
    { id: 6, text: "If I could give 11 stars, I'd give 12.", by: "Andre Davis", role: "Head of Design", img: "https://i.pravatar.cc/150?img=15" },
    { id: 7, text: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.", by: "Jeremy Irons", role: "Product Lead", img: "https://i.pravatar.cc/150?img=16" },
];

function shortestPath(ci, t, total) {
    let d = t - ci; const h = total / 2;
    if (d > h) d -= total; if (d < -h) d += total;
    return d;
}

export default function TestimonialsSection() {
    const [centerIndex, setCenterIndex] = useState(0);
    const moveTimeoutRef = useRef(null);
    const cardSizeRef = useRef(window.innerWidth < 640 ? 320 : 460);
    const [, forceUpdate] = useState(0);
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const fn = () => { cardSizeRef.current = window.innerWidth < 640 ? 320 : 460; forceUpdate(n => n + 1); };
        window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn);
    }, []);
    useEffect(() => {
        const el = sectionRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
        obs.observe(el); return () => obs.disconnect();
    }, []);
    useEffect(() => { const iv = setInterval(() => move(1), 5000); return () => clearInterval(iv); }, []);

    function move(steps) {
        if (steps === 0) return;
        setCenterIndex(p => (p + steps + TESTIMONIALS.length) % TESTIMONIALS.length);
        if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
        moveTimeoutRef.current = setTimeout(() => { }, 800);
    }

    const cardSize = cardSizeRef.current;
    const count = TESTIMONIALS.length;

    return (
        <section ref={sectionRef} id="testimonials-section" style={{
            position: 'relative', width: '100vw', minHeight: '60vh', height: '60vh',
            display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', zIndex: 10,
            background: 'linear-gradient(180deg, #D6E4FF 0%, #C4DAFF 50%, #D6E4FF 100%)',
            perspective: '1200px', paddingTop: '3rem', paddingBottom: '2rem',
        }}>
            {/* Heading */}
            <div style={{
                textAlign: 'center', marginBottom: '1.5rem',
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s, transform 0.8s',
            }}>
                <div style={{
                    display: 'inline-block', padding: '6px 16px', background: '#000', borderRadius: 999,
                    fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 12,
                }}>Testimonials</div>
                <h2 style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 800, color: '#000', letterSpacing: '-0.03em', margin: 0,
                }}>Wall of Love</h2>
            </div>

            {/* Cards */}
            <div style={{ position: 'relative', width: '100%', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {TESTIMONIALS.map((t, i) => {
                        let rel = i - centerIndex;
                        if (rel > count / 2) rel -= count;
                        if (rel < -count / 2) rel += count;
                        const isCenter = rel === 0;
                        const isHidden = Math.abs(rel) > 2;
                        const base = cardSize * 0.75;

                        return (
                            <div key={t.id} onClick={() => move(shortestPath(centerIndex, i, count))} style={{
                                position: 'absolute', left: '50%', top: '50%', cursor: 'pointer',
                                width: base, height: base * 0.9,
                                zIndex: isHidden ? 0 : (50 - Math.abs(rel) * 10),
                                opacity: isHidden ? 0 : (isCenter ? 1 : Math.max(0.15, 0.5 - Math.abs(rel) * 0.15)),
                                pointerEvents: isHidden ? 'none' : 'auto',
                                filter: isHidden ? 'blur(10px)' : isCenter ? 'blur(0px)' : 'blur(4px)',
                                transform: `translate(-50%, -50%) translateX(${(base / 1.5) * rel}px) translateY(${isCenter ? 0 : (rel % 2 === 0 ? 25 : 10)}px) rotate(${isCenter ? 0 : rel * 2}deg) scale(${isCenter ? 1 : 0.88})`,
                                transition: isHidden ? 'none' : 'transform 0.9s cubic-bezier(0.25,1,0.3,1), opacity 0.9s cubic-bezier(0.25,1,0.3,1), filter 0.9s cubic-bezier(0.25,1,0.3,1)',
                                background: '#ffffff',
                                borderRadius: 28, border: '1px solid rgba(0,0,0,0.04)',
                                boxShadow: isCenter ? '0 15px 50px rgba(0,0,0,0.06)' : '0 4px 16px rgba(0,0,0,0.03)',
                                padding: '2rem', userSelect: 'none', willChange: 'transform, opacity, filter', boxSizing: 'border-box',
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', pointerEvents: 'none', gap: 16 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{
                                                width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
                                                border: '2px solid #000',
                                            }}>
                                                <img src={t.img} alt={t.by} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#000' }}>{t.by}</div>
                                                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)' }}>{t.role}</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: 12,
                                            background: '#E8EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
                                        }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 style={{
                                        fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                                        fontWeight: 500, lineHeight: 1.45, color: 'rgba(0,0,0,0.65)',
                                        margin: 0, flexGrow: 1, display: 'flex', alignItems: 'center',
                                    }}>"{t.text}"</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
