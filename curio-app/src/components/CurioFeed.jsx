import { useEffect, useState, useRef } from 'react';
import './CurioFeed.css';

const MODAL_CONTENT = [
    {
        tag: 'Concept Deconstruction // 01',
        title: 'Selective Slow-Down',
        steps: [
            'Deconstruct the premise into its simplest undeniable components.',
            'Adjust variables to see how the system reacts in real-time.',
            'Lock the understanding into your long-term mental model library.'
        ]
    },
    {
        tag: 'Concept Deconstruction // 02',
        title: 'Progressive Disclosure',
        steps: [
            'Spark initial curiosity with a single provocative surface-level hook.',
            'Reveal the next layer only when the previous one is engaged with.',
            'Build a complete understanding through a sequence of rewarding realizations.'
        ]
    },
    {
        tag: 'Concept Deconstruction // 03',
        title: 'Spatial Clarity',
        steps: [
            'Strip everything non-essential from the visual field.',
            'Let generous whitespace act as a pacing mechanism for the reader\'s eye.',
            'Use high contrast and minimal color to ensure the idea is the only focal point.'
        ]
    }
];

export default function CurioFeed() {
    const [spotlightPos, setSpotlightPos] = useState({ x: -1000, y: -1000 });
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeModal, setActiveModal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const cardsRef = useRef([]);
    const modalTimeoutRef = useRef(null);

    // Mouse spotlight
    useEffect(() => {
        const onMove = (e) => setSpotlightPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // Scroll: progress + card focus
    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            if (total > 0) setScrollProgress((scrolled / total) * 100);

            cardsRef.current.forEach(card => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const center = window.innerHeight / 2;
                const cardMid = rect.top + rect.height / 2;
                const threshold = window.innerWidth < 768 ? 300 : 250;

                if (Math.abs(center - cardMid) < threshold) {
                    card.classList.add('focused');
                    card.classList.remove('unfocused');
                } else {
                    card.classList.remove('focused');
                    card.classList.add('unfocused');
                }
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Escape key
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    });

    const openModal = (idx) => {
        setActiveModal(idx);
        setIsModalVisible(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalVisible(false);
        if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
        modalTimeoutRef.current = setTimeout(() => {
            setActiveModal(null);
            document.body.style.overflow = '';
        }, 700);
    };

    const data = activeModal !== null ? MODAL_CONTENT[activeModal] : null;

    return (
        <div className="cf-wrap">
            {/* Spotlight */}
            <div className="cf-spotlight" style={{ left: spotlightPos.x, top: spotlightPos.y }} />

            {/* Progress Rail */}
            <div className="cf-progress-rail">
                <div className="cf-progress-thumb" style={{ top: `${(scrollProgress / 100) * 156}px` }} />
            </div>

            {/* ── HERO ── */}
            <section className="cf-hero">
                <h1 className="cf-kinetic-text">
                    SCROLL<br />
                    <span className="cf-text-outline">INTO</span><br />
                    IDEAS.
                </h1>

                <p className="cf-hero-body" style={{ marginTop: '3rem', maxWidth: '36rem' }}>
                    We don&apos;t teach. We facilitate{' '}
                    <em style={{ color: '#ffffff', fontStyle: 'italic' }}>understanding</em>.
                    {' '}A narrative stream that adapts to your curiosity.
                </p>
            </section>

            {/* ── FEED ── */}
            <section className="cf-feed-section">

                {/* Card 1 */}
                <div
                    ref={el => cardsRef.current[0] = el}
                    onClick={() => openModal(0)}
                    className="cf-idea-card unfocused"
                >
                    <h2 className="cf-card-title">When something grabs you, we slow it down.</h2>
                    <p className="cf-card-body">
                        Instead of a fixed pace, Curio reacts to your engagement. We identify focus points and unfold deep logic automatically.
                    </p>
                </div>

                {/* Card 2 */}
                <div
                    ref={el => cardsRef.current[1] = el}
                    onClick={() => openModal(1)}
                    className="cf-idea-card unfocused"
                >
                    <h2 className="cf-card-title" style={{ color: '#e5e7eb' }}>Build understanding layer by layer.</h2>
                    <p className="cf-card-body">
                        We spark curiosity with light hooks, then reveal depth as you request it. Understanding is a sequence of realizations.
                    </p>
                </div>

                {/* Card 3 */}
                <div
                    ref={el => cardsRef.current[2] = el}
                    onClick={() => openModal(2)}
                    className="cf-idea-card unfocused"
                >
                    <h2 className="cf-card-title">Clarity through space.</h2>
                    <p className="cf-card-body">
                        A clean layout reduces cognitive load. We let your mind travel naturally across an architecture designed for focus.
                    </p>
                </div>

            </section>

            {/* ── THESIS (White) ── */}
            <section className="cf-thesis">
                <h2 className="cf-thesis-title">
                    AI ASSISTS WORK.<br />
                    WE BUILD{' '}
                    <span style={{ fontStyle: 'italic', fontWeight: 300, opacity: 0.3 }}>UNDERSTANDING.</span>
                </h2>
                <div className="cf-thesis-divider" />
                <p className="cf-thesis-body">
                    Seeing patterns across domains—incentives, systems, cause and effect—is still a human skill. Curio helps you master it in clear steps.
                </p>
            </section>

            {/* ── OBLIGATION-FREE ── */}
            <section className="cf-obligation">
                <div className="cf-obligation-inner">
                    <div>
                        <h2 className="cf-obligation-heading">
                            NO COURSES.<br />NO LECTURES.<br />
                            <span style={{ fontStyle: 'italic', opacity: 0.2 }}>NO OBLIGATION.</span>
                        </h2>
                    </div>
                    <div className="cf-obligation-right">
                        <p className="cf-obligation-body">
                            Curio is a sanctuary for the self-directed mind. We provide the map, you provide the intuition.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── COMPOUND ── */}
            <section className="cf-compound">
                <h3 className="cf-compound-subtitle">Scrolling is usually a cost.</h3>

                <div className="cf-compound-word-wrap">
                    <h2 className="cf-compound-word" style={{ position: 'relative', zIndex: 20 }}>COMPOUND.</h2>
                    <h2 className="cf-compound-word-echo" style={{ opacity: 0.10, filter: 'blur(4px)', transform: 'translate(-50%, -50%) scale(1.1)' }}>COMPOUND.</h2>
                    <h2 className="cf-compound-word-echo" style={{ opacity: 0.05, filter: 'blur(10px)', transform: 'translate(-50%, -50%) scale(1.25)' }}>COMPOUND.</h2>
                </div>

                <p className="cf-compound-body">
                    Curiosity is the principal. Understanding is the interest.
                    With Curio, every scroll is an{' '}
                    <em style={{ color: '#ffffff' }}>investment</em>{' '}
                    in your mental architecture.
                </p>



                <div className="cf-compound-gradient" />
            </section>

            {/* ── MODAL ── */}
            <div
                className={`cf-modal-backdrop${isModalVisible ? '' : ' cf-hidden'}`}
                onClick={closeModal}
            >
                <div
                    className={`cf-modal-box${isModalVisible ? '' : ' cf-hidden'}`}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="cf-modal-close" onClick={closeModal}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {data && (
                        <>
                            <span className="cf-modal-tag">{data.tag}</span>
                            <h2 className="cf-modal-title">{data.title}</h2>
                            <div className="cf-modal-steps">
                                {data.steps.map((step, i) => (
                                    <div className="cf-modal-step" key={i}>
                                        <div className="cf-modal-step-num">{i + 1}</div>
                                        <p className="cf-modal-step-text">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
