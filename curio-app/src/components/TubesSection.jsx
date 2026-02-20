import { useEffect, useRef } from 'react';

let appInstance = null;

const randomColors = (count) =>
    Array.from({ length: count }, () =>
        '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );

export default function TubesSection() {
    const canvasRef = useRef(null);
    const sectionRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;

        async function initTubes() {
            try {
                const module = await import(
                    'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
                );
                const TubesCursor = module.default;
                appInstance = TubesCursor(canvas, {
                    tubes: {
                        count: 4,
                        colors: ['#5e72e4', '#8965e0', '#f5365c'],
                        lights: {
                            intensity: 240,
                            colors: ['#21d4fd', '#b721ff', '#f4d03f', '#11cdef'],
                        },
                    },
                });
            } catch (err) {
                console.error('Tubes initialization failed:', err);
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        initTubes();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(section);

        const onClick = (e) => {
            if (appInstance) {
                appInstance.tubes.setColors(randomColors(3));
                appInstance.tubes.setLightsColors(randomColors(4));
            }
        };
        section.addEventListener('click', onClick);

        return () => {
            section.removeEventListener('click', onClick);
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="tubes-section"
            className="relative w-screen h-screen bg-black overflow-hidden z-10 cursor-pointer"
        >
            <canvas
                ref={canvasRef}
                id="tubes-canvas"
                className="block w-full h-full absolute inset-0 z-0"
            />
            <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-1 pointer-events-none">
                <h2
                    className="m-0 text-white uppercase leading-none"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(3rem, 10vw, 100px)',
                        fontWeight: 700,
                        textShadow: '0 0 20px rgba(0,0,0,0.8)',
                    }}
                >
                    Tubes
                </h2>
                <h3
                    className="m-0 text-white uppercase leading-none"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2rem, 8vw, 80px)',
                        fontWeight: 500,
                        textShadow: '0 0 20px rgba(0,0,0,0.8)',
                    }}
                >
                    Cursor
                </h3>
                <p
                    ref={statusRef}
                    className="mt-8 uppercase"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
                        fontWeight: 300,
                        letterSpacing: '0.4em',
                    }}
                >
                    Click background for random colors
                </p>
            </div>
        </section>
    );
}
