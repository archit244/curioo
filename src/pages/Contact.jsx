import React, { useEffect } from 'react';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#F5F5DC', color: '#3D2B1F', minHeight: '100vh', width: '100%', overflow: 'hidden' }} className="font-['Outfit']">
            <style>
                {`
                    .contact-wrapper {
                        max-width: 1100px;
                        margin: 5rem auto;
                        padding: 40px;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        gap: 60px;
                    }
                    @media (min-width: 768px) {
                        .contact-wrapper {
                            flex-direction: row;
                            gap: 40px;
                        }
                        .contact-left, .contact-right {
                            flex: 1;
                        }
                    }
                    .contact-left, .contact-right {
                        width: 100%;
                        box-sizing: border-box;
                    }
                    h1.contact-title, h2.contact-subtitle {
                        color: #3D2B1F;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        margin-top: 0;
                    }
                    h1.contact-title {
                        font-size: 2.5rem;
                        margin-bottom: 2rem;
                    }
                    h2.contact-subtitle {
                        font-size: 1.25rem;
                        margin-bottom: 0.5rem;
                    }
                    .contact-info-text {
                        line-height: 2.0;
                    }
                    .contact-row {
                        display: flex;
                        align-items: flex-start;
                        margin-bottom: 2.5rem;
                        gap: 1.5rem;
                    }
                    .contact-icon {
                        flex-shrink: 0;
                        margin-top: 5px;
                    }
                    
                    /* Animations */
                    @keyframes revealUp {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-reveal {
                        opacity: 0;
                        animation: revealUp 0.8s ease-out forwards;
                    }
                    .delay-1 { animation-delay: 0.2s; }
                    .delay-2 { animation-delay: 0.4s; }
                    .delay-3 { animation-delay: 0.6s; }
                    .delay-form { animation-delay: 0.8s; }

                    /* Form Styles */
                    .contact-form {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        width: 100%;
                        box-sizing: border-box;
                    }
                    .contact-input {
                        width: 100%;
                        background: transparent;
                        border: 1px solid rgba(61, 43, 31, 0.3);
                        padding: 1rem;
                        font-family: inherit;
                        font-size: 1rem;
                        color: #3D2B1F;
                        box-sizing: border-box;
                        border-radius: 4px;
                        transition: all 0.3s ease;
                    }
                    .contact-input::placeholder {
                        color: rgba(61, 43, 31, 0.5);
                    }
                    .contact-input:focus {
                        outline: none;
                        border: 2px solid #3D2B1F;
                    }
                    textarea.contact-input {
                        resize: vertical;
                        min-height: 150px;
                    }
                    .contact-btn {
                        background-color: #3D2B1F;
                        color: #F5F5DC;
                        padding: 1rem 2rem;
                        border: none;
                        border-radius: 4px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: inherit;
                        align-self: flex-start;
                        margin-top: 1rem;
                    }
                    .contact-btn:hover {
                        transform: scale(1.05);
                        letter-spacing: 4px;
                    }
                `}
            </style>

            <div className="contact-wrapper">
                <div className="contact-left animate-reveal">
                    <h1 className="contact-title">Contact Us</h1>
                    <div className="contact-info-text">
                        <div className="contact-row animate-reveal delay-1">
                            <div className="contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div>
                                <h2 className="contact-subtitle">Our Location</h2>
                                <p style={{ margin: 0 }}>123 Curio Avenue, Design District<br />Tech City, TC 10010</p>
                            </div>
                        </div>

                        <div className="contact-row animate-reveal delay-2">
                            <div className="contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div>
                                <h2 className="contact-subtitle">Phone Number</h2>
                                <p style={{ margin: 0 }}>+1 (555) 123-4567<br />Mon-Fri, 9am - 6pm</p>
                            </div>
                        </div>

                        <div className="contact-row animate-reveal delay-3">
                            <div className="contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div>
                                <h2 className="contact-subtitle">Email Address</h2>
                                <p style={{ margin: 0 }}>hello@curio.com<br />support@curio.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-right animate-reveal delay-form">
                    <h1 className="contact-title">Send a Message</h1>
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <input type="text" className="contact-input" placeholder="Your Name" required />
                        </div>
                        <div>
                            <input type="email" className="contact-input" placeholder="Your Email" required />
                        </div>
                        <div>
                            <textarea className="contact-input" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="contact-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
