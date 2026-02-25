import { useReveal } from './BodySections';
import { C, FONT, sectionBase, container, textCol, visualCol, label, heading, body } from './BodySections';

export default function CompoundSection() {
    const [ref, show] = useReveal(0.12);

    const features = [
        { num: '01', title: 'Mental Models', desc: 'Build frameworks that help you think clearly across any domain.' },
        { num: '02', title: 'Pattern Recognition', desc: 'See connections others miss — across incentives, systems, and decisions.' },
        { num: '03', title: 'Lasting Understanding', desc: 'Small inputs, lasting intellectual gains. Knowledge that stays with you.' },
    ];

    return (
        <section
            ref={ref}
            id="body-compound"
            className="flex justify-center"
            style={{
                ...sectionBase,
                padding: 'clamp(5rem, 10vw, 8rem) 6%',
                background: '#1A110D',
                borderTop: '1px solid rgba(232, 226, 216, 0.05)'
            }}
        >
            <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-16 md:gap-24 items-start">
                
                {/* Left Side - Main Statement */}
                <div className="flex-1 md:sticky top-32 flex flex-col gap-6">
                    <p style={label(show)}>Compound</p>
                    <h2 style={{
                        ...heading(show),
                        fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                        lineHeight: 1.1,
                        maxWidth: '18ch'
                    }}>
                        You already spend hours scrolling. <span style={{ color: C.accent }}>Make it compound.</span>
                    </h2>
                    <p style={{
                        ...body(show),
                        maxWidth: '40ch',
                        fontSize: '1.15rem',
                        lineHeight: 1.6,
                        opacity: 0.8
                    }}>
                        Instead of noise, you explore concepts and unpack the logic behind them.
                        Each session sharpens how you think.
                    </p>
                </div>

                {/* Right Side - Stacked List */}
                <div 
                    className="flex-1 w-full flex flex-col"
                    style={{
                        opacity: show ? 1 : 0,
                        transform: show ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: '0.3s',
                    }}
                >
                    {features.map((feature, i) => (
                        <div 
                            key={i} 
                            className="flex flex-col sm:flex-row gap-4 sm:gap-8 group border-t cursor-default"
                            style={{
                                borderColor: 'rgba(232,226,216,0.1)',
                                padding: '2.5rem 0',
                            }}
                        >
                            <span style={{
                                fontFamily: FONT,
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: C.accent,
                                opacity: 0.8,
                                paddingTop: '0.4rem'
                            }}>{feature.num}</span>
                            
                            <div className="flex flex-col gap-3">
                                <h3 style={{
                                    fontFamily: FONT,
                                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                                    fontWeight: 400,
                                    color: C.white,
                                    margin: 0,
                                    letterSpacing: '-0.01em',
                                    transition: 'color 0.3s ease'
                                }}>{feature.title}</h3>
                                <p style={{
                                    fontFamily: FONT,
                                    fontSize: '0.95rem',
                                    fontWeight: 300,
                                    lineHeight: 1.6,
                                    color: C.muted,
                                    margin: 0,
                                    maxWidth: '40ch',
                                }}>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
