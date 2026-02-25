import React from 'react';

const Contact = () => {
    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full">
                {/* Full Height Header */}
                <header className="min-h-[80vh] flex flex-col justify-center px-[5vw] border-b border-[#1A110D]/10">
                    <h2 className="text-xl font-bold opacity-20 uppercase tracking-[0.5em] mb-8">Connection</h2>
                    <h1 className="text-7xl md:text-[12vw] font-extralight tracking-tighter leading-[0.8] mb-12 italic">
                        Get in Touch
                    </h1>
                    <p className="text-2xl md:text-[3vw] opacity-60 font-light max-w-5xl leading-tight">
                        Whether it's a technical query or just a meeting of minds—reach out.
                    </p>
                </header>

                <div className="flex flex-col md:grid md:grid-cols-2 min-h-screen w-full">
                    {/* Form Section */}
                    <div className="p-[8vw] border-b md:border-b-0 md:border-r border-[#1A110D]/10">
                        <form className="space-y-16">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-[#1A110D]/20 py-8 focus:border-[#1A110D] focus:outline-none transition-all text-3xl font-light placeholder-[#1A110D]/10"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-[#1A110D]/20 py-8 focus:border-[#1A110D] focus:outline-none transition-all text-3xl font-light placeholder-[#1A110D]/10"
                                    placeholder="name@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Your Message</label>
                                <textarea
                                    className="w-full bg-transparent border-b border-[#1A110D]/20 py-8 focus:border-[#1A110D] focus:outline-none transition-all text-3xl font-light placeholder-[#1A110D]/10 h-40 resize-none"
                                    placeholder="Tell us everything..."
                                />
                            </div>
                            <button className="px-[6vw] py-8 bg-[#1A110D] text-[#E8DCC8] rounded-full text-2xl font-bold hover:scale-105 transition-transform duration-500 shadow-2xl">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Information Section */}
                    <div className="p-[8vw] flex flex-col justify-between space-y-20 bg-[#1A110D] text-[#E8DCC8]">
                        <div className="space-y-20">
                            <div>
                                <h3 className="text-sm font-bold opacity-30 uppercase tracking-[0.4em] mb-10">Direct Support</h3>
                                <a href="mailto:hello@curio.com" className="text-4xl md:text-[4vw] font-extralight tracking-tighter hover:opacity-70 transition-opacity">hello@curio.com</a>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold opacity-30 uppercase tracking-[0.4em] mb-10">Social Ecosystem</h3>
                                <div className="flex flex-col gap-8 text-2xl md:text-3xl font-light">
                                    <a href="#" className="hover:italic hover:translate-x-4 transition-all opacity-80">Twitter / X</a>
                                    <a href="#" className="hover:italic hover:translate-x-4 transition-all opacity-80">Instagram</a>
                                    <a href="#" className="hover:italic hover:translate-x-4 transition-all opacity-80">LinkedIn</a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-20 border-t border-white/10 opacity-30 font-light text-xl italic leading-relaxed">
                            "The important thing is not to stop questioning. Curiosity has its own reason for existence."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
