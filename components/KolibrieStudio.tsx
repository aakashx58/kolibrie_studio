'use client';

import { useEffect, useRef } from 'react';

interface SheetConfig {
  url: string;
  w: number;
  h: number;
  cells: [number, number, number, number][];
}

const SHEETS: Record<string, SheetConfig> = {
  work1: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_b0899b4d-5876-4c63-98d3-8608d8dbe790.png&w=2400&q=85',
    w: 2688,
    h: 1520,
    cells: [
      [0, 0, 1336, 752],
      [1352, 0, 1336, 752],
      [0, 768, 1336, 752],
      [1352, 768, 1336, 752],
    ],
  },
  work2: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_aee93a53-873f-470f-afb3-6395c22ab639.png&w=2400&q=85',
    w: 2688,
    h: 1520,
    cells: [
      [0, 0, 1335, 749],
      [1356, 0, 1332, 749],
      [0, 770, 1335, 750],
      [1356, 770, 1332, 750],
    ],
  },
  team1: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224239_be9bd6b1-debb-4a95-aadf-1a36e4d2f557.png&w=1600&q=85',
    w: 1744,
    h: 2336,
    cells: [
      [0, 0, 864, 1156],
      [881, 0, 863, 1156],
      [0, 1175, 864, 1161],
      [881, 1175, 863, 1161],
    ],
  },
  team2: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_bfc657e7-cbc1-43fb-a726-e8be5dd42302.png&w=1600&q=85',
    w: 1744,
    h: 2336,
    cells: [
      [0, 0, 864, 1159],
      [880, 0, 864, 1159],
      [0, 1176, 864, 1160],
      [880, 1176, 864, 1160],
    ],
  },
  bts: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_bf8567fa-9d67-4f1e-b4e0-5662c0bf70e4.png&w=1600&q=85',
    w: 1744,
    h: 2336,
    cells: [
      [0, 0, 865, 1160],
      [881, 0, 863, 1160],
      [0, 1176, 865, 1160],
      [881, 1176, 863, 1160],
    ],
  },
};

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261110_231342_88260d66-aa30-4612-9157-d7f1b5a66d8c.mp4';
const HERO_POSTER_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224241_f6feccd5-1c45-4d22-b369-f927916f9973.png&w=2048&q=85';

const HERO_CARDS = [
  {crop: 'work2:1', alt: 'Surfer carrying a board along a sunset beach'},
  {crop: 'work1:0', alt: 'Giant orange in sunglasses on a red vintage car roof'},
  {crop: 'work2:3', alt: 'Orange soda bottle splashing on cream'},
  {crop: 'work1:1', alt: 'Woman laughing on a striped lilo in a turquoise pool'},
  {crop: 'work2:2', alt: 'Orange scooter by a pastel wall with bougainvillea'},
  {crop: 'work1:2', alt: 'Croissant tower on a bakery counter'},
  {crop: 'work2:0', alt: 'Friends at a night-market food stall under string lights'},
  {crop: 'work1:3', alt: 'Skateboarder mid-ollie on a sun-baked street'},
];

const WORK_CASES = [
  {title: 'SQUEEZE THE SUN', color: 'var(--tomato)', crop: 'work1:0'},
  {title: 'DEEP END DAYS', color: 'var(--sky)', crop: 'work1:1'},
  {title: 'FLAKE & BAKE', color: 'var(--butter)', crop: 'work1:2'},
  {title: 'CURB APPEAL', color: 'var(--sage)', crop: 'work1:3'},
  {title: 'NIGHT BITES', color: 'var(--pink)', crop: 'work2:0'},
];

interface TeamItem {
  side: 'left' | 'right';
  offset: string;
  top: string;
  mobileTop: string;
  width: string;
  rotate: number;
  speed: number;
  crop: string;
  sticker?: {name: string; rotate: number};
  caption?: string;
  sideOrder: number;
}

const TEAM_ITEMS: TeamItem[] = [
  {
    side: 'left',
    offset: '2.5vw',
    top: '3%',
    mobileTop: '1%',
    width: '14rem',
    rotate: -4,
    speed: 1,
    crop: 'team1:0',
    sticker: {name: 'Noor', rotate: -7},
    sideOrder: 1,
  },
  {
    side: 'left',
    offset: '21vw',
    top: '19%',
    mobileTop: '17%',
    width: '11rem',
    rotate: 3,
    speed: 0.6,
    crop: 'bts:0',
    caption: 'ON SET',
    sideOrder: 2,
  },
  {
    side: 'left',
    offset: '3vw',
    top: '33%',
    mobileTop: '33%',
    width: '13rem',
    rotate: 5,
    speed: 1.3,
    crop: 'team1:1',
    sticker: {name: 'Sem', rotate: 4},
    sideOrder: 3,
  },
  {
    side: 'left',
    offset: '23vw',
    top: '49%',
    mobileTop: '49%',
    width: '13.5rem',
    rotate: -3,
    speed: 0.8,
    crop: 'team2:3',
    sticker: {name: 'Mila', rotate: -5},
    sideOrder: 4,
  },
  {
    side: 'left',
    offset: '2vw',
    top: '64%',
    mobileTop: '65%',
    width: '11.5rem',
    rotate: -6,
    speed: 1.15,
    crop: 'bts:2',
    caption: 'DINNER, IN 9:16',
    sideOrder: 5,
  },
  {
    side: 'left',
    offset: '20vw',
    top: '79%',
    mobileTop: '81%',
    width: '14rem',
    rotate: 4,
    speed: 0.7,
    crop: 'team1:2',
    sticker: {name: 'Daan', rotate: 6},
    sideOrder: 6,
  },
  {
    side: 'right',
    offset: '3vw',
    top: '2%',
    mobileTop: '9%',
    width: '13.5rem',
    rotate: 4,
    speed: 0.75,
    crop: 'team2:0',
    sticker: {name: 'Lotte', rotate: 5},
    sideOrder: 1,
  },
  {
    side: 'right',
    offset: '22vw',
    top: '17%',
    mobileTop: '25%',
    width: '11rem',
    rotate: -5,
    speed: 1.25,
    crop: 'bts:1',
    caption: 'TAKE ONE',
    sideOrder: 2,
  },
  {
    side: 'right',
    offset: '2.5vw',
    top: '32%',
    mobileTop: '41%',
    width: '14rem',
    rotate: -3,
    speed: 0.9,
    crop: 'team2:1',
    sticker: {name: 'Jules', rotate: -6},
    sideOrder: 3,
  },
  {
    side: 'right',
    offset: '23vw',
    top: '48%',
    mobileTop: '57%',
    width: '13rem',
    rotate: 5,
    speed: 1.4,
    crop: 'team1:3',
    sticker: {name: 'Yara', rotate: 4},
    sideOrder: 4,
  },
  {
    side: 'right',
    offset: '3vw',
    top: '63%',
    mobileTop: '73%',
    width: '11.5rem',
    rotate: 6,
    speed: 0.65,
    crop: 'bts:3',
    caption: 'GOLDEN HOUR',
    sideOrder: 5,
  },
  {
    side: 'right',
    offset: '20vw',
    top: '78%',
    mobileTop: '89%',
    width: '14rem',
    rotate: -4,
    speed: 1.05,
    crop: 'team2:2',
    sticker: {name: 'Kenji', rotate: -4},
    sideOrder: 6,
  },
];

