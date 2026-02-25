import React from 'react';

const Blog = () => {
    const posts = [
        { title: "The Science of Micro-Learning", date: "Feb 20, 2026", cat: "Education" },
        { title: "Engagement vs. Entertainment", date: "Feb 15, 2026", cat: "Product" },
        { title: "Designing the Perfect Reel", date: "Feb 10, 2026", cat: "Design" },
        { title: "How Curiosity Drives Retention", date: "Feb 05, 2026", cat: "Psychology" },
    ];

    return (
        <div className="bg-[#E8DCC8] w-full min-h-screen text-[#1A110D] font-['Inter']">
            <div className="w-full">
                {/* Full Height Header */}
                <header className="min-h-[85vh] flex flex-col justify-center px-[5vw] border-b border-[#1A110D]/10">
                    <h1 className="text-7xl md:text-[13vw] font-extralight tracking-tighter leading-[0.8] mb-12 italic">
                        The Journal
                    </h1>
                    <p className="text-2xl md:text-[3vw] opacity-60 font-light max-w-5xl leading-tight">
                        Explorations into the future of learning, attention, and the curiosities that define us.
                    </p>
                </header>

                <div className="w-full">
                    {posts.map((post, idx) => (
                        <div key={idx} className="group cursor-pointer border-b border-[#1A110D]/10 py-[10vh] px-[5vw] flex flex-col md:grid md:grid-cols-12 gap-12 items-center hover:bg-[#1A110D] hover:text-[#E8DCC8] transition-all duration-700">
                            <div className="md:col-span-2">
                                <span className="text-sm font-bold opacity-30 uppercase tracking-[0.4em] group-hover:opacity-60 transition-opacity">{post.cat}</span>
                            </div>
                            <div className="md:col-span-8">
                                <h2 className="text-4xl md:text-[5.5vw] font-extralight tracking-tighter leading-none group-hover:italic transition-all duration-700">
                                    {post.title}
                                </h2>
                                <p className="mt-8 text-xl opacity-40 font-light group-hover:opacity-60 transition-opacity">{post.date} • 5 min read</p>
                            </div>
                            <div className="md:col-span-2 flex md:justify-end">
                                <div className="w-20 h-20 rounded-full border border-[#1A110D]/20 flex items-center justify-center group-hover:bg-[#E8DCC8] group-hover:text-[#1A110D] group-hover:border-transparent transition-all duration-700">
                                    <span className="text-3xl">→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-[40vh] flex items-center justify-center px-[5vw]">
                    <p className="text-xl opacity-30 font-light italic">End of the journal. Stay curious.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
