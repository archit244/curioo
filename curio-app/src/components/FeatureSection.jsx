import { useEffect, useRef, useState } from 'react';

export default function FeatureSection({
    title,
    paragraph,
    imageSrc,
    imageAlt,
    reversed = false,
    dark = true,
    id,
}) {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.18 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const bg = dark ? '#0a0a0a' : '#f5f4f0';
    const textColor = dark ? '#ffffff' : '#111111';
    const paraColor = dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)';

    return (
        <section
            ref={sectionRef}
            id={id}
            style={{
                width: '100vw',
                minHeight: '90vh',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6rem 0',
                position: 'relative',
                zIndex: 10,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: reversed ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '1400px',
                    padding: '0 6%',
                    gap: '6%',
                }}
            >
                {/* Visual Side */}
                <div
                    style={{
                        flex: '0 0 48%',
                        maxWidth: '48%',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: '0.1s',
                    }}
                >
                    <div style={{
                        width: '100%',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        aspectRatio: '1 / 1',
                        background: dark ? '#151515' : '#e8e6e1',
                    }}>
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>
                </div>

                {/* Text Side */}
                <div
                    style={{
                        flex: '0 0 44%',
                        maxWidth: '44%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                    }}
                >
                    {/* Title */}
                    <h2
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                            color: textColor,
                            margin: 0,
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                            transitionDelay: '0.25s',
                        }}
                    >
                        {title.split('\n').map((line, i) => (
                            <span key={i} style={{ display: 'block' }}>{line}</span>
                        ))}
                    </h2>

                    {/* Paragraph */}
                    <p
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                            fontWeight: 400,
                            lineHeight: 1.7,
                            color: paraColor,
                            margin: 0,
                            maxWidth: '38ch',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(25px)',
                            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                            transitionDelay: '0.45s',
                        }}
                    >
                        {paragraph.split('\n').map((line, i) => (
                            <span key={i} style={{ display: 'block' }}>{line}</span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
}
