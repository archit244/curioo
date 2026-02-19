// Testimonials — Wall of Love Carousel
(function () {
    const testimonials = [
        { id: 1, text: "My favorite solution in the market. We work 5x faster with Curio.", by: "Alex", role: "CEO at TechCorp", img: "https://i.pravatar.cc/150?img=11" },
        { id: 2, text: "I'm confident my data is safe with Curio. I can't say that about other providers.", by: "Dan", role: "CTO at SecureNet", img: "https://i.pravatar.cc/150?img=12" },
        { id: 3, text: "I know it's cliche, but we were lost before we found Curio. Can't thank you guys enough!", by: "Stephanie", role: "COO at InnovateCo", img: "https://i.pravatar.cc/150?img=13" },
        { id: 4, text: "Curio's products make planning for the future seamless. Can't recommend them enough!", by: "Marie", role: "CFO at FuturePlanning", img: "https://i.pravatar.cc/150?img=14" },
        { id: 5, text: "If I could give 11 stars, I'd give 12.", by: "Andre", role: "Head of Design", img: "https://i.pravatar.cc/150?img=15" },
        { id: 6, text: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.", by: "Jeremy", role: "Product Lead", img: "https://i.pravatar.cc/150?img=16" },
        { id: 7, text: "Took some convincing, but now that we're on Curio, we're never going back.", by: "Pam", role: "Brand Director", img: "https://i.pravatar.cc/150?img=17" },
        { id: 8, text: "I would be lost without Curio's in-depth analytics. The ROI is EASILY 100X.", by: "Daniel", role: "Data Scientist", img: "https://i.pravatar.cc/150?img=18" },
        { id: 9, text: "It's just the best. Period. No other tool comes close to this efficiency.", by: "Fernando", role: "Lead UX", img: "https://i.pravatar.cc/150?img=19" },
        { id: 10, text: "I switched 5 years ago and never looked back. Best decision for our team.", by: "Andy", role: "DevOps Lead", img: "https://i.pravatar.cc/150?img=20" }
    ];

    let centerIndex = 0;
    let cardSize = window.innerWidth < 640 ? 280 : 380;
    const wrapper = document.getElementById('testimonials-cards');
    if (!wrapper) return;

    const cardEls = [];
    let moveTimeout;

    function init() {
        wrapper.innerHTML = '';
        testimonials.forEach((t, i) => {
            const card = document.createElement('div');
            card.className = 'tm-card';
            card.innerHTML = `
                <span class="tm-corner-line"></span>
                <div class="tm-card-inner">
                    <div class="tm-card-top">
                        <img src="${t.img}" alt="${t.by}" class="tm-avatar" />
                        <svg class="tm-quote" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        </svg>
                    </div>
                    <h3 class="tm-text">"${t.text}"</h3>
                    <div class="tm-footer">
                        <p class="tm-name">${t.by}</p>
                        <p class="tm-role">${t.role}</p>
                    </div>
                </div>
            `;
            card.onclick = () => {
                const diff = shortestPath(i);
                move(diff);
            };
            wrapper.appendChild(card);
            cardEls.push(card);
        });
        updateUI();
    }

    function shortestPath(target) {
        let diff = target - centerIndex;
        const half = testimonials.length / 2;
        if (diff > half) diff -= testimonials.length;
        if (diff < -half) diff += testimonials.length;
        return diff;
    }

    function updateUI() {
        const count = testimonials.length;
        wrapper.classList.add('tm-moving');

        cardEls.forEach((card, i) => {
            let rel = i - centerIndex;
            if (rel > count / 2) rel -= count;
            if (rel < -count / 2) rel += count;

            const isCenter = rel === 0;
            const isHidden = Math.abs(rel) > 2;

            // Classes
            card.className = 'tm-card' +
                (isCenter ? ' tm-center' : ' tm-side') +
                (isHidden ? ' tm-hidden' : '');

            // Transform
            const tx = (cardSize / 1.4) * rel;
            const ty = isCenter ? -40 : (rel % 2 === 0 ? 20 : -20);
            const rot = isCenter ? 0 : rel * 5;
            const sc = isCenter ? 1 : 0.82;

            card.style.zIndex = 50 - Math.abs(rel) * 10;
            card.style.width = cardSize + 'px';
            card.style.height = cardSize + 'px';
            card.style.transform = `translate(-50%, -50%) translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${sc})`;
        });

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => wrapper.classList.remove('tm-moving'), 800);
    }

    function move(steps) {
        if (steps === 0) return;
        centerIndex = (centerIndex + steps + testimonials.length) % testimonials.length;
        updateUI();
    }

    document.getElementById('testimonial-prev')?.addEventListener('click', () => move(-1));
    document.getElementById('testimonial-next')?.addEventListener('click', () => move(1));

    window.addEventListener('resize', () => {
        cardSize = window.innerWidth < 640 ? 280 : 380;
        updateUI();
    });

    init();
})();
