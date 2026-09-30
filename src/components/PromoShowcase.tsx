import React from 'react';

export const PromoShowcase: React.FC<{ onTryIt?: () => void }> = ({ onTryIt }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4 px-4 text-center select-none">
      {/* 5 Fanned / Arced Cards Matching WhatsApp Image 1 & 2 */}
      <div className="relative w-full max-w-[340px] h-[110px] flex items-center justify-center mb-6">
        {/* Card 1: Red floral botanical poster (Rotated Left ~-14deg) */}
        <div
          className="absolute left-1 top-2 w-[72px] h-[72px] rounded-xl shadow-md overflow-hidden transform -rotate-14 hover:-rotate-10 transition-transform duration-300"
          style={{ background: 'linear-gradient(145deg, #e4917a 0%, #cf6b50 100%)' }}
        >
          <div className="w-full h-full p-1.5 flex flex-col justify-between">
            <span className="text-[7px] font-mono tracking-widest text-amber-100 uppercase opacity-80">
              ICON
            </span>
            <div className="flex justify-center items-center my-auto">
              <svg viewBox="0 0 36 36" className="w-9 h-9 fill-rose-900 drop-shadow-sm">
                <circle cx="18" cy="18" r="6" fill="#4a1515" />
                <path d="M18,8 C22,8 24,12 21,16 C19,13 17,13 18,8 Z" fill="#d9383a" opacity="0.9" />
                <path d="M26,18 C26,22 22,24 18,21 C21,19 21,17 26,18 Z" fill="#b92b27" opacity="0.95" />
                <path d="M18,28 C14,28 12,24 15,20 C17,23 19,23 18,28 Z" fill="#d9383a" opacity="0.9" />
                <path d="M10,18 C10,14 14,12 18,15 C15,17 15,19 10,18 Z" fill="#b92b27" opacity="0.95" />
              </svg>
            </div>
            <div className="h-1 w-4 bg-amber-100/40 rounded-full" />
          </div>
        </div>

        {/* Card 2: Smiling Woman Portrait (Rotated Left ~-6deg) */}
        <div
          className="absolute left-[54px] top-0 w-[74px] h-[74px] rounded-xl shadow-md overflow-hidden transform -rotate-6 z-10 hover:-rotate-2 transition-transform duration-300"
          style={{ background: '#cfd2d6' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#caced3" />
            {/* Soft background light */}
            <circle cx="50" cy="40" r="38" fill="#e2e5e9" />
            {/* Woman head & shoulders silhouette with warm colors */}
            <circle cx="50" cy="40" r="16" fill="#f5cfb3" />
            {/* Hair */}
            <path
              d="M32 40 C32 20 40 18 50 18 C60 18 68 20 68 40 C68 49 66 58 64 62 C59 58 60 48 60 42 C60 32 40 32 40 42 C40 48 41 58 36 62 C34 58 32 49 32 40 Z"
              fill="#2c2420"
            />
            {/* Smile & eyes */}
            <path d="M46 39 Q50 43 54 39" stroke="#92400e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="45" cy="36" r="1.5" fill="#2c2420" />
            <circle cx="55" cy="36" r="1.5" fill="#2c2420" />
            {/* White sweater / top */}
            <path
              d="M26 88 C26 68 36 60 50 60 C64 60 74 68 74 88 L26 88 Z"
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <path d="M42 60 Q50 68 58 60" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Card 3: 3D Isometric Room Miniature (Center, Level / 0deg) */}
        <div
          className="absolute left-[134px] -top-2 w-[76px] h-[76px] rounded-xl shadow-lg overflow-hidden transform rotate-0 z-20 hover:scale-105 transition-transform duration-300"
          style={{ background: 'linear-gradient(145deg, #a78bfa 0%, #8b5cf6 100%)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#9d85e8" />
            {/* Isometric room floor */}
            <polygon points="50,42 82,58 50,74 18,58" fill="#e9d5ff" />
            {/* Left wall */}
            <polygon points="18,58 50,42 50,22 18,38" fill="#c4b5fd" />
            {/* Right wall */}
            <polygon points="50,42 82,58 82,38 50,22" fill="#ddd6fe" />
            {/* Window on left wall */}
            <polygon points="26,38 42,30 42,40 26,48" fill="#fdf4ff" opacity="0.9" />
            <line x1="34" y1="34" x2="34" y2="44" stroke="#a855f7" strokeWidth="1" />
            <line x1="26" y1="43" x2="42" y2="35" stroke="#a855f7" strokeWidth="1" />
            {/* Sofa */}
            <polygon points="46,54 62,46 68,49 52,57" fill="#fef08a" />
            <polygon points="46,54 52,57 52,63 46,60" fill="#facc15" />
            {/* Little plant */}
            <circle cx="36" cy="52" r="3.5" fill="#22c55e" />
            <rect x="34.5" y="55" width="3" height="4" fill="#d97706" />
            {/* Coffee table */}
            <polygon points="48,62 58,57 64,60 54,65" fill="#f8fafc" />
          </svg>
        </div>

        {/* Card 4: White T-Shirt on Clothesline under Blue Sky (Rotated Right ~+7deg) */}
        <div
          className="absolute right-[54px] top-0 w-[74px] h-[74px] rounded-xl shadow-md overflow-hidden transform rotate-7 z-10 hover:rotate-3 transition-transform duration-300"
          style={{ background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#38bdf8" />
            {/* Fluffy clouds */}
            <ellipse cx="28" cy="82" rx="20" ry="12" fill="#ffffff" opacity="0.85" />
            <ellipse cx="70" cy="80" rx="24" ry="14" fill="#ffffff" opacity="0.9" />
            {/* Clothesline wire */}
            <line x1="6" y1="28" x2="94" y2="32" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Clothespins */}
            <rect x="36" y="27" width="3" height="6" fill="#f59e0b" rx="1" />
            <rect x="62" y="28" width="3" height="6" fill="#f59e0b" rx="1" />
            {/* White T-shirt hanging */}
            <path
              d="M32 32 L44 32 L46 36 L54 36 L56 32 L68 32 L74 42 L66 46 L62 40 L62 68 L38 68 L38 40 L34 46 L26 42 Z"
              fill="#ffffff"
              filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.18))"
            />
            {/* Graphic on tee */}
            <circle cx="50" cy="50" r="4.5" fill="#f43f5e" />
            <polygon points="48,47 54,50 48,53" fill="#ffffff" />
          </svg>
        </div>

        {/* Card 5: Cute Green Character Graphic (Rotated Right ~+15deg) */}
        <div
          className="absolute right-1 top-2 w-[72px] h-[72px] rounded-xl shadow-md overflow-hidden transform rotate-15 hover:rotate-11 transition-transform duration-300"
          style={{ background: 'linear-gradient(145deg, #6ee7b7 0%, #10b981 100%)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#6ee7b7" />
            {/* Cute planet / frog character */}
            <circle cx="50" cy="48" r="24" fill="#047857" />
            {/* Character eyes */}
            <ellipse cx="42" cy="44" rx="4" ry="5" fill="#ffffff" />
            <ellipse cx="58" cy="44" rx="4" ry="5" fill="#ffffff" />
            <circle cx="43" cy="44" r="2.2" fill="#022c22" />
            <circle cx="59" cy="44" r="2.2" fill="#022c22" />
            {/* Happy smile */}
            <path d="M46 53 Q50 58 54 53" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Ring around character */}
            <ellipse cx="50" cy="52" rx="34" ry="8" fill="none" stroke="#ecfdf5" strokeWidth="2.5" opacity="0.75" />
            {/* Sparkles */}
            <polygon points="26,20 28,24 32,26 28,28 26,32 24,28 20,26 24,24" fill="#ffffff" opacity="0.8" />
            <polygon points="76,68 77,71 80,72 77,73 76,76 75,73 72,72 75,71" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Editorial Title Matching Screenshot */}
      <h2 className="text-[22px] sm:text-[23px] font-serif-display font-medium text-neutral-900 tracking-tight leading-snug mb-2 max-w-[280px]">
        Image creation got a major upgrade
      </h2>

      {/* Subtitle */}
      <p className="text-[13px] text-neutral-500 font-normal leading-relaxed max-w-[260px] mb-4">
        Higher-quality results, faster generation, and smarter creative tools
      </p>

      {/* Black Try It Pill Button */}
      <button
        onClick={onTryIt}
        className="px-6 py-2 bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white text-[14px] font-medium rounded-full shadow-sm transition-all duration-150 cursor-pointer"
      >
        Try it
      </button>
    </div>
  );
};
