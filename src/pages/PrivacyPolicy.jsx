import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full px-[5vw]">
                {/* Full Height Header */}
                <header className="min-h-[80vh] flex flex-col justify-center border-b border-[#1A110D]/10">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Legal Framework</h2>
                    <h1 className="text-6xl md:text-[9vw] font-extralight tracking-tighter leading-[0.9] mb-10">
                        Privacy Policy
                    </h1>
                    <p className="text-xl md:text-[1.8vw] opacity-60 font-light max-w-4xl italic">
                        Your trust is our most valuable asset. This document details exactly how we handle your data—with absolute transparency.
                    </p>
                </header>

                <div className="py-[10vh] grid md:grid-cols-[1fr_2fr] gap-[10vw]">
                    <aside className="hidden md:block">
                        <div className="sticky top-32 space-y-8 text-sm font-bold uppercase tracking-widest opacity-30">
                            <p className="hover:opacity-100 cursor-pointer transition-opacity">1. Data Collection</p>
                            <p className="hover:opacity-100 cursor-pointer transition-opacity">2. Usage Rights</p>
                            <p className="hover:opacity-100 cursor-pointer transition-opacity">3. Distribution</p>
                            <p className="hover:opacity-100 cursor-pointer transition-opacity">4. Security</p>
                        </div>
                    </aside>

                    <article className="space-y-32 mb-40">
                        <section>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">01. Data Collection</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                                At Curio, we collect information to help you learn better. This includes basic account info like your email, and usage data like which lessons you've completed. We don't collect data we don't need.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">02. How We Use Data</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                                We use your info to personalize your feed, track your progress, and occasionally send you updates about new features. We never sell your personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">03. Information Sharing</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                                We only share your data with trusted partners who help us run the platform (like our server providers). All partners are vetted for security and privacy compliance.
                            </p>
                        </section>

                        <section className="pt-20 border-t border-[#1A110D]/10 opacity-30 text-sm font-bold uppercase tracking-widest">
                            Last Updated: February 25, 2026
                        </section>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
