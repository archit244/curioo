import { useEffect, useRef } from 'react';
import './FifthPage.css';

export default function FifthPage() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            },
            { threshold: 0.25 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="fifth-page-wrapper" id="understanding-hero" ref={sectionRef}>
            <div className="ffp-background-glow"></div>

            <div className="ffp-container">
                <h2 className="ffp-heading">
                    <span className="ffp-line ffp-line-1">AI can assist your work.</span>
                    <span className="ffp-line ffp-line-2">It can’t build your understanding.</span>
                </h2>

                <div className="ffp-body">
                    <p>
                        Seeing patterns across domains — incentives, systems, cause and effect — is still a human skill.
                    </p>
                    <p>
                        Curio helps you develop it in small, clear concept steps.
                    </p>
                </div>
            </div>
        </section>
    );
}
