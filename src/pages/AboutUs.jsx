import React, { useEffect, useRef } from 'react';

const AboutUs = () => {
    const observerRefs = useRef([]);

    useEffect(() => {
        // Navigation Reset: Scroll to top when page loads
        window.scrollTo(0, 0);

        // Intersection Observer for Scroll-Driven Reveal
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Trigger when at least 15% of the element is visible
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <style>
                {`
                    /* Scroll-Driven Reveal Animation */
                    .reveal-block {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
                    }
                    .reveal-block.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    ::selection {
                        background: #3D2B1F;
                        color: #F5F5DC;
                    }
                `}
            </style>

            <div style={styles.contentWrapper}>

                {/* Section 1: The Origin */}
                <section style={styles.section} ref={addToRefs} className="reveal-block">
                    <h2 style={styles.header}>The Origin</h2>
                    <p style={styles.paragraph}>
                        Every significant leap forward begins with a simple question: <i>What if we could do this better?</i> Curio was not born in a boardroom, but from a persistent, burning desire to bridge the gap between heavy, complex computational logic and breathtaking, seamless human design. Initially conceived as an experiment to visualize algorithms, Curio rapidly evolved into a holistic ecosystem where high-performance engineering respectfully steps aside to let the user experience shine. We envisioned a world where interacting with our platform felt less like navigating software and more like wandering through a thoughtfully curated digital gallery.
                    </p>
                </section>

                {/* Section 2: The Philosophy */}
                <section style={styles.section} ref={addToRefs} className="reveal-block">
                    <h2 style={styles.header}>The Philosophy</h2>
                    <p style={styles.paragraph}>
                        Our true north is what we call <strong>Curiosity-Driven Development</strong>. We believe that software should not only grant answers but should also invite profound questions. We set out to democratize access to advanced technology—whether it's raw analytical power, data orchestration, or AI-driven automation—and wrap it in an interface of uncompromising beauty. The goal is to strip away the intimidating barriers of cutting-edge tech, transforming complex machine learning models and efficient backend code into accessible, intuitive tools that empower rather than overwhelm.
                    </p>
                </section>

                {/* Section 3: The Tech Behind the Name */}
                <section style={styles.section} ref={addToRefs} className="reveal-block">
                    <h2 style={styles.header}>The Tech Behind the Name</h2>
                    <p style={styles.paragraph}>
                        Beneath this minimal, airy surface breathes a relentlessly optimized architecture. The foundation of Curio is rooted in deep expertise spanning across multiple paradigms. Robust, heavily fortified data pipelines written in Python and Java pulse under the hood, guaranteeing absolute stability and lightning-fast execution. On the surface, React orchestrates the presentation layer, transforming raw data into smooth, cinematic interactions. Every line of code, from the backend microservices right up to the CSS transitions, is written with a singular metric in mind: creating an invisible, frictionless bond between the machine and the human.
                    </p>
                </section>

                {/* Section 4: The Future */}
                <section style={{ ...styles.section, marginBottom: 0 }} ref={addToRefs} className="reveal-block">
                    <h2 style={styles.header}>The Future</h2>
                    <p style={styles.paragraph}>
                        Curio is not a static monolith; it is a living, breathing entity. As we stand at the frontier of what is possible, our roadmap is defined by continuous, aggressive innovation and uncompromising user-centric evolution. We are actively exploring deeper integrations with generative ai models and ambient computing interfaces, ensuring that Curio will always remain steps ahead. Our promise is simple: we will continue to obsess over the unseen logic, so you can continue to marvel at the effortless design.
                    </p>
                </section>

            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: '#F5F5DC', // Pure Beige
        color: '#3D2B1F', // Deep Brown
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'Inter', sans-serif",
        paddingTop: '1px', // Prevents margin collapse at the top
    },
    contentWrapper: {
        maxWidth: '720px', // Strict editorial limit
        margin: '0 auto',
        padding: '10vh 10%', // Extreme spacing: 10% padding on sides
        boxSizing: 'border-box',
    },
    section: {
        marginBottom: '120px', // Extreme Spacing
    },
    header: {
        color: '#5C4033', // Chocolate Brown
        textTransform: 'uppercase',
        letterSpacing: '5px', // Emphasis Styling
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '2.5rem',
        opacity: 0.9,
    },
    paragraph: {
        fontSize: '1.25rem', // Elegant, readable size
        lineHeight: 2.2, // Extreme Spacing: line-height
        fontWeight: 400,
        margin: 0,
        color: '#3D2B1F',
    }
};

export default AboutUs;
