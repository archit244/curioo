import React, { useEffect, useRef } from 'react';

const Features = () => {
    const observerRefs = useRef([]);

    useEffect(() => {
        // Navigation Fix: Scroll to top when page loads
        window.scrollTo(0, 0);

        // Intersection Observer for Staggered Reveal Animation
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Trigger when element becomes visible
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
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

    const featuresData = [
        {
            title: "Optimized Logic",
            desc: "Writing high-performance code isn't just a requirement; it's a discipline forged through years of competitive programming. I analyze time complexity and resource efficiency with precision, consistently achieving high-scoring contest performance by treating every algorithm as an opportunity for optimization."
        },
        {
            title: "Cross-Platform Mastery",
            desc: "Bridging ecosystems by building resilient, adaptable codebases. From the elegant simplicity of Python scripts to the robust, statically-typed architectures of Java and Kotlin, I seamlessly navigate paradigms to deliver reliable applications across mobile and backend environments."
        },
        {
            title: "Scalable Architecture",
            desc: "Designing systems that grow with you. Leveraging hands-on experience from projects like CollabSphere, I architect collaborative, highly functional digital environments. Modularity, state management, and clear data pipelines ensure applications remain swift and stable as they scale."
        },
        {
            title: "AI Integration",
            desc: "Pioneering the future by embedding intelligence into everyday tools. I harness advanced machine learning models and large language APIs to create highly functional, automated applications that anticipate user needs, generate actionable insights, and automate complex cognitive workflows."
        }
    ];

    return (
        <div style={styles.pageContainer}>
            <style>
                {`
                    /* Staggered Reveal Animation classes */
                    .feature-block {
                        opacity: 0;
                        transform: translateY(25px);
                        transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
                        /* Initial invisible border so hover doesn't jump the layout */
                        border: 1px solid transparent; 
                        box-sizing: border-box;
                    }
                    .feature-block.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    /* Stagger Delays */
                    .feature-block:nth-child(1) { transition-delay: 0.1s; }
                    .feature-block:nth-child(2) { transition-delay: 0.25s; }
                    .feature-block:nth-child(3) { transition-delay: 0.4s; }
                    .feature-block:nth-child(4) { transition-delay: 0.55s; }

                    /* Hover Effects */
                    .feature-block:hover {
                        border: 1px solid #3D2B1F;
                    }
                    .feature-block:hover .feature-header {
                        color: #5C4033; /* Chocolate Brown */
                    }
                    
                    .feature-header {
                        transition: color 0.3s ease;
                    }

                    @media (max-width: 768px) {
                        .feature-grid {
                            grid-template-columns: 1fr !important;
                            gap: 40px !important;
                        }
                    }
                `}
            </style>

            <div style={styles.gridContainer} className="feature-grid">
                {featuresData.map((feature, idx) => (
                    <div
                        key={idx}
                        style={styles.featureBlock}
                        className="feature-block"
                        ref={addToRefs}
                    >
                        <h2 style={styles.header} className="feature-header">
                            {feature.title}
                        </h2>
                        <p style={styles.description}>
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: '#F5F5DC', // Beige
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'Inter', sans-serif",
        paddingTop: '1px', // Prevents margin collapse
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        maxWidth: '1100px',
        margin: '6rem auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        boxSizing: 'border-box',
    },
    featureBlock: {
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: 'transparent',
    },
    header: {
        color: '#3D2B1F', // Brown
        fontWeight: 'bold',
        textTransform: 'lowercase',
        letterSpacing: '2px',
        margin: '0 0 1.5rem 0',
        fontSize: '1.8rem',
    },
    description: {
        color: '#3D2B1F', // Deep Brown
        fontWeight: 500, // Medium weight
        lineHeight: 2.0,
        margin: 0,
        fontSize: '1.1rem',
    }
};

export default Features;
