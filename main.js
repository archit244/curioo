/**
 * Archit — Organic Blob Spotlight (Safari Optimized)
 *
 * Uses a dual-canvas masking technique for maximum cross-browser compatibility.
 * An offscreen canvas draws the animated blob, which is then used as an
 * alpha mask for the main scene content.
 */

(function () {
    'use strict';

    const hero = document.getElementById('hero');
    const scenes = Array.from(document.querySelectorAll('.scene'));
    const canvas = document.getElementById('peek-canvas');
    const ctx = canvas.getContext('2d');
    const hint = document.getElementById('hint');
    const headlineContainer = document.getElementById('headline-container');

    const HEADLINES = [
        "How do markets work ?",
        "Learning never meant to feel this good.",
        "Let's work on your idea."
    ];

    // ─── Offscreen Mask Canvas (Robust Safari Support) ───
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    const TOTAL = scenes.length;
    let currentIdx = 0;

    // ─── Interaction & Auto-Transition ───
    const AUTO_TRANSITION_DELAY = 5000;
    let autoTimer = null;

    let debounce = false;
    let isExpanding = false;
    let expandStart = 0;
    let spotlightFade = 0;

    // Mouse state
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx, ty = my;

    // Config
    const BASE_RADIUS = 100; // Size
    const FEATHER = 22;      // Blur amount
    const EASE = 1.0;        // Instant follow
    const POINTS = 15;       // Blob control points
    const EXPAND_MS = 1200;   // Expansion duration

    // ─── Auto Timer Logic ───
    function startAutoTimer() {
        stopAutoTimer();
        autoTimer = setTimeout(() => {
            // Trigger transition from current cursor position
            triggerTransition();
        }, AUTO_TRANSITION_DELAY);
    }

    function stopAutoTimer() {
        if (autoTimer) {
            clearTimeout(autoTimer);
            autoTimer = null;
        }
    }

    // ─── Transition Logic ───
    function triggerTransition() {
        if (debounce || isExpanding) return;
        debounce = true;
        isExpanding = true;
        expandStart = performance.now();
        if (hint) hint.style.opacity = '0';
        stopAutoTimer(); // Stop timer during transition
    }

    // ─── Canvas sizing ───
    let dpr = 1;
    function resize() {
        dpr = window.devicePixelRatio || 1;
        const W = window.innerWidth;
        const H = window.innerHeight;

        // Main Canvas
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';

        // Mask Canvas
        maskCanvas.width = W * dpr;
        maskCanvas.height = H * dpr;
    }
    window.addEventListener('resize', resize);
    resize();

    // ─── Preload/Warm up media ───
    scenes.forEach(s => {
        const img = s.querySelector('img');
        if (img && img.decode) img.decode().catch(() => { });
        const vid = s.querySelector('video');
        if (vid) {
            vid.preload = 'auto';
            vid.load();
        }
    });

    function getMedia(idx) {
        return scenes[idx].querySelector('img') || scenes[idx].querySelector('video');
    }

    function drawCover(targetCtx, src, w, h) {
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
        dx = (w - dw) / 2;
        dy = (h - dh) / 2;

        targetCtx.drawImage(src, dx, dy, dw, dh);
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
            pts.push({
                x: cx + Math.cos(a) * R,
                y: cy + Math.sin(a) * R
            });
        }
        return pts;
    }

    function tracePath(targetCtx, pts) {
        const n = pts.length;
        targetCtx.beginPath();
        targetCtx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < n; i++) {
            const p1 = pts[i];
            const p2 = pts[(i + 1) % n];
            const p0 = pts[(i - 1 + n) % n];
            const p3 = pts[(i + 2) % n];
            targetCtx.bezierCurveTo(
                p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6,
                p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6,
                p2.x, p2.y
            );
        }
        targetCtx.closePath();
    }

    function arrangeScenes() {
        const nextIdx = (currentIdx + 1) % TOTAL;
        scenes.forEach((s, i) => {
            const isActive = i === currentIdx;
            const isNext = i === nextIdx;
            s.style.opacity = isActive ? '1' : '0';
            s.style.zIndex = isActive ? '2' : (isNext ? '1' : '0');
            s.style.visibility = (isActive || isNext) ? 'visible' : 'hidden';
        });

        scenes.forEach((s, i) => {
            const v = s.querySelector('video');
            if (!v) return;
            if (i === currentIdx || i === (currentIdx + 1) % TOTAL) {
                v.play().catch(() => { });
            } else {
                v.pause();
            }
        });
    }

    // ─── Text Animation ───
    function updateText(idx) {
        // 1. Exit current text (Instant removal)
        const oldText = headlineContainer.querySelector('.headline:not(.slide-exit)');
        if (oldText) {
            oldText.remove();
        }

        // 2. Enter new text
        const newH1 = document.createElement('h1');
        newH1.className = 'headline slide-enter';
        newH1.innerHTML = HEADLINES[idx % HEADLINES.length];
        headlineContainer.appendChild(newH1);
    }

    document.addEventListener('mousemove', e => {
        tx = e.clientX;
        ty = e.clientY;
        // Reset timer on interaction
        startAutoTimer();
    });

    document.addEventListener('click', () => {
        triggerTransition();
    });

    function animate(ts) {
        const time = ts / 1000;
        mx += (tx - mx) * EASE;
        my += (ty - my) * EASE;

        const W = window.innerWidth;
        const H = window.innerHeight;

        // 1. Prepare Mask (Offscreen)
        maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        maskCtx.clearRect(0, 0, W, H);

        let currentRadius = BASE_RADIUS;
        if (isExpanding) {
            const elapsed = ts - expandStart;
            const p = Math.min(elapsed / EXPAND_MS, 1);
            const ease = 1 - Math.pow(1 - p, 4);
            const maxDim = Math.hypot(W, H);
            currentRadius = BASE_RADIUS + (maxDim - BASE_RADIUS) * ease;
            if (p >= 1) {
                isExpanding = false;
                currentIdx = (currentIdx + 1) % TOTAL;
                arrangeScenes();
                updateText(currentIdx);
                debounce = false;
                spotlightFade = 0.003;
                startAutoTimer(); // Restart timer after transition
            }
        } else if (spotlightFade < 1) {
            spotlightFade += 0.03;
        }

        const finalR = currentRadius * (isExpanding ? 1 : spotlightFade);

        maskCtx.save();
        maskCtx.filter = `blur(${FEATHER}px)`;
        maskCtx.fillStyle = '#fff';
        tracePath(maskCtx, blobPoints(mx, my, finalR, time));
        maskCtx.fill();
        maskCtx.restore();

        // 2. Render Scene content and clip with Mask
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        const nextIdx = (currentIdx + 1) % TOTAL;
        const media = getMedia(nextIdx);

        if (media) {
            // Draw content first
            drawCover(ctx, media, W, H);

            // Clip destination using our masked blob
            ctx.globalCompositeOperation = 'destination-in';
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Drew content with DPR, but mask is already DPR size
            ctx.drawImage(maskCanvas, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
        }

        requestAnimationFrame(animate);
    }

    arrangeScenes();
    startAutoTimer(); // Init timer
    requestAnimationFrame(animate);
})();
