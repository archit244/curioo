import React, { useEffect } from 'react';

const CookiePolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#F5F5DC', color: '#3D2B1F', minHeight: '100vh', width: '100%', fontFamily: "'Inter', sans-serif" }}>
            <style>
                {`
                    @keyframes revealUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .reveal-up {
                        opacity: 0;
                        animation: revealUp 0.8s ease-out forwards;
                    }
                    .hover-link {
                        text-decoration: none;
                        position: relative;
                        color: #5C4033;
                        font-weight: 600;
                    }
                    .hover-link::after {
                        content: '';
                        position: absolute;
                        width: 100%;
                        transform: scaleX(0);
                        height: 1px;
                        bottom: 0;
                        left: 0;
                        background-color: #5C4033;
                        transform-origin: bottom right;
                        transition: transform 0.25s ease-out;
                    }
                    .hover-link:hover::after {
                        transform: scaleX(1);
                        transform-origin: bottom left;
                    }
                    .cookie-container {
                        max-width: 820px;
                        width: 100%;
                        margin: 0 auto;
                        padding: 60px;
                        box-sizing: border-box;
                    }
                    .cookie-header {
                        color: #5C4033;
                        text-transform: uppercase;
                        letter-spacing: 4px;
                        margin-bottom: 24px;
                    }
                    .cookie-section-header {
                        margin-top: 100px;
                    }
                    .cookie-paragraph {
                        line-height: 2.2;
                        margin-bottom: 24px;
                        font-size: 1.05rem;
                        color: #3D2B1F;
                    }
                    .last-updated {
                        font-size: 0.85rem;
                        font-style: italic;
                        opacity: 0.7;
                        margin-bottom: 40px;
                    }
                `}
            </style>

            <div className="cookie-container">
                <div className="reveal-up last-updated" style={{ animationDelay: '0.1s' }}>
                    Last Updated: February 25, 2026
                </div>

                <h1 className="cookie-header reveal-up" style={{ fontSize: '2.5rem', animationDelay: '0.2s', marginBottom: '40px' }}>
                    Cookie Policy
                </h1>

                <div>
                    <h2 className="cookie-header cookie-section-header reveal-up" style={{ animationDelay: '0.3s' }}>
                        What Are Cookies
                    </h2>
                    <p className="cookie-paragraph reveal-up" style={{ animationDelay: '0.4s' }}>
                        Cookies are small data files stored directly on your device when you interact with our website. We use these tiny pieces of information to refine your overall browsing experience, remember your personalized preferences, and guarantee that our platform runs optimally from the exact moment you arrive.
                    </p>
                </div>

                <div>
                    <h2 className="cookie-header cookie-section-header reveal-up" style={{ animationDelay: '0.5s' }}>
                        Essential vs. Performance Cookies
                    </h2>
                    <p className="cookie-paragraph reveal-up" style={{ animationDelay: '0.6s' }}>
                        <strong>Essential Cookies:</strong> These represent the foundational building blocks of our site. They securely authenticate users, prevent the fraudulent use of login credentials, and ensure that core functionalities operate seamlessly. Our site essentially cannot function correctly without these critical files.
                    </p>
                    <p className="cookie-paragraph reveal-up" style={{ animationDelay: '0.7s' }}>
                        <strong>Performance Cookies:</strong> These cookies invisibly capture usage patterns and quantify user interactions in the background. By understanding which specific areas of the site generate the highest engagement and pinpointing any potential technical errors, we are able to continuously refine and elevate the user interface.
                    </p>
                </div>

                <div>
                    <h2 className="cookie-header cookie-section-header reveal-up" style={{ animationDelay: '0.8s' }}>
                        Third-Party Tools
                    </h2>
                    <p className="cookie-paragraph reveal-up" style={{ animationDelay: '0.9s' }}>
                        To deliver a state-of-the-art interactive experience, we incorporate specialized external tools, such as advanced analytics dashboards and sophisticated AI engines. These established third-party partners may place their own distinct cookies on your system to function as designed. We rigorously vet our partners, yet they remain bound uniformly by their own independent corporate data guidelines.
                    </p>
                </div>

                <div>
                    <h2 className="cookie-header cookie-section-header reveal-up" style={{ animationDelay: '1.0s' }}>
                        How to Opt-Out
                    </h2>
                    <p className="cookie-paragraph reveal-up" style={{ animationDelay: '1.1s' }}>
                        You continually retain full authority over how your data is tracked and handled. Should you desire to restrict, block, or clear our cookies entirely, you can comfortably do so manually through your <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="hover-link">browser settings</a>. However, please be thoroughly mindful that actively disabling essential cookies may severely compromise your digital experience and block access to integral features of our entire platform.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
