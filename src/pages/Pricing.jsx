import React from 'react';

const Pricing = () => {
    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full">
                {/* Full Height Header */}
                <header className="min-h-[70vh] flex flex-col justify-center items-center text-center px-[5vw]">
                    <h1 className="text-7xl md:text-[11vw] font-extralight tracking-tighter leading-[0.9] mb-12">
                        Simple <span className="opacity-30 italic">Pricing</span>
                    </h1>
                    <p className="text-2xl md:text-3xl opacity-60 font-light max-w-3xl leading-relaxed">
                        Invest in your mind. No hidden fees, just pure intellectual growth.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row w-full min-h-screen">
                    {/* Basic */}
                    <div className="flex-1 flex flex-col justify-center p-[8vw] border-t md:border-t-0 md:border-r border-[#1A110D]/10 space-y-12">
                        <div>
                            <h2 className="text-4xl font-light tracking-tight mb-4">Curio Basic</h2>
                            <p className="opacity-40 text-sm uppercase tracking-widest font-bold">Free Forever</p>
                        </div>
                        <div className="text-8xl md:text-[10vw] font-extralight tracking-tighter">$0</div>
                        <ul className="space-y-6 text-xl font-light opacity-70">
                            <li>✦ Access to 500+ concepts</li>
                            <li>✦ Daily concept feed</li>
                            <li>✦ Community forums</li>
                            <li>✦ Mobile app access</li>
                        </ul>
                        <button className="w-full py-6 border border-[#1A110D]/30 rounded-full text-xl font-bold hover:bg-[#1A110D] hover:text-[#E8DCC8] transition-all duration-500">
                            Get Started
                        </button>
                    </div>

                    {/* Pro */}
                    <div className="flex-1 flex flex-col justify-center p-[8vw] bg-[#1A110D] text-[#E8DCC8] space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 text-[20vw] leading-none select-none">✦</div>
                        <div>
                            <h2 className="text-4xl font-light tracking-tight mb-4">Curio Pro</h2>
                            <p className="opacity-40 text-sm uppercase tracking-widest font-bold">For the Intellectual Elite</p>
                        </div>
                        <div className="text-8xl md:text-[10vw] font-extralight tracking-tighter">$9.99<span className="text-xl opacity-40">/mo</span></div>
                        <ul className="space-y-6 text-xl font-light opacity-70">
                            <li>✦ Unlimited access to all reels</li>
                            <li>✦ Advanced progress analytics</li>
                            <li>✦ Offline learning mode</li>
                            <li>✦ Priority expert support</li>
                            <li>✦ Ad-free deep experience</li>
                        </ul>
                        <button className="w-full py-6 bg-[#E8DCC8] text-[#1A110D] rounded-full text-xl font-bold hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
