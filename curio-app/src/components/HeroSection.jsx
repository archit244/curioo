import { useEffect, useRef, useState, Suspense } from 'react';

const HEADLINES = [
    { text: 'Learning was never mean\'t to feel this good' },
    { text: 'Why do groups make worse decisions than individuals?' },
];

const TOTAL = 2;
const AUTO_TRANSITION_DELAY = 5000;
const BASE_RADIUS = 60;
const FEATHER = 0;
const EASE = 0.15;
const POINTS = 30;
const EXPAND_MS = 1000;

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
        // Start exiting current text immediately as the scene transition begins
        setHeadlineQueue(prev => prev.map(h => ({ ...h, exiting: true, entering: false })));
    }

    function blobPoints(cx, cy, r, t, scaleX = 1, scaleY = 1) {
        const pts = [];
        for (let i = 0; i < POINTS; i++) {
            const a = (i / POINTS) * Math.PI * 2;
            const n =
                0.08 * Math.sin(a * 2.5 + t * 0.5) +
                0.04 * Math.sin(a * 4 - t * 0.8);
            const R = r * (1 + n);
            pts.push({ 
                x: cx + Math.cos(a) * R * scaleX, 
                y: cy + Math.sin(a) * R * scaleY 
            });
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


        function animate(ts) {
            const time = ts / 1000;
            s.mx += (s.tx - s.mx) * EASE;
            s.my += (s.ty - s.my) * EASE;
            const W = window.innerWidth, H = window.innerHeight;

            maskCtx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
            maskCtx.clearRect(0, 0, W, H);

            let currentRadius = BASE_RADIUS;
            let scaleX = 1, scaleY = 1;

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
                    
                    // Add new text entering from top, old text is removed
                    setHeadlineQueue([{ id: Date.now(), idx: s.currentIdx, entering: true, exiting: false }]);
                    
                    s.debounce = false;
                    s.spotlightFade = 0.003;
                    startAutoTimer();
                }
            } else {
                // Dynamic scaling based on mouse distance from center
                const dx = s.mx - W / 2;
                const dy = s.my - H / 2;
                const dist = Math.hypot(dx, dy);
                const maxDist = Math.hypot(W / 2, H / 2);
                const distNormal = dist / maxDist;
                
                // Radius increases as we move to edges - final minimalist multiplier
                currentRadius = BASE_RADIUS * (1 + distNormal * 1.2);
                
                // "Center decreases" - squeeze the shape towards the edge
                // We stretch the shape along the axis of movement - final minimalist stretch
                scaleX = 1 + Math.abs(dx / (W/2)) * 0.2;
                scaleY = 1 + Math.abs(dy / (H/2)) * 0.2;

                if (s.spotlightFade < 1) {
                    s.spotlightFade += 0.03;
                }
            }

            const finalR = currentRadius * (s.isExpanding ? 1 : s.spotlightFade);

            maskCtx.save();
            maskCtx.fillStyle = '#fff';
            // No blur filter for sharp edges
            tracePath(maskCtx, blobPoints(s.mx, s.my, finalR, time, scaleX, scaleY));
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
                <img key="s0" src="/Gemini_Generated_Image_bcm2hybcm2hybcm2.png" alt="Hero Background" className="w-full h-full object-cover block" />,
                <video key="v1" src="/11344965-hd_1920_1080_25fps.mp4" className="w-full h-full object-cover block" muted loop playsInline />,
            ].map((child, i) => (
                <div
                    key={i}
                    ref={el => sceneRefs.current[i] = el}
                    className="absolute inset-0 opacity-100 z-0"
                    style={{ transform: 'translate3d(0,0,0)' }}
                >
                    {child}
                </div>
            ))}

            {/* Peek canvas - ACTIVATED */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 z-10 pointer-events-none"
                style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
            />
            {/* Hidden mask canvas */}
            <canvas ref={maskCanvasRef} className="hidden" />


            {/* Overlay */}
            <div className="absolute inset-0 z-[100] pointer-events-none flex flex-col justify-between items-start pt-[12vh] pb-[70px]">
                {/* Subtle dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/5 -z-10" />
                
                {/* Top / Center area empty, pushed content to bottom half */}
                <div className="flex-1 w-full" />

                {/* Marquee Container area (Bottom third) */}
                <div className="w-full relative overflow-hidden flex flex-col justify-end" style={{ height: '44vh', minHeight: '150px', marginBottom: '0px', marginTop: '10px' }}>
                    <div
                        className="absolute left-0 w-full flex items-center"
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                    >
                        <h1
                            className="marquee-track"
                            style={{ 
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 300,
                                fontSize: 'clamp(5rem, 9.5vw, 12rem)',
                                textTransform: 'none',
                                lineHeight: '1.05',
                                letterSpacing: '-0.03em',
                                color: '#ffffff',
                                whiteSpace: 'nowrap',
                                display: 'inline-block'
                            }}
                        >
                            {"\u2022 Why \u2022 How \u2022 What If \u2022 Imagine ".repeat(6)}
                        </h1>
                    </div>
                </div>

                {/* Elementis-style Footer */}
                <div className="w-full pb-5 pt-2 pointer-events-auto z-[101]" style={{ position: 'relative', bottom: '55px' }}>

    {/* Shared centered container (IMPORTANT) */}
    <div className="w-full px-[2.5vw] flex justify-center">
  <div className="w-full max-w-[1800px]">

    {/* Horizontal Line */}
    <div style={{ height: '1px', background: 'rgba(255,255,255,0.6)', marginBottom: '15px', marginLeft: '80px', marginRight: '80px' }} />

    {/* Footer Layout */}
    <div
      className="flex items-center text-white/80"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        fontSize: '0.9rem',
        letterSpacing: '0.02em',
        marginLeft: '80px',
        marginRight: '80px'
      }}
    >

      {/* Left (Arrow) */}
      <div className="flex-1 flex justify-start items-center">
        <span className="cursor-pointer hover:text-white transition-colors duration-300 text-xl leading-none">
          ↓
        </span>
      </div>

      {/* Center Dynamic Text */}
      <div className="flex-1 relative flex justify-center items-center h-[2em] text-center text-white">
        {headlineQueue.map(h => {
          const content = HEADLINES[h.idx % HEADLINES.length].text;
          return (
            <div
              key={h.id}
              className={`absolute whitespace-nowrap transition-opacity duration-1000 ${
                h.entering ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* Right CTA */}
      <div className="flex-1 flex justify-end whitespace-nowrap">
        Scroll to Explore
      </div>

    </div>
  </div>
</div>
</div>
            </div>
        </main>
    );
}