const DRAW_LINE_VARIANTS = [
  'M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999',
  'M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242',
  'M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014',
  'M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892',
  'M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998',
  'M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025',
];

const SCRIPT_URLS = [
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js',
  'https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js',
];

function loadScriptSequential(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${url}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), {once: true});
      existing.addEventListener('error', () => reject(new Error(`Failed: ${url}`)), {
        once: true,
      });
      return;
    }
    const s = document.createElement('script');
    s.src = url;
    s.async = false;
    s.onload = () => {
      s.dataset.loaded = 'true';
      resolve();
    };
    s.onerror = () => reject(new Error(`Failed: ${url}`));
    document.body.appendChild(s);
  });
}

function ClientLogos() {
  return (
    <>
      {/* 1. Six-spoke asterisk of round-capped strokes */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
          <line x1="17.1" y1="31" x2="82.9" y2="69" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
          <line x1="82.9" y1="31" x2="17.1" y2="69" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>
      {/* 2. Two capsule D shapes side by side */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 120 100" fill="currentColor" aria-hidden="true">
          <path d="M12 18h18c15.464 0 28 14.327 28 32s-12.536 32-28 32H12V18z" />
          <path d="M64 18h18c15.464 0 28 14.327 28 32s-12.536 32-28 32H64V18z" />
        </svg>
      </div>
      {/* 3. Three wavy lines */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true">
          <path d="M10 26c14-12 26 12 40 0s26 12 40 0 16-4 20 0" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          <path d="M10 50c14-12 26 12 40 0s26 12 40 0 16-4 20 0" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          <path d="M10 74c14-12 26 12 40 0s26 12 40 0 16-4 20 0" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
        </svg>
      </div>
      {/* 4. Four diamonds in a diamond pattern */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <polygon points="50,6 63,24 50,42 37,24" />
          <polygon points="76,37 94,50 76,63 58,50" />
          <polygon points="50,58 63,76 50,94 37,76" />
          <polygon points="24,37 42,50 24,63 6,50" />
        </svg>
      </div>
      {/* 5. Half sun over three bars */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <path d="M20 48a30 30 0 0 1 60 0H20z" />
          <rect x="14" y="56" width="72" height="8" rx="4" />
          <rect x="20" y="70" width="60" height="8" rx="4" />
          <rect x="28" y="84" width="44" height="8" rx="4" />
        </svg>
      </div>
      {/* 6. Two arches */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true">
          <path d="M14 82V46a20 20 0 0 1 40 0v36" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
          <path d="M66 82V46a20 20 0 0 1 40 0v36" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
        </svg>
      </div>
      {/* 7. Four-point sparkle star */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <path d="M50 4C54 34 66 46 96 50 66 54 54 66 50 96 46 66 34 54 4 50 34 46 46 34 50 4z" />
        </svg>
      </div>
      {/* 8. Circle with a cross inside */}
      <div className="marquee-logo-box">
        <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="11" />
          <line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
          <line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}

export default function KolibrieStudio() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const cleanups: (() => void)[] = [];

    const revealImmediately = () => {
      document.documentElement.setAttribute('data-page-ready', '');
      const mainEl = document.querySelector('main');
      if (mainEl) {
        (mainEl as HTMLElement).style.visibility = 'visible';
        (mainEl as HTMLElement).style.opacity = '1';
      }
      document.querySelectorAll<HTMLElement>('[data-text-reveal], [data-scroll-reveal]').forEach((el) => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      });
      const wipe = document.querySelector('.load-wipe');
      if (wipe) wipe.setAttribute('data-transition-ready', '');
    };

    // 4-second failsafe
    const failsafeTimer = window.setTimeout(() => {
      if (!document.documentElement.hasAttribute('data-page-ready')) {
        revealImmediately();
      }
    }, 4000);
    cleanups.push(() => window.clearTimeout(failsafeTimer));

    // Fill .crop boxes right away (no GSAP dependency needed)
    const fillCropBoxes = () => {
      document.querySelectorAll<HTMLElement>('.crop[data-crop]').forEach((box) => {
        if (box.querySelector('.cell')) return;
        const spec = box.dataset.crop || '';
        const [sheetKey, cellStr] = spec.split(':');
        const cellIndex = Number(cellStr);
        const sheet = SHEETS[sheetKey];
        if (!sheet || !sheet.cells[cellIndex]) return;

        const [rawX, rawY, rawW, rawH] = sheet.cells[cellIndex];
        const cellX = rawX + 4;
        const cellY = rawY + 4;
        const cellW = rawW - 8;
        const cellH = rawH - 8;

        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.style.setProperty('--ar', String(cellW / cellH));

        const img = document.createElement('img');
        img.src = sheet.url;
        img.alt = box.dataset.alt || 'Kolibrie studio visual';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.style.width = `${(sheet.w / cellW) * 100}%`;
        img.style.height = `${(sheet.h / cellH) * 100}%`;
        img.style.left = `${-(cellX / cellW) * 100}%`;
        img.style.top = `${-(cellY / cellH) * 100}%`;

        cellDiv.appendChild(img);
        box.appendChild(cellDiv);
      });
    };

    fillCropBoxes();

    // Hero video reduced-motion toggle
    const videoEl = document.querySelector<HTMLVideoElement>('.hero-video');
    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncHeroVideo = () => {
      if (!videoEl) return;
      if (rmQuery.matches) {
        if (videoEl.getAttribute('src')) {
          videoEl.pause();
          videoEl.removeAttribute('src');
          videoEl.load();
        }
      } else {
        if (!videoEl.getAttribute('src')) {
          videoEl.src = HERO_VIDEO_URL;
        }
        videoEl.play().catch(() => {});
      }
    };
    syncHeroVideo();
    rmQuery.addEventListener('change', syncHeroVideo);
    cleanups.push(() => rmQuery.removeEventListener('change', syncHeroVideo));

    // Load scripts in exact order and boot GSAP + Lenis
    const boot = async () => {
      try {
        for (const url of SCRIPT_URLS) {
          if (cancelled) return;
          await loadScriptSequential(url);
        }
      } catch {
        if (!cancelled) revealImmediately();
        return;
      }

      if (cancelled) return;

      const w = window as unknown as Record<string, any>;
      const gsap = w.gsap;
      const ScrollTrigger = w.ScrollTrigger;
      const SplitText = w.SplitText;
      const DrawSVGPlugin = w.DrawSVGPlugin;
      const InertiaPlugin = w.InertiaPlugin;
      const Lenis = w.Lenis;

      if (!gsap || !ScrollTrigger || !SplitText || !DrawSVGPlugin || !InertiaPlugin) {
        revealImmediately();
        return;
      }

      gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, InertiaPlugin);

      const reducedMotion = rmQuery.matches;
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      // Wait for document.fonts.ready or 1.5s
      await Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => window.setTimeout(r, 1500)),
      ]);
      if (cancelled) return;

      document.documentElement.setAttribute('data-page-ready', '');
      window.clearTimeout(failsafeTimer);

      // 6.1 Smooth scroll (Lenis)
      let lenis: any = null;
      if (!reducedMotion && Lenis) {
        lenis = new Lenis({
          lerp: 0.165,
          wheelMultiplier: 1.25,
        });
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on('scroll', onLenisScroll);
        const tickLenis = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickLenis);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(tickLenis);
          lenis.off('scroll', onLenisScroll);
          lenis.destroy();
        });
      }

      // Smooth in-page hash links
      const onAnchorClick = (e: Event) => {
        const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href) return;
        const target = href === '#top' ? 0 : document.querySelector<HTMLElement>(href);
        if (href !== '#top' && !target) return;
        e.preventDefault();
        if (lenis && !reducedMotion) {
          lenis.scrollTo(target as any, {duration: 1.4});
        } else if (target === 0) {
          window.scrollTo({top: 0, behavior: 'smooth'});
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({behavior: 'smooth'});
        }
      };
      document.addEventListener('click', onAnchorClick);
      cleanups.push(() => document.removeEventListener('click', onAnchorClick));

      // Helper for SplitText mask descender padding
      const fixSplitMasks = (split: any) => {
        if (!split?.lines) return;
        split.lines.forEach((line: HTMLElement) => {
          line.style.paddingBottom = '0.06em';
          line.style.marginBottom = '-0.06em';
          const p = line.parentElement;
          if (p && p !== line.closest('[data-text-reveal], [data-scroll-reveal]')) {
            p.style.paddingBottom = '0.06em';
            p.style.marginBottom = '-0.06em';
          }
        });
      };

      // 6.3 Text reveal on load
      const splitInstances: any[] = [];
      cleanups.push(() => {
        splitInstances.forEach((sp) => {
          try {
            sp.revert();
          } catch {}
        });
      });

      const runTextReveals = (baseDelay: number) => {
        const handled = new Set<HTMLElement>();

        const animateEl = (el: HTMLElement, delay: number) => {
          handled.add(el);
          const mode = el.dataset.textReveal || 'lines';
          const hasFwh = el.hasAttribute('data-font-weight-hover');
          gsap.set(el, {visibility: 'visible'});

          if (mode === 'element') {
            gsap.fromTo(
              el,
              {y: 24, autoAlpha: 0},
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                delay,
                ease: 'expo.out',
                onComplete: () => {
                  el.dataset.revealDone = '1';
                  el.dispatchEvent(new CustomEvent('reveal:done'));
                },
              }
            );
            return;
          }

          const isChars = mode === 'chars';
          const split = SplitText.create(el, {
            type: isChars ? 'chars,words,lines' : 'lines,words',
            linesClass: 'line',
            charsClass: 'char',
            mask: 'lines',
            autoSplit: !hasFwh,
          });
          splitInstances.push(split);
          fixSplitMasks(split);
          (el as any)._split = split;

          const targets = isChars ? split.chars : split.lines;
          const stagger = isChars ? 0.07 * 0.25 : 0.07;
          gsap.from(targets, {
            yPercent: 135,
            duration: 1,
            delay,
            ease: 'expo.out',
            stagger,
            onComplete: () => {
              el.dataset.revealDone = '1';
              el.dispatchEvent(new CustomEvent('reveal:done'));
            },
          });
        };

        document.querySelectorAll<HTMLElement>('[data-text-reveal-group]').forEach((group) => {
          const children = group.querySelectorAll<HTMLElement>('[data-text-reveal]');
          children.forEach((child, idx) => {
            animateEl(child, baseDelay + idx * 0.12);
          });
        });

        document.querySelectorAll<HTMLElement>('[data-text-reveal]').forEach((el) => {
          if (!handled.has(el)) {
            animateEl(el, baseDelay);
          }
        });
      };

      // 6.4 Scroll reveal
      const initScrollReveal = () => {
        if (reducedMotion) return;
        const handled = new Set<HTMLElement>();

        const addRevealToTimeline = (tl: any, el: HTMLElement, atTime: number | string) => {
          handled.add(el);
          const mode = el.dataset.scrollReveal || 'lines';
          const hasFwh = el.hasAttribute('data-font-weight-hover');
          gsap.set(el, {visibility: 'visible'});

          if (mode === 'element') {
            tl.fromTo(
              el,
              {y: 24, autoAlpha: 0},
              {y: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out'},
              atTime
            );
            return;
          }

          const isChars = mode === 'chars';
          const split = SplitText.create(el, {
            type: isChars ? 'chars,words,lines' : 'lines,words',
            linesClass: 'line',
            charsClass: 'char',
            mask: 'lines',
            autoSplit: !hasFwh,
          });
          splitInstances.push(split);
          fixSplitMasks(split);
          (el as any)._split = split;

          const targets = isChars ? split.chars : split.lines;
          const stagger = isChars ? 0.07 * 0.25 : 0.07;
          tl.from(
            targets,
            {
              yPercent: 135,
              duration: 1,
              ease: 'expo.out',
              stagger,
            },
            atTime
          );
        };

        document.querySelectorAll<HTMLElement>('[data-scroll-reveal-group]').forEach((group) => {
          const els = group.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
          if (!els.length) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              once: true,
            },
          });
          els.forEach((el, idx) => {
            addRevealToTimeline(tl, el, idx * 0.12);
          });
        });

        document.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach((el) => {
          if (handled.has(el)) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          });
          addRevealToTimeline(tl, el, 0);
        });
      };

      // 6.5 Draw underline
      let drawVariantIdx = Math.floor(Math.random() * DRAW_LINE_VARIANTS.length);
      const makeDrawSvg = (pathD: string) => {
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 310 40');
        svg.setAttribute('preserveAspectRatio', 'none');
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', pathD);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '10');
        path.setAttribute('stroke-linecap', 'round');
        svg.appendChild(path);
        return {svg, path};
      };

      const initDrawLine = () => {
        // Hover underlines
        document.querySelectorAll<HTMLElement>('[data-draw-line="hover"]').forEach((box) => {
          const trigger = box.closest('a, button') || box;
          let activeSvg: SVGSVGElement | null = null;
          let drawTween: any = null;
          let eraseTween: any = null;
          let hovered = false;

          const runErase = () => {
            if (!activeSvg || hovered) return;
            const path = activeSvg.querySelector('path');
            const svgRef = activeSvg;
            eraseTween = gsap.to(path, {
              drawSVG: '100% 100%',
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                svgRef.remove();
                if (activeSvg === svgRef) activeSvg = null;
              },
            });
          };

          const onEnter = () => {
            hovered = true;
            if (eraseTween) {
              eraseTween.kill();
              eraseTween = null;
            }
            if (drawTween) {
              drawTween.kill();
              drawTween = null;
            }
            if (activeSvg) {
              activeSvg.remove();
              activeSvg = null;
            }
            const d = DRAW_LINE_VARIANTS[drawVariantIdx % DRAW_LINE_VARIANTS.length];
            drawVariantIdx += 1;
            const {svg, path} = makeDrawSvg(d);
            box.innerHTML = '';
            box.appendChild(svg);
            activeSvg = svg;

            if (reducedMotion) {
              gsap.set(path, {drawSVG: '100%'});
              return;
            }
            gsap.set(path, {drawSVG: '0%'});
            drawTween = gsap.to(path, {
              drawSVG: '100%',
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                drawTween = null;
                if (!hovered) runErase();
              },
            });
          };

          const onLeave = () => {
            hovered = false;
            if (reducedMotion) {
              if (activeSvg) {
                activeSvg.remove();
                activeSvg = null;
              }
              return;
            }
            if (!drawTween || !drawTween.isActive()) {
              runErase();
            }
          };

          trigger.addEventListener('mouseenter', onEnter);
          trigger.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            trigger.removeEventListener('mouseenter', onEnter);
            trigger.removeEventListener('mouseleave', onLeave);
          });
        });

        // Always-on underline (~1.3s after init)
        document.querySelectorAll<HTMLElement>('[data-draw-line="always"]').forEach((box) => {
          const drawAlways = () => {
            const d = DRAW_LINE_VARIANTS[drawVariantIdx % DRAW_LINE_VARIANTS.length];
            drawVariantIdx += 1;
            const {svg, path} = makeDrawSvg(d);
            box.innerHTML = '';
            box.appendChild(svg);
            if (reducedMotion) {
              gsap.set(path, {drawSVG: '100%'});
            } else {
              gsap.set(path, {drawSVG: '0%'});
              gsap.to(path, {
                drawSVG: '100%',
                duration: 0.6,
                ease: 'power2.inOut',
              });
            }
          };

          if (reducedMotion) {
            drawAlways();
          } else {
            const dc = gsap.delayedCall(1.3, drawAlways);
            cleanups.push(() => dc.kill());
          }
        });
      };

      // 6.6 Font weight follows cursor
      const initFontWeightHover = () => {
        if (!isFinePointer || reducedMotion) return;

        interface CharEntry {
          char: HTMLElement;
          rest: number;
          near: number;
          radius: number;
          current: number;
          cx: number;
          cy: number;
          qt: (val: number) => void;
        }

        const entries: CharEntry[] = [];

        const setupElement = (el: HTMLElement) => {
          let chars: HTMLElement[] = [];
          if ((el as any)._split?.chars?.length) {
            chars = (el as any)._split.chars;
          } else {
            const sp = SplitText.create(el, {
              type: 'chars,words',
              charsClass: 'char',
              autoSplit: false,
            });
            splitInstances.push(sp);
            chars = sp.chars || [];
          }

          chars.forEach((char) => {
            const src = char.closest<HTMLElement>('[data-font-weight-hover]') || el;
            const rest = Number(src.dataset.fwhRest ?? 700);
            const near = Number(src.dataset.fwhNear ?? 200);
            const radius = Number(src.dataset.fwhRadius ?? 400);

            const fvs = getComputedStyle(char).fontVariationSettings;
            let nextFvs = '"wght" var(--wght)';
            if (fvs && fvs !== 'normal') {
              if (/["']wght["']\s+[\d.]+/.test(fvs)) {
                nextFvs = fvs.replace(/["']wght["']\s+[\d.]+/, '"wght" var(--wght)');
              } else {
                nextFvs = `${fvs}, "wght" var(--wght)`;
              }
            }
            char.style.setProperty('--wght', String(rest));
            char.style.fontVariationSettings = nextFvs;

            const qt = gsap.quickTo(char, '--wght', {duration: 0.4, ease: 'power2.out'});
            const rect = char.getBoundingClientRect();
            entries.push({
              char,
              rest,
              near,
              radius,
              current: rest,
              cx: rect.left + rect.width / 2 + window.scrollX,
              cy: rect.top + rect.height / 2 + window.scrollY,
              qt,
            });
          });
        };

        const measureAll = () => {
          for (let i = 0; i < entries.length; i += 1) {
            const e = entries[i];
            const rect = e.char.getBoundingClientRect();
            e.cx = rect.left + rect.width / 2 + window.scrollX;
            e.cy = rect.top + rect.height / 2 + window.scrollY;
          }
        };

        document.querySelectorAll<HTMLElement>('[data-font-weight-hover]').forEach((el) => {
          if (el.parentElement?.closest('[data-font-weight-hover]')) return;
          if (el.hasAttribute('data-text-reveal') && !el.dataset.revealDone) {
            const onDone = () => {
              setupElement(el);
            };
            el.addEventListener('reveal:done', onDone, {once: true});
            cleanups.push(() => el.removeEventListener('reveal:done', onDone));
          } else {
            setupElement(el);
          }
        });

        let pointerPageX = -99999;
        let pointerPageY = -99999;
        let lastScrollY = window.scrollY;

        const onPointerMove = (e: PointerEvent) => {
          pointerPageX = e.clientX + window.scrollX;
          pointerPageY = e.clientY + window.scrollY;
        };

        const onScroll = () => {
          const sy = window.scrollY;
          const deltaY = sy - lastScrollY;
          lastScrollY = sy;
          if (pointerPageY > -50000) {
            pointerPageY += deltaY;
          }
          measureAll();
        };

        const onResize = () => {
          measureAll();
        };

        const onTick = () => {
          if (pointerPageX < -50000) return;
          for (let i = 0; i < entries.length; i += 1) {
            const item = entries[i];
            const d = Math.hypot(pointerPageX - item.cx, pointerPageY - item.cy);
            const f = d >= item.radius ? 0 : 1 - d / item.radius;
            const raw = item.rest + (item.near - item.rest) * f;
            const minW = Math.min(item.rest, item.near);
            const maxW = Math.max(item.rest, item.near);
            const target = Math.min(maxW, Math.max(minW, raw));
            if (Math.abs(target - item.current) >= 1) {
              item.current = target;
              item.qt(target);
            }
          }
        };

        window.addEventListener('pointermove', onPointerMove, {passive: true});
        window.addEventListener('scroll', onScroll, {passive: true});
        window.addEventListener('resize', onResize);
        gsap.ticker.add(onTick);

        cleanups.push(() => {
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onResize);
          gsap.ticker.remove(onTick);
        });
      };

      // 6.7 Hero cursor card (desktop >=992px with fine hover pointer only)
      const initHeroCursorCard = () => {
        const hero = document.querySelector<HTMLElement>('[data-cursor-cards]');
        const card = hero?.querySelector<HTMLElement>('.hero-cursor-card');
        const media = hero?.querySelector<HTMLElement>('.hero-cursor-media');
        if (!hero || !card || !media) return;

        const crops = Array.from(media.querySelectorAll<HTMLElement>('.crop'));
        const threshold = Number(hero.dataset.threshold ?? 300);

        const desktopFineQuery = window.matchMedia(
          '(min-width: 992px) and (hover: hover) and (pointer: fine)'
        );
        if (!desktopFineQuery.matches) return;

        const qx = gsap.quickTo(card, 'x', {duration: 1, ease: 'power4'});
        const qy = gsap.quickTo(card, 'y', {duration: 1, ease: 'power4'});
        const qRot = gsap.quickTo(card, 'rotation', {duration: 1, ease: 'power4'});
        const qxPct = gsap.quickTo(media, 'xPercent', {duration: 0.6, ease: 'power2'});
        const qyPct = gsap.quickTo(media, 'yPercent', {duration: 0.7, ease: 'power2'});

        gsap.set(card, {autoAlpha: 0, x: 0, y: 0, rotation: 0});
        gsap.set(media, {scale: 1.2, xPercent: 0, yPercent: 0});
        crops.forEach((c, idx) => c.classList.toggle('on', idx === 0));

        let activeIdx = 0;
        let hasMoved = false;
        let lastX = 0;
        let lastY = 0;
        let travel = 0;
        let settleTimer: number | null = null;
        let hiddenOverInteractive = false;

        const clampDrift = gsap.utils.clamp(-8, 8);

        const onMouseMove = (e: MouseEvent) => {
          if (!desktopFineQuery.matches) return;

          const overLink = Boolean((e.target as HTMLElement | null)?.closest('a, button'));
          if (overLink) {
            if (!hiddenOverInteractive) {
              hiddenOverInteractive = true;
              gsap.to(card, {autoAlpha: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto'});
            }
            return;
          }

          const heroTop = hero.getBoundingClientRect().top;
          const x = e.clientX - window.innerWidth / 2;
          const y = e.clientY - window.innerHeight / 2 - heroTop;

          if (!hasMoved) {
            hasMoved = true;
            lastX = x;
            lastY = y;
            gsap.set(card, {x, y});
            gsap.to(card, {autoAlpha: 1, duration: 0.3, overwrite: 'auto'});
          } else if (hiddenOverInteractive) {
            hiddenOverInteractive = false;
            gsap.to(card, {autoAlpha: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto'});
          }

          const dx = (x - lastX) / 2;
          const dy = (y - lastY) / 2;
          const rot = (x - lastX) / 4;
          lastX = x;
          lastY = y;

          qx(x);
          qy(y);
          qRot(rot);
          qxPct(-clampDrift(dx));
          qyPct(-clampDrift(dy));

          travel += Math.abs(dx) + Math.abs(dy);
          if (travel > threshold) {
            travel = 0;
            crops[activeIdx]?.classList.remove('on');
            activeIdx = (activeIdx + 1) % crops.length;
            crops[activeIdx]?.classList.add('on');
          }

          if (settleTimer) window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(() => {
            qRot(0);
            qxPct(0);
            qyPct(0);
          }, 66);
        };

        const onMouseLeave = () => {
          if (settleTimer) window.clearTimeout(settleTimer);
          hasMoved = false;
          hiddenOverInteractive = false;
          travel = 0;
          qRot(0);
          qxPct(0);
          qyPct(0);
          gsap.to(card, {autoAlpha: 0, duration: 0.3, overwrite: 'auto'});
        };

        hero.addEventListener('mousemove', onMouseMove);
        hero.addEventListener('mouseleave', onMouseLeave);
        cleanups.push(() => {
          if (settleTimer) window.clearTimeout(settleTimer);
          hero.removeEventListener('mousemove', onMouseMove);
          hero.removeEventListener('mouseleave', onMouseLeave);
        });
      };

      // 6.8 Client marquee
      const initMarquee = () => {
        if (reducedMotion) return;
        const marqueeEl = document.querySelector<HTMLElement>('.client-marquee');
        const scrollWrap = marqueeEl?.querySelector<HTMLElement>('.marquee-scroll');
        const origCollection = scrollWrap?.querySelector<HTMLElement>('.marquee-collection');
        if (!marqueeEl || !scrollWrap || !origCollection) return;

        scrollWrap.style.marginLeft = '-10%';
        scrollWrap.style.width = '120%';

        // Append 2 clones cleanly
        const clones: HTMLElement[] = [];
        for (let i = 0; i < 2; i += 1) {
          const clone = origCollection.cloneNode(true) as HTMLElement;
          clone.setAttribute('aria-hidden', 'true');
          scrollWrap.appendChild(clone);
          clones.push(clone);
        }

        const collections = [origCollection, ...clones];
        const direction = -1; // left
        const speed = 30;

        const getDuration = () => {
          const vw = window.innerWidth || 1440;
          const f = vw <= 479 ? 0.25 : vw <= 991 ? 0.5 : 1;
          const colW = origCollection.offsetWidth || vw;
          return speed * (colW / vw) * f;
        };

        const dur = getDuration();
        gsap.set(collections, {xPercent: -100});
        const loopTween = gsap.fromTo(
          collections,
          {xPercent: 0},
          {
            xPercent: -100,
            duration: dur,
            ease: 'none',
            repeat: -1,
          }
        );
        // Start mid-cycle so reverse timeScale works cleanly without hitting 0
        loopTween.totalTime(dur * 1000 + dur * 0.5);

        const dirST = ScrollTrigger.create({
          trigger: marqueeEl,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self: any) => {
            // scrolling down -> -direction (+1); scrolling up -> +direction (-1)
            loopTween.timeScale(self.direction === 1 ? -direction : direction);
          },
        });

        const scrubTween = gsap.fromTo(
          scrollWrap,
          {x: '10vw'},
          {
            x: '-10vw',
            ease: 'none',
            scrollTrigger: {
              trigger: marqueeEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0,
            },
          }
        );

        const onResize = () => {
          loopTween.duration(getDuration());
        };
        window.addEventListener('resize', onResize);

        cleanups.push(() => {
          window.removeEventListener('resize', onResize);
          dirST.kill();
          scrubTween.scrollTrigger?.kill();
          scrubTween.kill();
          loopTween.kill();
          clones.forEach((c) => c.remove());
          scrollWrap.style.marginLeft = '';
          scrollWrap.style.width = '';
        });
      };

      // 6.9 Latest drops 3D stack (desktop >=992px; works under reduced motion too except tilt)
      const initWorkStack = () => {
        const section = document.querySelector<HTMLElement>('[data-featured-stack]');
        const pinEl = section?.querySelector<HTMLElement>('.work-pin');
        const stackRoot = section?.querySelector<HTMLElement>('.work-stack-root');
        const badge = section?.querySelector<HTMLElement>('.work-badge');
        if (!section || !pinEl || !stackRoot) return;

        const slides = Array.from(stackRoot.querySelectorAll<HTMLElement>('.work-slide'));
        const count = slides.length;
        if (count < 2) return;

        const depth = 120;
        const offset = 40;
        const tiltX = 6;
        const tiltY = 10;

        const mm = gsap.matchMedia();
        mm.add('(min-width: 992px)', () => {
          slides.forEach((slide, b) => {
            gsap.set(slide, {
              z: -b * depth,
              y: -b * offset,
              zIndex: count - b,
              autoAlpha: 1,
            });
          });

          const tl = gsap.timeline({paused: true});
          for (let b = 0; b < count - 1; b += 1) {
            tl.to(
              slides[b],
              {
                y: `+=${window.innerHeight * 0.9}`,
                duration: 1,
                ease: 'power2.in',
              },
              b
            );
            tl.to(
              slides[b],
              {
                autoAlpha: 0,
                duration: 0.25,
                ease: 'none',
              },
              b + 0.7
            );
            for (let j = b + 1; j < count; j += 1) {
              const C = j - b - 1;
              tl.to(
                slides[j],
                {
                  z: -C * depth,
                  y: -C * offset,
                  duration: 1,
                  ease: 'none',
                },
                b
              );
            }
          }

          if (badge) {
            tl.to(
              badge,
              {
                rotation: 180,
                duration: count - 1,
                ease: 'none',
              },
              0
            );
          }

          const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.2 * (count - 1)}`,
            pin: pinEl,
            pinSpacing: true,
            scrub: 0.3,
            refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: (self: any) => {
              tl.progress(self.progress);
            },
          });

          // Mouse tilt (not under reduced motion)
          let removeTilt = () => {};
          if (!reducedMotion && isFinePointer) {
            const qRotX = gsap.quickTo(stackRoot, 'rotationX', {duration: 0.6, ease: 'power3'});
            const qRotY = gsap.quickTo(stackRoot, 'rotationY', {duration: 0.6, ease: 'power3'});
            const onMove = (e: MouseEvent) => {
              const rect = pinEl.getBoundingClientRect();
              const rx = -((e.clientY - rect.top) / rect.height - 0.5) * tiltX;
              const ry = ((e.clientX - rect.left) / rect.width - 0.5) * tiltY;
              qRotX(rx);
              qRotY(ry);
            };
            const onLeave = () => {
              qRotX(0);
              qRotY(0);
            };
            pinEl.addEventListener('mousemove', onMove);
            pinEl.addEventListener('mouseleave', onLeave);
            removeTilt = () => {
              pinEl.removeEventListener('mousemove', onMove);
              pinEl.removeEventListener('mouseleave', onLeave);
            };
          }

          return () => {
            removeTilt();
            st.kill();
            tl.kill();
          };
        });

        cleanups.push(() => mm.revert());
      };

      // 6.10 "View case ->" cursor label
      const initCursorMarquee = () => {
        if (!isFinePointer) return;
        const wrapper = document.querySelector<HTMLElement>('.cursor-marquee');
        if (!wrapper) return;
        const copies = Array.from(wrapper.querySelectorAll<HTMLElement>('.cursor-marquee-copy'));
        if (!copies.length) return;

        const qx = gsap.quickTo(wrapper, 'x', {duration: 0.4, ease: 'power3'});
        const qy = gsap.quickTo(wrapper, 'y', {duration: 0.4, ease: 'power3'});

        let snapped = false;
        let lastClientX = -9999;
        let lastClientY = -9999;
        let activeTarget: HTMLElement | null = null;
        let pauseTimer: number | null = null;

        const updateTargetFromPoint = () => {
          if (lastClientX < 0 || lastClientY < 0) return;
          const el = document.elementFromPoint(lastClientX, lastClientY) as HTMLElement | null;
          const target = el?.closest<HTMLElement>('[data-cursor-marquee-text]') || null;

          if (target !== activeTarget) {
            if (target) {
              if (pauseTimer) {
                window.clearTimeout(pauseTimer);
                pauseTimer = null;
              }
              const text = target.dataset.cursorMarqueeText || 'View case →';
              const dur = `${text.length / 5}s`;
              copies.forEach((c) => {
                c.textContent = text;
                c.style.animationDuration = dur;
                c.style.animationPlayState = 'running';
              });
              wrapper.setAttribute('data-cursor-marquee-status', 'active');
            } else {
              wrapper.setAttribute('data-cursor-marquee-status', 'not-active');
              if (pauseTimer) window.clearTimeout(pauseTimer);
              pauseTimer = window.setTimeout(() => {
                copies.forEach((c) => {
                  c.style.animationPlayState = 'paused';
                });
              }, 400);
            }
            activeTarget = target;
          }
        };

        const onPointerMove = (e: PointerEvent) => {
          lastClientX = e.clientX;
          lastClientY = e.clientY;
          if (!snapped) {
            snapped = true;
            gsap.set(wrapper, {x: e.clientX, y: e.clientY});
          } else {
            qx(e.clientX);
            qy(e.clientY);
          }
          updateTargetFromPoint();
        };

        const onScroll = () => {
          updateTargetFromPoint();
        };

        window.addEventListener('pointermove', onPointerMove, {passive: true});
        window.addEventListener('scroll', onScroll, {passive: true});
        cleanups.push(() => {
          if (pauseTimer) window.clearTimeout(pauseTimer);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('scroll', onScroll);
        });
      };

      // 6.11 Team photo parallax
      const initTeamParallax = () => {
        const teamSection = document.querySelector<HTMLElement>('#team');
        if (!teamSection) return;
        const photos = Array.from(teamSection.querySelectorAll<HTMLElement>('[data-parallax-speed]'));
        if (!photos.length) return;

        const mm = gsap.matchMedia();

        const setupParallax = (k: number) => {
          const distance = 320 * k;
          const tweens = photos.map((photo) => {
            const speed = Number(photo.dataset.parallaxSpeed ?? 1);
            return gsap.fromTo(
              photo,
              {y: distance * speed},
              {
                y: -distance * speed,
                ease: 'none',
                scrollTrigger: {
                  trigger: teamSection,
                  start: 'clamp(top bottom)',
                  end: 'clamp(bottom top)',
                  scrub: true,
                  invalidateOnRefresh: true,
                  refreshPriority: -1,
                },
              }
            );
          });
          return () => {
            tweens.forEach((tw: any) => {
              tw.scrollTrigger?.kill();
              tw.kill();
            });
          };
        };

        mm.add('(min-width: 992px) and (prefers-reduced-motion: no-preference)', () =>
          setupParallax(1)
        );
        mm.add(
          '(min-width: 480px) and (max-width: 991px) and (prefers-reduced-motion: no-preference)',
          () => setupParallax(0.5)
        );
        mm.add('(max-width: 479px) and (prefers-reduced-motion: no-preference)', () =>
          setupParallax(0.3)
        );

        cleanups.push(() => mm.revert());
      };

      // 6.12 Momentum hover (InertiaPlugin)
      const initMomentumHover = () => {
        if (!isFinePointer || reducedMotion) return;
        const teamSection = document.querySelector<HTMLElement>('#team');
        if (!teamSection) return;

        let curX = 0;
        let curY = 0;
        let prevX = 0;
        let prevY = 0;
        let vx = 0;
        let vy = 0;

        const onMove = (e: PointerEvent) => {
          curX = e.clientX;
          curY = e.clientY;
        };

        const onTick = () => {
          vx = curX - prevX;
          vy = curY - prevY;
          prevX = curX;
          prevY = curY;
        };

        teamSection.addEventListener('pointermove', onMove, {passive: true});
        gsap.ticker.add(onTick);

        const targets = Array.from(teamSection.querySelectorAll<HTMLElement>('[data-momentum]'));
        const clampVel = gsap.utils.clamp(-1080, 1080);
        const clampRot = gsap.utils.clamp(-60, 60);

        const enterHandlers = targets.map((target) => {
          const onEnter = (e: MouseEvent) => {
            const rect = target.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const F = e.clientX - cx;
            const R = e.clientY - cy;
            const dist = Math.hypot(F, R) || 1;
            const torque = (F * vy - R * vx) / dist;

            gsap.to(target, {
              inertia: {
                x: {velocity: clampVel(vx * 30), end: 0},
                y: {velocity: clampVel(vy * 30), end: 0},
                rotation: {velocity: clampRot(torque * 20), end: 0},
                resistance: 200,
              },
            });
          };
          target.addEventListener('mouseenter', onEnter);
          return () => target.removeEventListener('mouseenter', onEnter);
        });

        cleanups.push(() => {
          teamSection.removeEventListener('pointermove', onMove);
          gsap.ticker.remove(onTick);
          enterHandlers.forEach((fn) => fn());
        });
      };

      // 6.13 Page theme switch
      const initPageTheme = () => {
        const triggers: any[] = [];
        document.querySelectorAll<HTMLElement>('[data-page-theme]').forEach((el) => {
          const theme = el.dataset.pageTheme || 'dark';
          const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 45%',
            refreshPriority: -1,
            onToggle: (self: any) => {
              if (self.isActive) {
                document.documentElement.setAttribute('data-theme', theme);
              } else {
                document.documentElement.removeAttribute('data-theme');
              }
            },
          });
          triggers.push(st);
        });
        cleanups.push(() => {
          triggers.forEach((st) => st.kill());
          document.documentElement.removeAttribute('data-theme');
        });
      };

      const initPage = () => {
        initScrollReveal();
        initDrawLine();
        initFontWeightHover();
        initHeroCursorCard();
        initMarquee();
        initWorkStack();
        initCursorMarquee();
        initTeamParallax();
        initMomentumHover();
        initPageTheme();
        ScrollTrigger.refresh();
      };

      // 6.2 Load sequence
      const mainEl = document.querySelector<HTMLElement>('main');
      const wipeOverlay = document.querySelector<HTMLElement>('.load-wipe');
      const wipePath = wipeOverlay?.querySelector<SVGPathElement>('path');

      if (reducedMotion || !mainEl || !wipeOverlay || !wipePath) {
        revealImmediately();
        initPage();
        return;
      }

      const loadTl = gsap.timeline();
      gsap.set(mainEl, {autoAlpha: 0});
      gsap.set(wipePath, {drawSVG: '0% 100%', strokeWidth: '30%'});

      loadTl.addLabel('reveal', 0.4);
      loadTl.call(
        () => {
          gsap.set(mainEl, {autoAlpha: 1});
          runTextReveals(0.6);
          initPage();
        },
        undefined,
        'reveal'
      );
      loadTl.to(
        wipePath,
        {
          drawSVG: '100% 100%',
          strokeWidth: '5%',
          duration: 1.25,
          ease: 'power1.inOut',
          onComplete: () => {
            wipeOverlay.setAttribute('data-transition-ready', '');
          },
        },
        'reveal'
      );

      cleanups.push(() => {
        loadTl.kill();
      });
    };

    boot();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={rootRef} id="top">
      {/* 5.1 Load wipe */}
      <div className="load-wipe" aria-hidden="true">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d="M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001"
            fill="none"
            stroke="var(--tomato)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
          />
        </svg>
      </div>

      {/* 5.2 Cursor marquee label */}
      <div className="cursor-marquee" data-cursor-marquee-status="not-active" aria-hidden="true">
        <div className="cursor-marquee-card">
          <span className="cursor-marquee-copy">View case →</span>
          <span className="cursor-marquee-copy is-clone">View case →</span>
        </div>
      </div>

      {/* 5.3 Fixed navigation */}
      <header className="site-nav">
        <a href="#top" className="nav-logo">
          Kolibrie
        </a>

        <nav className="nav-pill" aria-label="Primary navigation">
          <a href="#team" className="nav-link">
            <span>About</span>
            <span className="nav-link-line" data-draw-line="hover" aria-hidden="true" />
          </a>
          <a href="#work" className="nav-link">
            <span>Work</span>
            <span className="nav-link-line" data-draw-line="hover" aria-hidden="true" />
          </a>
          <a href="#work" className="nav-link">
            <span>Services</span>
            <span className="nav-link-line" data-draw-line="hover" aria-hidden="true" />
          </a>
        </nav>

        <a href="#team" className="nav-contact">
          <span className="nav-dot" aria-hidden="true" />
          <span>Contact</span>
        </a>
      </header>

      <main>
        {/* 5.4 Hero */}
        <section className="hero-section" data-cursor-cards data-threshold="300">
          <video
            className="hero-video"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            poster={HERO_POSTER_URL}
          />

          <div className="hero-cursor-card" aria-hidden="true">
            <div className="hero-cursor-media">
              {HERO_CARDS.map((card, i) => (
                <div
                  key={card.crop}
                  className={`crop${i === 0 ? ' on' : ''}`}
                  data-crop={card.crop}
                  data-alt={card.alt}
                />
              ))}
            </div>
          </div>

          <div className="hero-content" data-text-reveal-group>
            <h1
              className="h-hero"
              data-text-reveal="chars"
              data-font-weight-hover
              data-fwh-rest="700"
              data-fwh-near="200"
              data-fwh-radius="400"
            >
              Stories that
              <br />
              get{' '}
              <span
                className="h-alt"
                data-font-weight-hover
                data-fwh-rest="300"
                data-fwh-near="800"
                data-fwh-radius="400"
              >
                shared
              </span>
            </h1>

            <a href="#work" className="hero-link" data-text-reveal="element">
              <span className="hero-link-text">
                See the reel
                <span className="hero-link-line" data-draw-line="always" aria-hidden="true" />
              </span>
              <span className="hero-link-arrow-box" aria-hidden="true">
                <span className="hero-link-arrow-track">
                  <span className="hero-link-arrow is-top">
                    <svg viewBox="0 0 14 13" fill="currentColor">
                      <path d="M12.94 5.7 9.95 8 6.9 10.37l.84 1.86V0h-2.55v12.23l.85-1.86L3 8 0 5.7V9.05l6.47 4.95 6.47-4.95z" />
                    </svg>
                  </span>
                  <span className="hero-link-arrow">
                    <svg viewBox="0 0 14 13" fill="currentColor">
                      <path d="M12.94 5.7 9.95 8 6.9 10.37l.84 1.86V0h-2.55v12.23l.85-1.86L3 8 0 5.7V9.05l6.47 4.95 6.47-4.95z" />
                    </svg>
                  </span>
                </span>
              </span>
            </a>
          </div>

          <div className="client-marquee" aria-hidden="true">
            <div className="marquee-scroll">
              <div className="marquee-collection">
                <ClientLogos />
              </div>
            </div>
          </div>
        </section>

        {/* 5.5 Latest drops */}
        <section id="work" className="work-section" data-featured-stack data-scroll-factor="1.2">
          <div className="work-pin">
            <div className="work-copy" data-scroll-reveal-group>
              <p className="eyebrow-s" data-scroll-reveal="lines">
                Made to be watched twice. A handful of what left our edit desk lately.
              </p>
              <h2
                className="h-section"
                data-scroll-reveal="chars"
                data-font-weight-hover
                data-fwh-rest="700"
                data-fwh-near="200"
                data-fwh-radius="400"
              >
                Latest{' '}
                <span
                  className="h-alt"
                  data-font-weight-hover
                  data-fwh-rest="300"
                  data-fwh-near="800"
                  data-fwh-radius="400"
                >
                  drops
                </span>
              </h2>
            </div>

            <div className="work-stage">
              <div className="work-stack-root">
                {WORK_CASES.map((item) => (
                  <a
                    key={item.title}
                    href="#work"
                    className="work-slide"
                    data-cursor-marquee-text="View case →"
                  >
                    <div className="work-card" style={{backgroundColor: item.color}}>
                      <div className="crop" data-crop={item.crop} data-alt={item.title} />
                      <div className="work-card-gradient" />
                      <div className="work-card-title">{item.title}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="work-badge" aria-hidden="true">
                <svg viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="badge-ring"
                      d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>
                  <circle cx="100" cy="100" r="98" fill="var(--tomato)" />
                  <text
                    fill="var(--cream)"
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontVariationSettings: '"wght" 800, "wdth" 80',
                      fontSize: '24px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <textPath href="#badge-ring" textLength="436" lengthAdjust="spacing">
                      SCROLL · SAVE · SHARE · REPEAT ·
                    </textPath>
                  </text>
                  <g
                    stroke="var(--cream)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <circle cx="100" cy="100" r="17" />
                    <line x1="100" y1="68" x2="100" y2="75" />
                    <line x1="100" y1="125" x2="100" y2="132" />
                    <line x1="68" y1="100" x2="75" y2="100" />
                    <line x1="125" y1="100" x2="132" y2="100" />
                    <line x1="77.4" y1="77.4" x2="82.3" y2="82.3" />
                    <line x1="117.7" y1="117.7" x2="122.6" y2="122.6" />
                    <line x1="122.6" y1="77.4" x2="117.7" y2="82.3" />
                    <line x1="82.3" y1="117.7" x2="77.4" y2="122.6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 5.6 Meet the flock */}
        <section id="team" className="team-section" data-page-theme="dark">
          <div className="team-sticky">
            <div className="team-title-wrap" data-scroll-reveal-group>
              <div className="team-stamp" data-momentum aria-hidden="true">
                <svg viewBox="0 0 220 128">
                  <ellipse
                    cx="110"
                    cy="64"
                    rx="104"
                    ry="58"
                    fill="var(--cream)"
                    stroke="var(--tomato)"
                    strokeWidth="10"
                  />
                  <text
                    x="110"
                    y="79"
                    textAnchor="middle"
                    fill="var(--tomato)"
                    transform="rotate(-8 110 64)"
                    style={{
                      fontFamily: "'Yellowtail', cursive",
                      fontSize: '54px',
                    }}
                  >
                    Kolibrie
                  </text>
                </svg>
              </div>

              <p className="eyebrow-m" data-scroll-reveal="lines">
                The people behind the frames
              </p>

              <h2
                className="h-section h-team"
                data-scroll-reveal="chars"
                data-font-weight-hover
                data-fwh-rest="700"
                data-fwh-near="200"
                data-fwh-radius="400"
              >
                <span
                  className="h-alt"
                  data-font-weight-hover
                  data-fwh-rest="300"
                  data-fwh-near="800"
                  data-fwh-radius="400"
                >
                  Meet
                </span>{' '}
                the{' '}
                <span
                  className="h-alt"
                  data-font-weight-hover
                  data-fwh-rest="300"
                  data-fwh-near="800"
                  data-fwh-radius="400"
                >
                  flock
                </span>
              </h2>

              <p className="p-body" data-scroll-reveal="lines">
                Twelve makers, one group chat. We shoot, cut and animate before the coffee goes cold.
              </p>
            </div>
          </div>

          <div className="team-photos">
            {TEAM_ITEMS.map((item) => {
              const sideClass = item.side === 'left' ? 'is-left' : 'is-right';
              const parityClass = item.sideOrder % 2 === 1 ? 'is-odd' : 'is-even';
              const posStyle: React.CSSProperties = {
                top: item.top,
                width: item.width,
                rotate: `${item.rotate}deg`,
                ['--m-top' as string]: item.mobileTop,
                ...(item.side === 'left' ? {left: item.offset} : {right: item.offset}),
              };

              return (
                <div
                  key={`${item.crop}-${item.sideOrder}-${item.side}`}
                  className={`team-photo ${sideClass} ${parityClass}`}
                  style={posStyle}
                  data-mobile-top={item.mobileTop}
                  data-parallax-speed={item.speed}
                >
                  <div className="team-photo-inner" data-momentum>
                    <div
                      className="crop"
                      data-crop={item.crop}
                      data-alt={item.sticker?.name || item.caption || 'Kolibrie team'}
                    />
                    {item.sticker && (
                      <span
                        className="team-sticker"
                        style={{
                          transform: `translateX(-50%) rotate(${item.sticker.rotate}deg)`,
                        }}
                      >
                        {item.sticker.name}
                      </span>
                    )}
                    {item.caption && <span className="team-caption">{item.caption}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
