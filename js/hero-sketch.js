// P5.js Hero Background Sketch
// Animated waves with brand colors — performance optimized

let heroSketch = function(p) {
  // Brand colors (initialized once in setup)
  let royalBlue, lilac, skyBlue, mintGreen, oliveGreen, mustardYellow, ivory;

  // Pre-cached color objects for draw loops (avoid per-frame allocation)
  let cFill1, cFill2, cFill3;
  let cStroke1, cStroke2, cStroke3;
  let cWave1, cWave2, cWave3, cWave4;

  // Offscreen gradient buffer (redrawn only when needed)
  let gradientBuffer = null;
  let lastGradientFrame = -999;

  function isPortrait() {
    return p.width < p.height;
  }

  p.setup = function() {
    let container = document.getElementById('hero-canvas-container');
    let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('hero-canvas-container');
    p.noStroke();

    // 30fps is plenty for these slow breathing animations
    p.frameRate(30);

    // Initialize colors once
    royalBlue = p.color('#362983');
    lilac = p.color('#E7E2E8');
    skyBlue = p.color('#CFDFE8');
    mintGreen = p.color('#CEDDC7');
    oliveGreen = p.color('#3FA162');
    mustardYellow = p.color('#EFB142');
    ivory = p.color('#F6F1E8');

    // Pre-create reusable color objects for desktop
    cFill1 = p.color('#EFB142');
    cFill2 = p.color('#CFDFE8');
    cFill3 = p.color('#3FA162');
    cStroke1 = p.color('#F6F1E8');
    cStroke2 = p.color('#E7E2E8');
    cStroke3 = p.color('#CEDDC7');

    // Pre-create reusable color objects for mobile waves
    cWave1 = p.color('#E7E2E8');
    cWave2 = p.color('#CFDFE8');
    cWave3 = p.color('#CEDDC7');
    cWave4 = p.color('#EFB142');

    // Build initial gradient buffer
    buildGradientBuffer(0.5);
  };

  function buildGradientBuffer(breatheVal) {
    if (!gradientBuffer || gradientBuffer.width !== p.width || gradientBuffer.height !== p.height) {
      gradientBuffer = p.createGraphics(p.width, p.height);
    }

    let purple1 = p.color('#362983');
    let purple2 = p.color('#2a1f66');
    let purple3 = p.color('#6a5acb');

    let c1 = p.lerpColor(purple1, purple3, breatheVal * 0.3);
    let c2 = p.lerpColor(purple2, purple1, breatheVal * 0.4);

    // Draw every 2nd pixel row (imperceptible difference, half the work)
    for (let y = 0; y < p.height; y += 2) {
      let inter = p.map(y, 0, p.height, 0, 1);
      let c = p.lerpColor(c1, c2, p.pow(inter, 0.6));
      gradientBuffer.stroke(c);
      gradientBuffer.line(0, y, p.width, y);
      gradientBuffer.line(0, y + 1, p.width, y + 1);
    }
  }

  // --- MOBILE / PORTRAIT DRAW ---
  function drawMobile() {
    // Solid purple background
    p.background('#362983');

    // Subtle bottom waves — confined to bottom ~22% of viewport
    let waveZoneStart = p.height * 0.78;
    let waveZoneHeight = p.height - waveZoneStart;

    let t = p.frameCount * 0.008;
    p.noStroke();

    // Wave 1: lilac tint
    cWave1.setAlpha(18);
    p.fill(cWave1);
    p.beginShape();
    for (let x = 0; x <= p.width; x += 6) {
      let wave = p.sin(x * 0.008 + t) * 18
               + p.sin(x * 0.004 + t * 0.7) * 12;
      p.vertex(x, waveZoneStart + waveZoneHeight * 0.15 + wave);
    }
    p.vertex(p.width, p.height);
    p.vertex(0, p.height);
    p.endShape(p.CLOSE);

    // Wave 2: sky blue tint
    cWave2.setAlpha(22);
    p.fill(cWave2);
    p.beginShape();
    for (let x = 0; x <= p.width; x += 6) {
      let wave = p.sin(x * 0.01 + t * 1.2 + 1.5) * 14
               + p.sin(x * 0.005 + t * 0.5 + 0.8) * 10;
      p.vertex(x, waveZoneStart + waveZoneHeight * 0.35 + wave);
    }
    p.vertex(p.width, p.height);
    p.vertex(0, p.height);
    p.endShape(p.CLOSE);

    // Wave 3: mint green tint
    cWave3.setAlpha(16);
    p.fill(cWave3);
    p.beginShape();
    for (let x = 0; x <= p.width; x += 6) {
      let wave = p.sin(x * 0.012 + t * 0.9 + 3.0) * 10
               + p.sin(x * 0.006 + t * 0.6 + 2.0) * 8;
      p.vertex(x, waveZoneStart + waveZoneHeight * 0.55 + wave);
    }
    p.vertex(p.width, p.height);
    p.vertex(0, p.height);
    p.endShape(p.CLOSE);

    // Wave 4: mustard tint
    cWave4.setAlpha(12);
    p.fill(cWave4);
    p.beginShape();
    for (let x = 0; x <= p.width; x += 6) {
      let wave = p.sin(x * 0.014 + t * 1.1 + 4.5) * 8
               + p.sin(x * 0.007 + t * 0.4 + 3.5) * 6;
      p.vertex(x, waveZoneStart + waveZoneHeight * 0.72 + wave);
    }
    p.vertex(p.width, p.height);
    p.vertex(0, p.height);
    p.endShape(p.CLOSE);
  }

  // --- DESKTOP / LANDSCAPE DRAW ---
  function drawDesktop() {
    let gradientBreathe = p.sin(p.frameCount * 0.015) * 0.5 + 0.5;

    // Rebuild gradient buffer every ~15 frames (0.5s at 30fps) — breathing is very slow
    if (p.frameCount - lastGradientFrame > 15) {
      buildGradientBuffer(gradientBreathe);
      lastGradientFrame = p.frameCount;
    }

    // Draw cached gradient
    p.image(gradientBuffer, 0, 0);
    p.noStroke();

    // --- BREATHING VALUES ---
    let breathe = p.sin(p.frameCount * 0.02) * 0.5 + 0.5;
    let breathe2 = p.sin(p.frameCount * 0.03 + 1) * 0.5 + 0.5;
    let breathe3 = p.sin(p.frameCount * 0.025 + 2) * 0.5 + 0.5;

    let band1Width = 150 + breathe * 30;
    let band2Width = 200 + breathe2 * 40;
    let band3Width = 150 + breathe3 * 25;

    // --- LEFT SIDE WAVES ---

    // LEFT WAVE 3: Olive Green
    cFill3.setAlpha(100 + breathe3 * 30);
    p.fill(cFill3);
    p.beginShape();
    p.vertex(0, 0);
    for (let y = 0; y <= p.height; y += 10) {
      p.vertex(400 + p.sin(y * 0.006 + p.frameCount * 0.025) * 60, y);
    }
    p.vertex(0, p.height);
    p.vertex(0, 0);
    p.endShape();

    // LEFT WAVE 2: Sky Blue
    cFill2.setAlpha(50 + breathe2 * 50);
    p.fill(cFill2);
    p.beginShape();
    p.vertex(0, 0);
    for (let y = 0; y <= p.height; y += 10) {
      p.vertex(280 + p.sin(y * 0.012 + p.frameCount * 0.015) * 80, y);
    }
    p.vertex(0, p.height);
    p.vertex(0, 0);
    p.endShape();

    // LEFT WAVE 1: Mustard Yellow
    cFill1.setAlpha(100 + breathe * 55);
    p.fill(cFill1);
    p.beginShape();
    p.vertex(0, 0);
    for (let y = 0; y <= p.height; y += 10) {
      p.vertex(150 + p.sin(y * 0.008 + p.frameCount * 0.02) * 70, y);
    }
    p.vertex(0, p.height);
    p.vertex(0, 0);
    p.endShape();

    // --- RIGHT SIDE WAVES ---

    // RIGHT WAVE 3: Olive Green
    cFill3.setAlpha(100 + breathe3 * 30);
    p.fill(cFill3);
    p.beginShape();
    p.vertex(p.width, 0);
    for (let y = 0; y <= p.height; y += 10) {
      p.vertex(p.width - 400 - p.sin(y * 0.006 + p.frameCount * 0.025) * 60, y);
    }
    p.vertex(p.width, p.height);
    p.vertex(p.width, 0);
    p.endShape();

    // RIGHT WAVE 2: Sky Blue
    cFill2.setAlpha(50 + breathe2 * 20);
    p.fill(cFill2);
    p.beginShape();
    p.vertex(p.width, 0);
    for (let y = 0; y <= p.height; y += 10) {
      p.vertex(p.width - 280 - p.sin(y * 0.012 + p.frameCount * 0.015) * 80, y);
    }
    p.vertex(p.width, p.height);
    p.vertex(p.width, 0);
    p.endShape();

    // RIGHT WAVE 1: Mustard Yellow
    cFill1.setAlpha(100 + breathe * 20);
    p.fill(cFill1);
    p.beginShape();
    p.vertex(p.width, 0);
    for (let y = 0; y <= p.height; y += 10) {
      p.vertex(p.width - 150 - p.sin(y * 0.008 + p.frameCount * 0.02) * 70, y);
    }
    p.vertex(p.width, p.height);
    p.vertex(p.width, 0);
    p.endShape();

    // --- TEXTURE LINES ---
    let lineSpacing = 4 + breathe * 2;

    for (let y = 0; y < p.height; y += lineSpacing) {
      let fc02 = p.frameCount * 0.02;
      let fc015 = p.frameCount * 0.015;
      let fc025 = p.frameCount * 0.025;

      let x1L = 150 + p.sin(y * 0.008 + fc02) * 70;
      let x2L = 280 + p.sin(y * 0.012 + fc015) * 80;
      let x3L = 400 + p.sin(y * 0.006 + fc025) * 60;

      let x1R = p.width - 150 - p.sin(y * 0.008 + fc02) * 70;
      let x2R = p.width - 280 - p.sin(y * 0.012 + fc015) * 80;
      let x3R = p.width - 400 - p.sin(y * 0.006 + fc025) * 60;

      // Left wave lines
      cStroke1.setAlpha(150 + breathe * 100);
      p.stroke(cStroke1);
      p.strokeWeight(1 + breathe * 0.5);
      p.line(x1L, y, x1L - band1Width, y);

      cStroke2.setAlpha(200 + breathe2 * 55);
      p.stroke(cStroke2);
      p.strokeWeight(1 + breathe2 * 0.5);
      p.line(x2L, y, x2L - band2Width, y);

      cStroke3.setAlpha(150 + breathe3 * 100);
      p.stroke(cStroke3);
      p.strokeWeight(1 + breathe3 * 0.5);
      p.line(x3L, y, x3L - band3Width, y);

      // Right wave lines
      cStroke1.setAlpha(150 + breathe * 100);
      p.stroke(cStroke1);
      p.strokeWeight(1 + breathe * 0.5);
      p.line(x1R, y, x1R + band1Width, y);

      cStroke2.setAlpha(200 + breathe2 * 55);
      p.stroke(cStroke2);
      p.strokeWeight(1 + breathe2 * 0.5);
      p.line(x2R, y, x2R + band2Width, y);

      cStroke3.setAlpha(150 + breathe3 * 100);
      p.stroke(cStroke3);
      p.strokeWeight(1 + breathe3 * 0.5);
      p.line(x3R, y, x3R + band3Width, y);
    }
  }

  p.draw = function() {
    if (isPortrait()) {
      drawMobile();
    } else {
      drawDesktop();
    }
  };

  p.windowResized = function() {
    let container = document.getElementById('hero-canvas-container');
    if (container) {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
      // Force gradient rebuild on resize
      lastGradientFrame = -999;
      gradientBuffer = null;
    }
  };
};

// Initialize the sketch when the main content is visible
function initHeroSketch() {
  new p5(heroSketch);
}

// Check if P5 should start (after password gate)
document.addEventListener('DOMContentLoaded', function() {
  // Watch for main content becoming visible
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.id === 'main-content' && !mutation.target.classList.contains('hidden')) {
        initHeroSketch();
        observer.disconnect();
      }
    });
  });

  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    if (!mainContent.classList.contains('hidden')) {
      // Already visible
      initHeroSketch();
    } else {
      // Watch for visibility change
      observer.observe(mainContent, { attributes: true, attributeFilter: ['class'] });
    }
  }
});
