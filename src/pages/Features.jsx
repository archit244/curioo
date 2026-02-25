import React from 'react';

const Features = () => {
    const features = [
        { title: "Concept Reels", desc: "Short, high-quality videos that get straight to the point of any complex topic." },
        { title: "Smart Feedback", desc: "Interactive slides that adapt to your understanding in real-time." },
        { title: "Progress Dashboard", desc: "Visualize your growth across domains like physics, history, and psychology." },
        { title: "Expert Curated", desc: "Content created and vetted by domain experts to ensure accuracy and depth." },
        { title: "Domain Discovery", desc: "Cross-disciplinary links that show you how ideas in one field relate to another." },
        { title: "Mobile Optimized", desc: "Learn on the go with an interface designed specifically for your phone." }
    ];

    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full">
                {/* Full Height Header */}
                <header className="min-h-[70vh] flex flex-col justify-center px-[5vw]">
                    <h1 className="text-7xl md:text-[12vw] font-extralight tracking-tighter leading-[0.85] mb-12">
                        Features
                    </h1>
                    <p className="text-2xl md:text-[3vw] opacity-60 font-light max-w-5xl leading-tight">
                        Tools built to respect your time and amplify your intelligence. Not just learning, but evolving.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A110D]/10 w-full mt-20">
                    {features.map((feature, i) => (
                        <div key={i} className="bg-[#E8DCC8] p-24 aspect-square flex flex-col justify-between group hover:bg-[#1A110D] hover:text-[#E8DCC8] transition-all duration-700">
                            <div className="w-16 h-16 rounded-2xl bg-[#1A110D]/5 flex items-center justify-center text-2xl group-hover:bg-white/10 transition-colors">
                                ✦
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-light tracking-tight group-hover:italic transition-all">{feature.title}</h2>
                                <p className="text-lg opacity-70 font-light leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-[40vh] bg-[#E8DCC8] w-full flex items-center justify-center">
                    <div className="w-full h-px bg-[#1A110D]/10" />
                </div>
            </div>
        </div>
    );
};

export default Features;
