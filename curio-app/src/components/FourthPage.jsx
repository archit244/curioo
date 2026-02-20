import { useEffect, useRef } from 'react';
import './FourthPage.css';

export default function FourthPage() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="fourth-page-wrapper" id="minimal-hero" ref={sectionRef}>
            <div className="fp-background-glow"></div>

            <div className="fp-container">
                <h2 className="fp-heading">
                    No courses. No lectures. No obligation.
                </h2>

                <div className="fp-body">
                    <p>
                        Curio is a totally free platform where you start where your curiosity pulls you.
                    </p>
                    <p>
                        We meet you there and break the concept down into clear, simple steps until it makes complete sense.
                    </p>
                </div>
            </div>
        </section>
    );
}
