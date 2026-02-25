import React from 'react';

const CookiePolicy = () => {
    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full px-[5vw]">
                {/* Full Height Header */}
                <header className="min-h-[80vh] flex flex-col justify-center border-b border-[#1A110D]/10">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Experience</h2>
                    <h1 className="text-6xl md:text-[9vw] font-extralight tracking-tighter leading-[0.9] mb-10">
                        Cookie Policy
                    </h1>
                    <p className="text-xl md:text-[1.8vw] opacity-60 font-light max-w-4xl italic">
                        Small files, big impact. We use cookies to remember your progress and keep your learning journey seamless.
                    </p>
                </header>

                <div className="py-[10vh] space-y-40 mb-40">
                    <section className="max-w-4xl">
                        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">01. Context</h2>
                        <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                            Cookies are small text files stored on your device that help us optimize your experience. On Curio, we use cookies to ensure the platform functions smoothly as you learn, ensuring your progress is never lost.
                        </p>
                    </section>

                    <section className="w-full p-20 rounded-[50px] border border-[#1A110D]/10 bg-[#1A110D]/5">
                        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16">02. Use Cases</h2>
                        <div className="grid md:grid-cols-2 gap-20">
                            <div>
                                <h3 className="font-bold mb-6 opacity-30 uppercase tracking-[0.3em] text-xs">Essential</h3>
                                <ul className="space-y-6 opacity-70 text-xl font-light leading-relaxed">
                                    <li>Maintaining secure login sessions</li>
                                    <li>Load balancing for peak performance</li>
                                    <li>Cross-page navigation security</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-6 opacity-30 uppercase tracking-[0.3em] text-xs">Functional</h3>
                                <ul className="space-y-6 opacity-70 text-xl font-light leading-relaxed">
                                    <li>Remembering lesson progress & slide state</li>
                                    <li>Video quality & volume preferences</li>
                                    <li>Custom interface layout choices</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl">
                        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">03. User Control</h2>
                        <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
                            Most browsers allow you to control cookies through their settings. However, disabling essential or functional cookies may prevent you from using certain parts of the Curio platform effectively.
                        </p>
                    </section>

                    <section className="pt-20 border-t border-[#1A110D]/10 opacity-30 text-sm font-bold uppercase tracking-widest">
                        Last Updated: February 25, 2026
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
