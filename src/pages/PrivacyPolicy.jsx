import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-wrapper">
            <style>
                {`
                    .privacy-wrapper {
                        background-color: #F5F5DC;
                        width: 100%;
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        font-family: inherit;
                    }
                    .privacy-container {
                        max-width: 700px;
                        width: 100%;
                        padding: 60px;
                        box-sizing: border-box;
                    }
                    .privacy-text {
                        color: #3D2B1F;
                        line-height: 2.2;
                        margin: 0;
                    }
                    .privacy-header {
                        color: #5C4033;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        margin-top: 0;
                        margin-bottom: 40px;
                    }
                    .privacy-section {
                        margin-bottom: 100px;
                    }
                    .privacy-section:last-child {
                        margin-bottom: 0;
                    }

                    @keyframes revealUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .reveal-up {
                        animation: revealUp 0.8s ease-out forwards;
                        opacity: 0;
                    }
                    .delay-1 { animation-delay: 0.1s; }
                    .delay-2 { animation-delay: 0.3s; }
                    .delay-3 { animation-delay: 0.5s; }
                    .delay-4 { animation-delay: 0.7s; }
                    .delay-5 { animation-delay: 0.9s; }
                    .delay-6 { animation-delay: 1.1s; }
                `}
            </style>

            <main className="privacy-container">
                <div className="reveal-up delay-1">
                    <p className="privacy-text" style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '40px' }}>
                        Last Updated: February 25, 2026
                    </p>
                    <h1 className="privacy-header" style={{ fontSize: '2.5rem' }}>Privacy Policy</h1>
                </div>

                <section className="privacy-section reveal-up delay-2">
                    <h2 className="privacy-header" style={{ fontSize: '1.5rem' }}>Introduction</h2>
                    <p className="privacy-text">
                        We are deeply committed to protecting your personal information and your right to privacy. When you visit our website and use our services, you trust us with your personal data. We take your privacy very seriously and are dedicated to safeguarding the information you share with us through transparent, secure, and responsible practices.
                    </p>
                </section>

                <section className="privacy-section reveal-up delay-3">
                    <h2 className="privacy-header" style={{ fontSize: '1.5rem' }}>Information We Collect</h2>
                    <p className="privacy-text">
                        We collect personal information that you voluntarily provide to us, including basic account details such as your name, email address, and contact preferences. Additionally, we automatically gather usage data—such as your IP address, browser characteristics, and operating system—when you interact with our platform to help us understand how to optimize our services.
                    </p>
                </section>

                <section className="privacy-section reveal-up delay-4">
                    <h2 className="privacy-header" style={{ fontSize: '1.5rem' }}>How We Use Your Data</h2>
                    <p className="privacy-text">
                        The information we collect is strictly used to improve your overall user experience. By analyzing usage patterns, we can personalize your interactions, streamline navigation, and introduce new features that directly address your needs. We also utilize your data to facilitate account management and ensure our platform maintains the highest standards of security and reliability.
                    </p>
                </section>

                <section className="privacy-section reveal-up delay-5">
                    <h2 className="privacy-header" style={{ fontSize: '1.5rem' }}>Cookies</h2>
                    <p className="privacy-text">
                        We use cookies and similar tracking technologies to access or store information. These subtle technologies allow us to remember your preferences and understand your browsing behavior. This information is critical to tailoring our content and ensuring that your journey on our platform feels intuitive, personalized, and uninterrupted.
                    </p>
                </section>

                <section className="privacy-section reveal-up delay-6">
                    <h2 className="privacy-header" style={{ fontSize: '1.5rem' }}>Your Rights</h2>
                    <p className="privacy-text">
                        Under standard privacy regulations, you possess significant rights regarding your personal data. You have the right to request access to the information we hold about you, request corrections to any inaccuracies, and ask for the deletion of your personal data under certain conditions. You also hold the right to object to our processing of your information and to withdraw your consent at any time.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
