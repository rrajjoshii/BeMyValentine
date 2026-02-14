// app.js — evasive NO button, GIF swap, preloading, accessibility toggle, confetti
(function(){
  const yes = document.getElementById('yes-btn');
  const no = document.getElementById('no-btn');
  const mainGif = document.getElementById('main-gif');
  const disableEvasion = document.getElementById('disable-evasion');
  const card = document.getElementById('card');

  // Asset filenames (change these if you prefer different names)
  const ASSETS = {
    begging: 'assets/mandalorian.gif',
    celebrate: 'assets/celebrate.svg'
  };
  // expose assets to the global scope so other modules/scopes can reference them
  window.ASSETS = ASSETS;

  // Preload images (if they exist)
  function preload(src){
    const img = new Image();
    img.src = src;
    return img;
  }
  const preloaded = {};
  [ASSETS.begging, ASSETS.celebrate].forEach(s => preloaded[s] = preload(s));

  // If the begging gif exists, use it; otherwise keep current src
  preloaded[ASSETS.begging].onload = () => { mainGif.src = ASSETS.begging; };

  // Confetti helper (canvas-confetti included via CDN in HTML)
  function celebrate(){ if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } }); }

  yes.addEventListener('click', () => {
    // Replace the mandalorian placeholder (if present) with the celebration image
    const currentImg = document.getElementById('main-gif');
    try {
      const src = currentImg && currentImg.getAttribute('src');
      const isMando = src && src.indexOf('mandalorian.gif') !== -1;
      const parent = currentImg && currentImg.parentNode;
      if (isMando && parent) {
    const newImg = document.createElement('img');
    newImg.id = 'main-gif';
    newImg.className = 'main-gif';
    newImg.src = ASSETS.celebrate;
    newImg.alt = 'Celebration image';
        parent.replaceChild(newImg, currentImg);
      } else if (currentImg) {
        // fallback: set src on existing element
        currentImg.src = ASSETS.celebrate;
      }
    } catch (e) {
      // if anything goes wrong, attempt to set the existing image src
      if (currentImg) currentImg.src = ASSETS.celebrate;
    }

    // Fire confetti and show the YES panel with gifts
    celebrate();
    showYesPanel();
  });

  // Calculate a random safe position inside the card for the NO button
  function moveNoRandomly(button){
    // Position the button within the viewport so it never goes off-screen.
    const btnRect = button.getBoundingClientRect();
    const padding = 12; // keep away from edges
    const maxX = Math.max(0, window.innerWidth - btnRect.width - padding);
    const maxY = Math.max(0, window.innerHeight - btnRect.height - padding);

    const targetX = Math.floor(Math.random() * (maxX + 1)) + Math.floor(padding / 2);
    const targetY = Math.floor(Math.random() * (maxY + 1)) + Math.floor(padding / 2);

    console.log('moveNoRandomly (viewport):', { maxX, maxY, targetX, targetY });

    // Use fixed positioning so the button is positioned relative to the viewport
    button.style.position = 'fixed';
    button.style.left = `${targetX}px`;
    button.style.top = `${targetY}px`;
    button.style.transform = '';
    button.style.zIndex = 9999;
    button.style.opacity = '1';
    button.style.transition = 'none';
  }

  // Desktop: on pointerenter (covers mouseenter + stylus), move NO
  no.addEventListener('pointerenter', (e) => {
    if (disableEvasion && disableEvasion.checked) return;
    // trigger for mouse/pen or if pointerType is not provided (some browsers)
    const pt = e && e.pointerType;
    console.log('pointerenter on NO, pointerType=', pt);
    if (!pt || pt === 'mouse' || pt === 'pen') {
      moveNoRandomly(no);
    }
  });

  // Reset position when pointer leaves card
  card.addEventListener('pointerleave', () => { no.style.transform = ''; });

  // Keyboard accessibility: don't block keyboard users. If user presses Enter/Space, allow click.
  // But we can show a small tooltip or ARIA message; for demo we just let it work.

  // Touch devices: first tap moves the button, second tap confirms NO.
  let movedOnTouch = false;
  no.addEventListener('click', (e) => {
    if (disableEvasion && disableEvasion.checked) return; // allow normal behavior
    if (e.pointerType === 'touch' || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)) {
      if (!movedOnTouch) {
        moveNoRandomly(no);
        movedOnTouch = true;
        e.preventDefault();
        e.stopPropagation();
        // remove moved state after a short time so user can try again
        setTimeout(() => movedOnTouch = false, 1500);
      } else {
        // On touch devices we do NOT show a prompt. No-op (or add subtle UI if desired).
        console.log('NO confirmed on touch device (no prompt shown).');
      }
    } else {
      // Non-touch devices (mouse/pen): keep the simple alert confirmation for demo
      alert('You selected NO.');
    }
  });

  // Also listen for touchstart directly to be more responsive on mobile devices
  no.addEventListener('touchstart', (e) => {
    if (disableEvasion && disableEvasion.checked) return; // allow normal behavior
    if (!movedOnTouch) {
      moveNoRandomly(no);
      movedOnTouch = true;
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => movedOnTouch = false, 1500);
    } else {
      // second tap behavior: let the click handler handle confirmation
    }
  }, { passive: false });

})();
 
