import React, { useEffect, useRef } from 'react';

const TermsOfService = () => {
    // Scroll-to-Top on entry
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reveal-On-Scroll Logic
    const contentRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing once animated
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const sections = document.querySelectorAll('.reveal-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#F5F5DC', color: '#3D2B1F', minHeight: '100vh', width: '100%', padding: '5rem 0' }} className="font-['Outfit']">
            <style>
                {`
                    /* Strict Spacing & Structural Rules */
                    .tos-container {
                        width: 100%;
                        max-width: 720px;
                        margin: 0 auto;
                        padding: 0 20px; /* Some padding for mobile */
                        box-sizing: border-box;
                    }
                    
                    /* Text Styles */
                    .tos-text {
                        color: #3D2B1F;
                        line-height: 2.2;
                        font-size: 1.125rem;
                        font-weight: 300;
                    }

                    .tos-title {
                        color: #5C4033;
                        font-size: 3.5rem;
                        line-height: 1.1;
                        font-weight: 300;
                        margin-bottom: 2rem;
                        text-align: center;
                    }

                    .tos-subtitle {
                        color: #5C4033;
                        font-size: 2rem;
                        font-weight: 400;
                        margin-top: 120px;
                        margin-bottom: 1.5rem;
                    }

                    /* Custom Selection */
                    ::selection {
                        background-color: #3D2B1F;
                        color: #F5F5DC;
                    }
                    ::-moz-selection {
                        background-color: #3D2B1F;
                        color: #F5F5DC;
                    }

                    /* Reveal-On-Scroll Animation */
                    .reveal-section {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                    }

                    .reveal-section.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .tos-intro {
                        text-align: center;
                        font-size: 1.25rem;
                        opacity: 0.8;
                    }
                `}
            </style>

            <div className="tos-container" ref={contentRef}>
                <div className="reveal-section">
                    <h1 className="tos-title">Terms of Service</h1>
                    <p className="tos-text tos-intro">
                        Please read these rules carefully. They govern your use of our platform and create a legally binding agreement.
                    </p>
                </div>

                <div className="reveal-section">
                    <h2 className="tos-subtitle">01. Agreement to Terms</h2>
                    <p className="tos-text">
                        By accessing or using our services, you expressly agree to be bound by these Terms of Service. This agreement constitutes the entire understanding between you and the platform owner. If you do not accept these terms in their entirety, you must immediately cease all use of the platform. We reserve the right to modify these terms at any time without prior notice, and your continued use constitutes acceptance of those changes.
                    </p>
                </div>

                <div className="reveal-section">
                    <h2 className="tos-subtitle">02. Intellectual Property</h2>
                    <p className="tos-text">
                        All underlying code, designs, architectures (including systems like CollabSphere), text, graphics, and trademarks are the exclusive intellectual property of the creator. This content is protected by international copyright laws. You are granted no rights, implied or explicitly, to copy, alter, redistribute, or use these proprietary assets for any commercial or non-commercial purpose without express, written permission.
                    </p>
                </div>

                <div className="reveal-section">
                    <h2 className="tos-subtitle">03. User Conduct</h2>
                    <p className="tos-text">
                        Users are expected to operate within the bounds of standard digital etiquette. Any behavior deemed harmful, disruptive, or illegal is strictly prohibited. This includes, but is not limited to, unauthorized automated data gathering (scraping), attempting to breach server security, distributing malicious code, or harassing other users. Violation of these conduct rules will result in immediate termination of access.
                    </p>
                </div>

                <div className="reveal-section">
                    <h2 className="tos-subtitle">04. Limitation of Liability</h2>
                    <p className="tos-text">
                        The platform operates on an "as-is" and "as-available" basis. In no event shall the site owner, affiliates, or partners be held liable for any direct, indirect, incidental, or consequential damages arising from your use of the service. This includes loss of data, loss of revenue, or service interruptions. Your use of this application is fully at your own risk, and we make no warranties regarding its absolute reliability or uptime.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default TermsOfService;
