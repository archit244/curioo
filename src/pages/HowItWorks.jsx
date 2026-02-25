import React, { useEffect } from 'react';

const HowItWorks = () => {
    // Scroll-to-Top on entry
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Observer for reveal
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 });

        const sections = document.querySelectorAll('.phase-section');
        sections.forEach(sec => observer.observe(sec));

        return () => {
            sections.forEach(sec => observer.unobserve(sec));
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#F5F5DC', color: '#3D2B1F', minHeight: '100vh', width: '100%', position: 'relative', overflowX: 'hidden' }} className="font-['Outfit']">
            <style>
                {`
                    /* Strict Spacing Rules (Nuclear Option) */
                    .hiw-container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 120px 20px 180px 20px;
                        position: relative;
                        box-sizing: border-box;
                    }



                    /* Section Layout */
                    .phase-section {
                        position: relative;
                        margin-bottom: 180px; /* 180px gap */
                        z-index: 1;
                        padding: 40px 0;
                    }
                    .phase-section:last-child {
                        margin-bottom: 0;
                    }

                    /* Large Faint Phase Number */
                    .phase-bg-number {
                        position: absolute;
                        top: -80px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 15rem;
                        font-weight: 800;
                        color: rgba(61, 43, 31, 0.04);
                        z-index: -1;
                        line-height: 1;
                        pointer-events: none;
                        user-select: none;
                    }

                    /* Typography */
                    .phase-header {
                        color: #3D2B1F;
                        font-size: 2.5rem;
                        text-transform: uppercase;
                        letter-spacing: 5px;
                        font-weight: 300;
                        margin-bottom: 2rem;
                        text-align: center;
                    }

                    .phase-desc {
                        color: #3D2B1F;
                        font-size: 1.125rem;
                        line-height: 2.2;
                        font-weight: 300;
                        text-align: center;
                    }

                    /* Cinematic Animations */
                    .phase-header-anim {
                        opacity: 0;
                        transform: translateX(-60px);
                        transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
                    }
                    
                    .phase-desc-anim {
                        opacity: 0;
                        transform: translateX(60px);
                        transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
                    }

                    .phase-section.is-visible .phase-header-anim {
                        opacity: 1;
                        transform: translateX(0);
                    }

                    .phase-section.is-visible .phase-desc-anim {
                        opacity: 1;
                        transform: translateX(0);
                        transition-delay: 0.2s; /* Stagger reveal */
                    }
                `}
            </style>

            <div className="hiw-container">
                <div className="phase-section">
                    <div className="phase-bg-number">01</div>
                    <h2 className="phase-header phase-header-anim">Ideation & Research</h2>
                    <p className="phase-desc phase-desc-anim">
                        Everything begins with a spark. Much like the first hour of an intense 24-hour hackathon, this phase is dedicated to exploring uncharted territories. We gather insights, brainstorm relentlessly, and outline the core mechanics of a disruptive idea. It's about letting creativity run wild before we anchor it to reality.
                    </p>
                </div>

                <div className="phase-section">
                    <div className="phase-bg-number">02</div>
                    <h2 className="phase-header phase-header-anim">Architectural Logic</h2>
                    <p className="phase-desc phase-desc-anim">
                        With an idea in place, the focus shifts entirely to structural integrity. Choosing the right tech stack—whether it's Python for scalable scripting, Java for solid enterprise logic, or Kotlin for modern concurrency—is critical. We meticulously design clean, optimal code architectures capable of handling future complexity without breaking a sweat.
                    </p>
                </div>

                <div className="phase-section">
                    <div className="phase-bg-number">03</div>
                    <h2 className="phase-header phase-header-anim">Development & Collaboration</h2>
                    <p className="phase-desc phase-desc-anim">
                        This is where the blueprint becomes a reality. Working in tight synergy, we build, iterate, and integrate. We focus on engineering seamless real-time experiences, constructing features as dynamic and highly-scalable as CollabSphere. It's strictly about synchronized pushing, merging logic, and creating features that feel instantly native.
                    </p>
                </div>

                <div className="phase-section">
                    <div className="phase-bg-number">04</div>
                    <h2 className="phase-header phase-header-anim">Testing & Optimization</h2>
                    <p className="phase-desc phase-desc-anim">
                        The final push. Mirroring the uncompromising conditions of competitive programming, we scrutinize every algorithm and stress-test the bounds of our logic. We refine and optimize memory usage, rendering speeds, and logic flaws until the application executes with zero latency and flawless precision.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