// --- Gift/Yes panel behaviour (separate scope so we can edit letters easily) ---
(function(){
  // Edit these three strings to the letters you want to show inside each gift.
  // You can personalize them directly here.
  const LETTERS = [
    "Letter 1: Hi Rudra, I just want to say how much I care about you and how happy you make me. I love how your smile lights up my life :)   ",
    "Letter 2: Let's tick off items from the bucket list and make unforgettable memories together.",
  "Letter 3: Hmm, so you opened the third letter...Busy making a teleportation machine to be with you ❤️."
  ];

  const yesPanel = document.getElementById('yes-panel');
  const giftsContainer = document.getElementById('gifts');
  const resetBtn = document.getElementById('reset-btn');
  const titleEl = document.querySelector('.title');
  const originalTitleText = titleEl ? titleEl.textContent : '';

  function createGift(i, text){
    const div = document.createElement('div');
    div.className = 'gift';
    div.setAttribute('role','listitem');
    div.setAttribute('tabindex','0');

  const title = document.createElement('div');
  title.className = 'gift-title';
  // emoji to visually indicate a letter/gift
  const emoji = document.createElement('span');
  emoji.className = 'gift-emoji';
  emoji.textContent = '💌';
  const titleText = document.createElement('span');
  titleText.className = 'gift-title-text';
  titleText.textContent = `Gift ${i+1}`;
  title.appendChild(emoji);
  title.appendChild(titleText);

    const letter = document.createElement('div');
    letter.className = 'gift-letter';
    letter.textContent = text;

    div.appendChild(title);
    div.appendChild(letter);

    // Reveal on click or Enter/Space
    function reveal(){
      div.classList.add('revealed');
      // Ensure the letter is focused for screen readers
      letter.setAttribute('tabindex','0');
      letter.focus();
    }

    div.addEventListener('click', reveal);
    div.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        reveal();
      }
    });

    return div;
  }

  function showYesPanel(){
    // clear previous
    giftsContainer.innerHTML = '';
    LETTERS.forEach((t,i) => giftsContainer.appendChild(createGift(i,t)));
    yesPanel.classList.remove('hidden');
    // hide the original question and choices
    const title = document.querySelector('.title');
    const controls = document.getElementById('controls');
    const sub = document.querySelector('.sub');
    const options = document.querySelector('.options');
    if (title) { title.classList.add('hidden'); title.style.display = 'none'; }
    if (controls) { controls.classList.add('hidden'); controls.style.display = 'none'; }
    if (sub) { sub.classList.add('hidden'); sub.style.display = 'none'; }
    if (options) { options.classList.add('hidden'); options.style.display = 'none'; }
  }

  function hideYesPanel(){
    yesPanel.classList.add('hidden');
    // reset main gif to begging if available
    const mainGif = document.getElementById('main-gif');
    mainGif.src = ASSETS.begging;
    // clear any generated gifts
    if (giftsContainer) giftsContainer.innerHTML = '';
    // reset NO button position and touch state
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
      noBtn.style.transform = '';
      // clear absolute positioning to return to document flow
      noBtn.style.position = '';
      noBtn.style.left = '';
      noBtn.style.top = '';
      noBtn.style.zIndex = '';
    }
    // reset touch move flag so NO behaves normally after reset
    if (typeof movedOnTouch !== 'undefined') movedOnTouch = false;
    // restore the question and controls
    const title = document.querySelector('.title');
    const controls = document.getElementById('controls');
    const sub = document.querySelector('.sub');
    const options = document.querySelector('.options');
  if (title) { title.classList.remove('hidden'); title.style.display = ''; }
    // restore the original personalized title text saved at load (fallback to generic)
    if (title && typeof originalTitleText === 'string' && originalTitleText.length) {
      title.textContent = originalTitleText;
    } else if (title) {
      title.textContent = 'Will you be my Valentine?';
    }
  if (controls) { controls.classList.remove('hidden'); controls.style.display = ''; }
  if (sub) { sub.classList.remove('hidden'); sub.style.display = ''; }
  if (options) { options.classList.remove('hidden'); options.style.display = ''; }
    // ensure the title is visible via inline style fallback
    if (title) title.style.display = '';
  }

  resetBtn.addEventListener('click', () => {
    hideYesPanel();
  });

  // Expose showYesPanel for app.js to call
  window.showYesPanel = showYesPanel;

})();

// Decorative floating hearts background (non-interactive)
(function(){
  const container = document.getElementById('bg-hearts');
  if (!container) return;

  const isTouch = (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
  const count = isTouch ? 8 : 20; // fewer on mobile

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'bg-heart float-up';
    const left = Math.floor(Math.random() * 100);
    const size = isTouch ? (14 + Math.random()*18) : (18 + Math.random()*30);
    el.style.left = left + 'vw';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.animationDuration = (6 + Math.random()*6) + 's';
    el.style.animationDelay = (-Math.random()*6) + 's';
    el.innerHTML = '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M16 28s-12-7.4-12-12.8C4 9.6 8.6 6 12.8 6 15.3 6 16 8.2 16 8.2s.7-2.2 3.2-2.2C23.4 6 28 9.6 28 15.2 28 20.6 16 28 16 28z" fill="#ff6b8a"/></svg>';
    container.appendChild(el);
  }
})();
