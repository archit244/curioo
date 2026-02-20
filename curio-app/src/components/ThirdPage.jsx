import { useEffect, useRef, useState } from 'react';
import './ThirdPage.css';

export default function ThirdPage() {
    const [expandedId, setExpandedId] = useState(null);
    const heroRef = useRef(null);

    const feedItems = [
        {
            id: 1,
            kicker: 'Concept',
            title: 'When something grabs you, we slow it down',
            teaser: 'Show a micro-tutorial, 2–3 steps, with an optional illustration. Use numbered steps, and keep voice direct.',
            details: [
                'Step 1: Identify the core concept without jargon.',
                'Step 2: Visualize it with a simple, relatable analogy.',
                'Step 3: Connect it back to the big picture.'
            ]
        },
        {
            id: 2,
            kicker: 'Method',
            title: 'Focus on progressive disclosure',
            teaser: 'Show just enough to spark curiosity, then reveal depth when requested. Build understanding layer by layer.',
            details: [
                'Start with a high-level summary.',
                'Provide interactive elements to dive deeper.',
                'Ensure the user never feels overwhelmed by text walls.'
            ]
        },
        {
            id: 3,
            kicker: 'Design',
            title: 'Clarity through typography and space',
            teaser: 'A clean layout reduces cognitive load. Let the eyes travel naturally across the information architecture.',
            details: [
                'Use generous line height for readability.',
                'Contrast serif headings with sans-serif body text.',
                'Maintain a consistent 8px spacing rhythm.'
            ]
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-drop');
                }
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="third-page-wrapper" id="clarity-section">
            <div className="third-page-container">

                {/* Full-width Hero */}
                <section className="tp-hero" ref={heroRef} aria-labelledby="tp-hero-heading">
                    <div className="tp-hero-content">
                        <h1 id="tp-hero-heading" className="tp-heading">
                            Scroll into ideas.<br />Leave with clarity.
                        </h1>
                        <p className="tp-sub">
                            Learning here doesn’t start with effort. It starts with curiosity. You explore ideas like a feed. When something grabs you, we slow it down — until you truly understand it.
                        </p>
                    </div>
                    <div className="tp-hero-visual">
                        <div className="tp-wireframe-cube"></div>
                    </div>
                </section>

                {/* Two Column Layout */}
                <div className="tp-main-layout">

                    {/* Left Column: Feed */}
                    <article className="tp-feed">
                        <div className="tp-card tp-intro-card">
                            <p className="tp-lead">
                                You explore ideas like a feed. The content on this page should feel scannable: short paragraphs, clear visual anchors, and micro-interactions when you hover or click a card to slow the narrative down.
                            </p>
                            <ol className="tp-ordered-list">
                                <li>Make each idea a short block (40–80 words).</li>
                                <li>When user clicks an idea, open a detail pane that animates from the item (scale + blur) and shows step-by-step explanation.</li>
                                <li>Use progressive disclosure: show teaser & expand for deep-dive.</li>
                            </ol>
                        </div>

                        {feedItems.map((item) => {
                            const isExpanded = expandedId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    className={`tp-card tp-interactive-card ${isExpanded ? 'expanded' : ''}`}
                                    onClick={() => toggleExpand(item.id)}
                                    tabIndex="0"
                                    role="button"
                                    aria-expanded={isExpanded}
                                >
                                    <div className="tp-card-header">
                                        <span className="tp-kicker-small">{item.kicker}</span>
                                    </div>
                                    <h3 className="tp-card-title">{item.title}</h3>
                                    <p className="tp-card-teaser">{item.teaser}</p>

                                    {/* Expandable Detail Pane */}
                                    <div className="tp-detail-pane">
                                        <div className="tp-detail-content">
                                            <div className="tp-divider"></div>
                                            <ol className="tp-detail-steps">
                                                {item.details.map((step, idx) => (
                                                    <li key={idx}><span>{idx + 1}.</span> {step}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="tp-expand-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isExpanded ? 'rotated' : ''}>
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </article>

                    {/* Right Column: Sidebar */}
                    <aside className="tp-sidebar">
                        <div className="tp-sidebar-sticky">
                            <div className="tp-kicker">Featured</div>
                            <h4 className="tp-sidebar-title">Slow-Down Stories</h4>
                            <p className="tp-sidebar-text">
                                A rotating list of short case studies — click any to expand inline and read the deeper explanation.
                            </p>
                            <button className="tp-btn">Explore</button>
                        </div>
                    </aside>

                </div>
            </div>
        </section>
    );
}
