import { useEffect, useRef, useState } from 'react';

const HEADLINES = [
    { html: '<span>Learning was never meant</span><span>to feel this good.</span>', small: true },
    { html: '<span>Learning that</span><span>is fun</span>', small: false },
    { html: '<span>how does</span><span>markets work</span>', small: false },
];

const TOTAL = 3;
const AUTO_TRANSITION_DELAY = 5000;
const BASE_RADIUS = 100;
const FEATHER = 22;
const EASE = 1.0;
const POINTS = 15;
const EXPAND_MS = 1200;

export default function HeroSection() {
    const canvasRef = useRef(null);
    const maskCanvasRef = useRef(null);
    const sceneRefs = useRef([]);
    const headlineContainerRef = useRef(null);

    const stateRef = useRef({
        currentIdx: 0,
        debounce: false,
        isExpanding: false,
        expandStart: 0,
        spotlightFade: 0,
        mx: window.innerWidth / 2,
        my: window.innerHeight / 2,
        tx: window.innerWidth / 2,
        ty: window.innerHeight / 2,
        dpr: 1,
        autoTimer: null,
        animFrameId: null,
    });

    const [headlineQueue, setHeadlineQueue] = useState([
        { id: 0, idx: 0, entering: true, exiting: false },
    ]);

    function startAutoTimer() {
        const s = stateRef.current;
        if (s.autoTimer) clearTimeout(s.autoTimer);
        s.autoTimer = setTimeout(() => triggerTransition(), AUTO_TRANSITION_DELAY);
    }

    function stopAutoTimer() {
        const s = stateRef.current;
        if (s.autoTimer) { clearTimeout(s.autoTimer); s.autoTimer = null; }
    }

    function triggerTransition() {
        const s = stateRef.current;
        if (s.debounce || s.isExpanding) return;
        s.debounce = true;
        s.isExpanding = true;
        s.expandStart = performance.now();
        stopAutoTimer();
    }

    function blobPoints(cx, cy, r, t) {
        const pts = [];
        for (let i = 0; i < POINTS; i++) {
            const a = (i / POINTS) * Math.PI * 2;
            const n =
                0.18 * Math.sin(a * 2 + t * 0.7) +
                0.12 * Math.sin(a * 3 - t * 1.1) +
                0.07 * Math.sin(a * 5 + t * 0.5) +
                0.04 * Math.cos(a * 7 - t * 0.8);
            const R = r * (1 + n);
            pts.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
        }
        return pts;
    }

    function tracePath(ctx, pts) {
        const n = pts.length;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < n; i++) {
            const p1 = pts[i], p2 = pts[(i + 1) % n];
            const p0 = pts[(i - 1 + n) % n], p3 = pts[(i + 2) % n];
            ctx.bezierCurveTo(
                p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6,
                p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6,
                p2.x, p2.y
            );
        }
        ctx.closePath();
    }

    function drawCover(ctx, src, w, h) {
        if (!src) return;
        const isVideo = src.tagName === 'VIDEO';
        if (isVideo && src.readyState < 2) return;
        if (!isVideo && (!src.complete || src.naturalWidth === 0)) return;
        const sw = src.naturalWidth || src.videoWidth || w;
        const sh = src.naturalHeight || src.videoHeight || h;
        if (!sw || !sh) return;
        const sa = sw / sh, ca = w / h;
        let dw, dh, dx, dy;
        if (ca > sa) { dw = w; dh = w / sa; }
        else { dh = h; dw = h * sa; }
        dx = (w - dw) / 2; dy = (h - dh) / 2;
        ctx.drawImage(src, dx, dy, dw, dh);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const maskCanvas = maskCanvasRef.current;
        if (!canvas || !maskCanvas) return;

        const ctx = canvas.getContext('2d');
        const maskCtx = maskCanvas.getContext('2d');
        const s = stateRef.current;

        function resize() {
            s.dpr = window.devicePixelRatio || 1;
            const W = window.innerWidth, H = window.innerHeight;
            canvas.width = W * s.dpr; canvas.height = H * s.dpr;
            canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
            maskCanvas.width = W * s.dpr; maskCanvas.height = H * s.dpr;
        }
        window.addEventListener('resize', resize);
        resize();

        function getMedia(idx) {
            const scene = sceneRefs.current[idx];
            if (!scene) return null;
            return scene.querySelector('img') || scene.querySelector('video');
        }

        function arrangeScenes() {
            const nextIdx = (s.currentIdx + 1) % TOTAL;
            sceneRefs.current.forEach((sc, i) => {
                if (!sc) return;
                const isActive = i === s.currentIdx;
                const isNext = i === nextIdx;
                sc.style.opacity = isActive ? '1' : '0';
                sc.style.zIndex = isActive ? '2' : (isNext ? '1' : '0');
                sc.style.visibility = (isActive || isNext) ? 'visible' : 'hidden';
                const v = sc.querySelector('video');
                if (v) {
                    if (isActive || isNext) v.play().catch(() => { });
                    else v.pause();
                }
            });
        }

        function advanceHeadline(nextIdx) {
            setHeadlineQueue(prev => {
                const exited = prev.map(h => ({ ...h, exiting: true, entering: false }));
                return [...exited, { id: Date.now(), idx: nextIdx, entering: true, exiting: false }];
            });
            setTimeout(() => {
                setHeadlineQueue(prev => prev.filter(h => !h.exiting));
            }, 1000);
        }

        function animate(ts) {
            const time = ts / 1000;
            s.mx += (s.tx - s.mx) * EASE;
            s.my += (s.ty - s.my) * EASE;
            const W = window.innerWidth, H = window.innerHeight;

            maskCtx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
            maskCtx.clearRect(0, 0, W, H);

            let currentRadius = BASE_RADIUS;
            if (s.isExpanding) {
                const elapsed = ts - s.expandStart;
                const p = Math.min(elapsed / EXPAND_MS, 1);
                const ease = 1 - Math.pow(1 - p, 4);
                const maxDim = Math.hypot(W, H);
                currentRadius = BASE_RADIUS + (maxDim - BASE_RADIUS) * ease;
                if (p >= 1) {
                    s.isExpanding = false;
                    s.currentIdx = (s.currentIdx + 1) % TOTAL;
                    arrangeScenes();
                    advanceHeadline(s.currentIdx);
                    s.debounce = false;
                    s.spotlightFade = 0.003;
                    startAutoTimer();
                }
            } else if (s.spotlightFade < 1) {
                s.spotlightFade += 0.03;
            }

            const finalR = currentRadius * (s.isExpanding ? 1 : s.spotlightFade);

            maskCtx.save();
            maskCtx.filter = `blur(${FEATHER}px)`;
            maskCtx.fillStyle = '#fff';
            tracePath(maskCtx, blobPoints(s.mx, s.my, finalR, time));
            maskCtx.fill();
            maskCtx.restore();

            ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);

            const nextIdx = (s.currentIdx + 1) % TOTAL;
            const media = getMedia(nextIdx);
            if (media) {
                drawCover(ctx, media, W, H);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(maskCanvas, 0, 0);
                ctx.globalCompositeOperation = 'source-over';
            }

            s.animFrameId = requestAnimationFrame(animate);
        }

        // preload
        sceneRefs.current.forEach(sc => {
            if (!sc) return;
            const img = sc.querySelector('img');
            if (img && img.decode) img.decode().catch(() => { });
            const vid = sc.querySelector('video');
            if (vid) { vid.preload = 'auto'; vid.load(); }
        });

        arrangeScenes();
        startAutoTimer();
        s.animFrameId = requestAnimationFrame(animate);

        const onMouseMove = (e) => { s.tx = e.clientX; s.ty = e.clientY; startAutoTimer(); };
        const onClick = () => triggerTransition();

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('click', onClick);
            stopAutoTimer();
            if (s.animFrameId) cancelAnimationFrame(s.animFrameId);
        };
    }, []);

    return (
        <main
            id="hero"
            className="relative w-screen h-screen overflow-hidden cursor-default"
        >
            {/* Scenes */}
            {[
                <img key="s0" src="/scene1.png" alt="Scene 1" className="w-full h-full object-cover block" />,
                <img key="s1" src="/scene2.png" alt="Scene 2" className="w-full h-full object-cover block" />,
                <video key="s2" src="/minecraft-hero.mp4" muted loop playsInline preload="auto" className="w-full h-full object-cover block" />,
            ].map((child, i) => (
                <div
                    key={i}
                    ref={el => sceneRefs.current[i] = el}
                    className="absolute inset-0 opacity-0 z-0"
                    style={{ willChange: 'opacity, transform', transform: 'translate3d(0,0,0)' }}
                >
                    {child}
                </div>
            ))}

            {/* Peek canvas */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 z-10 pointer-events-none"
                style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
            />
            {/* Hidden mask canvas */}
            <canvas ref={maskCanvasRef} className="hidden" />

            {/* Overlay */}
            <div className="absolute inset-0 z-[100] pointer-events-none flex flex-col justify-end p-[4%_5%]">
                <div className="w-full">
                    <div
                        ref={headlineContainerRef}
                        className="flex flex-col w-full relative overflow-visible"
                        style={{ minHeight: '40vh', justifyContent: 'space-between' }}
                    >
                        {headlineQueue.map(h => (
                            <h1
                                key={h.id}
                                className={`headline${HEADLINES[h.idx % HEADLINES.length].small ? ' small-font' : ''}${h.entering ? ' slide-enter' : ''}${h.exiting ? ' slide-exit' : ''}`}
                                dangerouslySetInnerHTML={{ __html: HEADLINES[h.idx % HEADLINES.length].html }}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-16 left-16 w-20 h-20 opacity-80">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </main>
    );
}
