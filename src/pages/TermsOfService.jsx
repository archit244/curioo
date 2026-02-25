import React from 'react';

const TermsOfService = () => {
    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full px-[5vw]">
                {/* Full Height Header */}
                <header className="min-h-[80vh] flex flex-col justify-center border-b border-[#1A110D]/10">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Agreement</h2>
                    <h1 className="text-6xl md:text-[9vw] font-extralight tracking-tighter leading-[0.9] mb-10">
                        Terms of Service
                    </h1>
                    <p className="text-xl md:text-[1.8vw] opacity-60 font-light max-w-4xl italic">
                        By using Curio, you join a community of curious minds. These terms ensure our ecosystem stays productive and respectful.
                    </p>
                </header>

                <div className="py-[10vh] grid md:grid-cols-[1fr_2fr] gap-[10vw]">
                    <aside className="hidden md:block">
                        <div className="sticky top-32 space-y-8 text-sm font-bold uppercase tracking-widest opacity-30">
                            <p>1. Acceptance</p>
                            <p>2. Accounts</p>
                            <p>3. IP Rights</p>
                            <p>4. Prohibitions</p>
                            <p>5. Liability</p>
                        </div>
                    </aside>

                    <article className="space-y-32 mb-40">
                        <section>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">01. Acceptance of Terms</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                                By accessing or using Curio, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">02. User Accounts</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                                You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">03. Intellectual Property</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                                All content on Curio, including reels, slides, and text, is the property of Curio or its content creators and is protected by intellectual property laws. You may not reproduce or distribute this content without permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">04. Platform Fair Use</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                                Curio is designed for personal, non-commercial educational use. Automated scraping, data mining, or any attempt to disrupt the service is strictly prohibited.
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

export default TermsOfService;
