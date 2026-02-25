import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            title: "Spark Curiosity",
            desc: "Browse a feed of intriguing concepts. When something grabs you, dive into a short, punchy reel that explains the core idea."
        },
        {
            title: "Interactive Mastery",
            desc: "Follow up each reel with interactive slides. Test your understanding instantly with simple, intuitive challenges."
        },
        {
            title: "Retain & Grow",
            desc: "Your progress is tracked automatically. We suggest reviews based on spatial repetition science to make sure you never forget."
        }
    ];

    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full">
                {/* Full Height Header */}
                <header className="min-h-[85vh] flex flex-col justify-center px-[5vw] border-b border-[#1A110D]/10">
                    <h1 className="text-6xl md:text-[10vw] font-extralight tracking-tighter leading-[0.9] mb-12">
                        How it <br /><span className="italic opacity-30">Works</span>
                    </h1>
                    <p className="text-2xl md:text-[2.5vw] opacity-60 font-light max-w-4xl leading-tight">
                        Learning doesn't have to be a chore. We've broken down the process into three simple, addictive steps.
                    </p>
                </header>

                <div className="divide-y divide-[#1A110D]/10">
                    {steps.map((step, i) => (
                        <div key={i} className="min-h-screen flex flex-col md:flex-row items-center px-[5vw] py-20 gap-20">
                            <div className="flex-1 space-y-12">
                                <span className="text-xl font-bold opacity-20 uppercase tracking-[0.5em]">0{i + 1}</span>
                                <h2 className="text-5xl md:text-[6vw] font-extralight tracking-tighter leading-none">{step.title}</h2>
                                <p className="text-2xl md:text-3xl opacity-70 font-light leading-relaxed max-w-2xl">{step.desc}</p>
                            </div>
                            <div className="flex-1 w-full aspect-video md:aspect-square bg-[#1A110D] rounded-[60px] flex items-center justify-center overflow-hidden shadow-2xl relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                                <span className="text-2xl opacity-40 font-light tracking-[0.3em] uppercase italic text-[#E8DCC8]">Visual Insight</span>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="h-[60vh] flex flex-col items-center justify-center bg-[#1A110D] text-[#E8DCC8] rounded-t-[100px] mt-20">
                    <p className="text-xl opacity-40 mb-12 uppercase tracking-[0.4em] font-bold">Curiosity is calling</p>
                    <button className="px-[8vw] py-8 bg-[#E8DCC8] text-[#1A110D] rounded-full text-2xl font-bold hover:scale-105 transition-transform duration-500 shadow-2xl">
                        Start Your Journey
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default HowItWorks;
