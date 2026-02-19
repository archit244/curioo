// Tubes Cursor — Third Page Animation
let appInstance = null;
const apiKey = ""; // Set by environment if needed

const statusEl = document.getElementById('tubes-status');
const aiToggle = document.getElementById('aiToggle');
const aiPanel = document.getElementById('aiPanel');
const closePanel = document.getElementById('closePanel');
const moodInput = document.getElementById('moodInput');
const generateBtn = document.getElementById('generateBtn');
const btnIcon = document.getElementById('btnIcon');
const tubesSection = document.getElementById('tubes-section');

// Random hex colors
const randomColors = (count) =>
    Array.from({ length: count }, () =>
        '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );

// Initialize animation
async function initTubes() {
    try {
        const module = await import(
            'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        const TubesCursor = module.default;
        const canvas = document.getElementById('tubes-canvas');

        appInstance = TubesCursor(canvas, {
            tubes: {
                count: 4,
                colors: ['#5e72e4', '#8965e0', '#f5365c'],
                lights: {
                    intensity: 240,
                    colors: ['#21d4fd', '#b721ff', '#f4d03f', '#11cdef']
                }
            }
        });
    } catch (err) {
        console.error('Tubes initialization failed:', err);
    }
}

// Only init when section scrolls into view
const tubesObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                initTubes();
                tubesObserver.disconnect();
            }
        });
    },
    { threshold: 0.1 }
);
if (tubesSection) tubesObserver.observe(tubesSection);

// Click = random colors
if (tubesSection) {
    tubesSection.addEventListener('click', (e) => {
        if (e.target.closest('#aiPanel') || e.target.closest('#aiToggle')) return;
        if (appInstance) {
            appInstance.tubes.setColors(randomColors(3));
            appInstance.tubes.setLightsColors(randomColors(4));
        }
    });
}

// AI panel toggle
if (aiToggle) aiToggle.addEventListener('click', () => aiPanel.classList.toggle('active'));
if (closePanel) closePanel.addEventListener('click', () => aiPanel.classList.remove('active'));

// Gemini AI mood generator
async function generateMood(mood) {
    if (!mood.trim() || generateBtn.disabled) return;

    generateBtn.disabled = true;
    btnIcon.textContent = '⌛';
    if (statusEl) statusEl.textContent = 'AI is thinking...';

    const systemPrompt = `You are a professional lighting designer. 
    Provide 3 hex codes for 'tubes' and 4 hex codes for 'lights' matching the mood.
    Format: { "tubeColors": ["#hex1", "#hex2", "#hex3"], "lightColors": ["#hex1", "#hex2", "#hex3", "#hex4"] }`;

    const fetchPalette = async (retries = 0) => {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `Vibe: ${mood}` }] }],
                        systemInstruction: { parts: [{ text: systemPrompt }] },
                        generationConfig: { responseMimeType: 'application/json' }
                    })
                }
            );
            if (!response.ok) throw new Error('API fail');
            const data = await response.json();
            return JSON.parse(data.candidates[0].content.parts[0].text);
        } catch (err) {
            if (retries < 5) {
                await new Promise((r) => setTimeout(r, Math.pow(2, retries) * 1000));
                return fetchPalette(retries + 1);
            }
            throw err;
        }
    };

    try {
        const palette = await fetchPalette();
        if (appInstance) {
            appInstance.tubes.setColors(palette.tubeColors);
            appInstance.tubes.setLightsColors(palette.lightColors);
            if (statusEl) statusEl.textContent = `Vibe set: ${mood}`;
            moodInput.value = '';
            setTimeout(() => {
                if (statusEl) statusEl.textContent = 'Click background for random colors';
            }, 3000);
        }
    } catch (err) {
        if (statusEl) statusEl.textContent = 'AI error. Try again!';
    } finally {
        generateBtn.disabled = false;
        btnIcon.textContent = '➔';
    }
}

if (generateBtn) generateBtn.addEventListener('click', () => generateMood(moodInput.value));
if (moodInput) moodInput.addEventListener('keydown', (e) => e.key === 'Enter' && generateMood(moodInput.value));

// Tag quick-select
document.querySelectorAll('.tubes-tag').forEach((btn) => {
    btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        moodInput.value = tag;
        generateMood(tag);
    });
});
