import { useEffect, useRef } from 'react';
import './SixthPage.css';

export default function SixthPage() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="sixth-page-wrapper" id="compound-hero" ref={sectionRef}>
            <div className="sfp-container">
                <h2 className="sfp-heading">
                    <span className="sfp-line-block">You already spend hours scrolling.</span>
                    <span className="sfp-line-block">Curio makes it compound.</span>
                </h2>

                <div className="sfp-body">
                    <p className="sfp-stagger-text">Instead of noise, you explore concepts — and unpack the logic behind them.</p>
                    <p className="sfp-stagger-text">Each concept strengthens your mental models.</p>
                    <p className="sfp-stagger-text">Each session sharpens how you think.</p>

                    <div className="sfp-final-thoughts">
                        <p className="sfp-emphasis-text">Small inputs.</p>
                        <p className="sfp-emphasis-text sfp-accent">Lasting intellectual gains.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
