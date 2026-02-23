import { useEffect, useRef, useState, Suspense } from 'react';
import HeroModel from './HeroModel';

/* global HTMLElement */

const COPY_LINES = [
    {
        label: '01 — Explore',
        heading: 'Scroll into\nideas.',
        body: "Learning here doesn't start with effort.\nIt starts with curiosity.",
    },
    {
        label: '02 — Discover',
        heading: 'Leave with\nclarity.',
        body: 'You explore ideas like a feed.\nWhen something grabs you, we slow it down.',
    },
    {
        label: '03 — Master',
        heading: 'Until you truly\nunderstand it.',
        body: 'No timers. No pressure. Just the moment\nyou finally get it.',
    },
];

export default function TechSection() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.15 }
        );
        obs.observe(section);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="spline-section"
            className="tech-section"
        >
            {/* Left — all copy lines at once */}
            <div className="spline-copy">
                {COPY_LINES.map(({ label, heading, body }, idx) => (
                    <div
                        key={idx}
                        className={`spline-copy-item${inView ? ' spline-anim-up' : ''}`}
                        style={{ animationDelay: `${idx * 200}ms` }}
                    >
                        <span className="spline-label">{label}</span>
                        <h2 className="spline-heading">
                            {heading.split('\n').map((line, i) => (
                                <span key={i} style={{ display: 'block' }}>{line}</span>
                            ))}
                        </h2>
                        <p className="spline-body">
                            {body.split('\n').map((line, i) => (
                                <span key={i} style={{ display: 'block' }}>{line}</span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>

            {/* Right — 3D Model, no Spline */}
            <div className="spline-canvas-wrap">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/50">Loading 3D Model...</div>}>
                    <HeroModel />
                </Suspense>
            </div>
        </section>
    );
}
