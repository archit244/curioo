#  Premium Interaction

A high-fidelity web experience featuring an organic blob spotlight effect, video backgrounds, and animated typography. This project demonstrates advanced canvas manipulation and performance-optimized media handling.

## Features

### 🎨 Organic Blob Spotlight
-   **Dual-Canvas Masking**: Uses an offscreen canvas to draw the animated blob and composites it as a mask, ensuring robust performance and compatibility (especially on Safari).
-   **Fluid Animation**: Mathematical blob generation with smooth expansion and contraction effects.
-   **Cursor Interaction**: The spotlight effect follows the user's cursor, creating an immersive "flashlight" reveal.

### ⏱️ Smart Auto-Transition
-   **Idle Timer**: Automatically advances to the next slide after **8 seconds** of inactivity.
-   **Organic Origin**: Transitions triggered by the timer originate from the user's last known cursor position, maintaining visual continuity.
-   **Interaction Reset**: Any mouse movement or click instantly resets the timer to prevent interrupting the user.

### ✒️ Responsive Typography
-   **Dynamic Sizing**: Uses `clamp()` for fluid font scaling across different device widths.
-   **Precision Alignment**: Headlines are pinned to a consistent vertical starting level, ensuring multi-line text (like "Learning...") aligns perfectly with single-line text.
-   **Clean Layout**: CSS Grid and Flexbox are used to manage the overlay and content positioning.

## Tech Stack

-   **HTML5**: Semantic structure.
-   **CSS3**: Custom properties, animations, and responsive design.
-   **JavaScript (Vanilla)**: Canvas API `2d` context, `requestAnimationFrame` loop, and event handling.
-   **Assets**: Optimized images and video background.

## Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/Ironankit525/landing_pad.git
    ```
2.  Open `index.html` in any modern web browser.
3.  No build step required (Vanilla JS/CSS).

## Project Structure

-   `index.html`: Main entry point and DOM structure.
-   `styles.css`: Global styles, typography, and layout rules.
-   `main.js`: Core logic for the canvas loop, blob animation, and state management.
-   `assets/`: Contains images and video files.

## Optimization

-   **Preloading**: Critical media is preloaded to minimize entry latency.
-   **Performance**: Logic is optimized to run within a single `requestAnimationFrame` loop.
-   **Clean Code**: The codebase has been stripped of comments for a minified, production-ready footprint.
