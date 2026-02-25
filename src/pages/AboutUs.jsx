import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-[#E8DCC8] w-full">
            <div className="w-full px-[5vw]">
                {/* Section 1: Hero - Full Height Centered */}
                <header className="min-h-[80vh] flex flex-col justify-center mb-20">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Our Identity</h2>
                    <h1 className="text-6xl md:text-[9vw] font-['Inter'] font-extralight tracking-tighter text-[#1A110D] mb-10 leading-[0.9]">
                        Our Story
                    </h1>
                    <p className="text-2xl md:text-[2.5vw] text-[#1A110D]/70 font-['Inter'] font-light max-w-[80%] leading-tight">
                        We're redefining education for the digital age. Born from the belief that knowledge should be as addictive as the scroll.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-[10vw] mb-40">
                    {/* Mission */}
                    <div className="space-y-12">
                        <h2 className="text-4xl md:text-5xl font-['Inter'] font-light text-[#1A110D] tracking-tight">
                            Our Mission
                        </h2>
                        <p className="text-xl md:text-2xl text-[#1A110D]/70 font-['Inter'] font-light leading-relaxed">
                            Our mission is to make deep learning as accessible and engaging as social media. We believe that curiosity is the most powerful engine for growth, and our platform is designed to fuel that engine through short, impactful content.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Students', value: '1M+' },
                            { label: 'Countries', value: '100+' },
                            { label: 'Reels', value: '10k+' },
                            { label: 'Experts', value: '500+' },
                        ].map((stat, i) => (
                            <div key={i} className="aspect-square flex flex-col items-center justify-center border border-[#1A110D]/10 rounded-2xl p-4">
                                <span className="block text-5xl md:text-6xl font-['Inter'] font-light text-[#1A110D] mb-2">{stat.value}</span>
                                <span className="block text-xs uppercase tracking-widest text-[#1A110D]/40 font-bold">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Block - Full Width Contrast */}
                <div className="w-full bg-[#1A110D] text-[#E8DCC8] px-[10vw] py-[15vh] mb-20 rounded-[50px] shadow-2xl">
                    <h2 className="text-5xl md:text-[6vw] font-['Inter'] font-light mb-12 tracking-tight leading-none text-center">
                        The Future of <br />Lifelong Learning
                    </h2>
                    <p className="text-xl md:text-2xl text-[#E8DCC8]/60 leading-relaxed font-['Inter'] max-w-3xl mx-auto text-center font-light">
                        Whether you're looking to pick up a new skill in minutes or dive deep into a complex subject, Curio provides the tools and the content to help you succeed at your own pace.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
