import React from 'react';

interface VerbIllustrationProps {
  type: string;
  emoji: string;
  className?: string;
}

export const VerbIllustration: React.FC<VerbIllustrationProps> = ({ type, emoji, className = '' }) => {
  // Render high-contrast, child-friendly vector illustrations tailored to each verb
  const renderGraphic = () => {
    switch (type) {
      case 'ear_listening':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#EEF2FF" />
            <circle cx="80" cy="80" r="46" fill="#C7D2FE" stroke="#6366F1" strokeWidth="4" />
            {/* Headphones */}
            <path d="M44 86C44 56 60 40 80 40C100 40 116 56 116 86" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" />
            <rect x="36" y="78" width="16" height="30" rx="8" fill="#4338CA" />
            <rect x="108" y="78" width="16" height="30" rx="8" fill="#4338CA" />
            {/* Sound waves */}
            <path d="M128 72C134 78 134 88 128 94" stroke="#818CF8" strokeWidth="4" strokeLinecap="round" />
            <path d="M136 66C146 76 146 94 136 104" stroke="#A5B4FC" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 72C26 78 26 88 32 94" stroke="#818CF8" strokeWidth="4" strokeLinecap="round" />
            {/* Happy note */}
            <path d="M72 75V95M86 70V90M72 75L86 70" stroke="#312E81" strokeWidth="4" strokeLinecap="round" />
            <circle cx="68" cy="95" r="5" fill="#312E81" />
            <circle cx="82" cy="90" r="5" fill="#312E81" />
          </svg>
        );

      case 'reading_book':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#ECFDF5" />
            {/* Child head */}
            <circle cx="80" cy="46" r="22" fill="#FDE68A" stroke="#F59E0B" strokeWidth="3" />
            <path d="M68 40C72 34 88 34 92 40" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
            <circle cx="73" cy="46" r="3" fill="#1F2937" />
            <circle cx="87" cy="46" r="3" fill="#1F2937" />
            <path d="M76 54C78 57 82 57 84 54" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
            {/* Open Book */}
            <path d="M32 108C46 102 66 102 80 110C94 102 114 102 128 108V72C114 66 94 66 80 74C66 66 46 66 32 72V108Z" fill="#10B981" stroke="#047857" strokeWidth="4" />
            <path d="M80 74V110" stroke="#047857" strokeWidth="4" />
            <path d="M42 82C52 78 64 78 72 82M42 92C52 88 64 88 72 92" stroke="#D1FAE5" strokeWidth="3" strokeLinecap="round" />
            <path d="M88 82C96 78 108 78 118 82M88 92C96 88 108 88 118 92" stroke="#D1FAE5" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'writing_pencil':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FFFBEB" />
            {/* Notebook page */}
            <rect x="42" y="38" width="76" height="96" rx="8" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="4" />
            <line x1="54" y1="58" x2="106" y2="58" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
            <line x1="54" y1="74" x2="106" y2="74" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
            <line x1="54" y1="90" x2="106" y2="90" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
            <line x1="54" y1="106" x2="86" y2="106" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
            {/* Written squiggle */}
            <path d="M54 74C64 70 70 78 80 74" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
            {/* Big pencil tilted */}
            <g transform="translate(100, 68) rotate(-45)">
              <rect x="-10" y="-30" width="20" height="50" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
              <rect x="-10" y="-40" width="20" height="10" rx="2" fill="#F472B6" />
              <polygon points="-10,20 10,20 0,36" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
              <polygon points="-3,30 3,30 0,36" fill="#1F2937" />
            </g>
          </svg>
        );

      case 'pizza_slice':
      case 'share_pizza':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FEF2F2" />
            {/* Pizza round tray */}
            <circle cx="80" cy="84" r="54" fill="#FBBF24" stroke="#B45309" strokeWidth="4" />
            <circle cx="80" cy="84" r="46" fill="#F59E0B" />
            {/* Slice pulled out */}
            <path d="M80 84L40 40C52 30 72 26 90 28L80 84Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
            {/* Pepperonis & Cheese */}
            <circle cx="68" cy="48" r="5" fill="#991B1B" />
            <circle cx="78" cy="38" r="4" fill="#991B1B" />
            <circle cx="86" cy="98" r="6" fill="#DC2626" />
            <circle cx="62" cy="86" r="6" fill="#DC2626" />
            <circle cx="98" cy="74" r="5" fill="#DC2626" />
            <circle cx="78" cy="112" r="5" fill="#DC2626" />
            {/* Cheese drips */}
            <path d="M60 58C62 68 70 70 74 76" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'kick_ball':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#EFF6FF" />
            {/* Motion lines */}
            <path d="M30 110C50 100 70 80 95 65" stroke="#93C5FD" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />
            {/* Shoe kicking */}
            <path d="M34 116C40 98 56 102 66 112L58 126C46 128 32 126 34 116Z" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
            <rect x="52" y="118" width="14" height="6" rx="2" fill="#FFFFFF" />
            {/* Soccer ball */}
            <circle cx="106" cy="56" r="28" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4" />
            <polygon points="106,44 116,52 112,64 100,64 96,52" fill="#1F2937" />
            <line x1="106" y1="44" x2="106" y2="30" stroke="#1F2937" strokeWidth="3" />
            <line x1="116" y1="52" x2="128" y2="46" stroke="#1F2937" strokeWidth="3" />
            <line x1="112" y1="64" x2="122" y2="76" stroke="#1F2937" strokeWidth="3" />
            <line x1="100" y1="64" x2="92" y2="78" stroke="#1F2937" strokeWidth="3" />
            <line x1="96" y1="52" x2="82" y2="48" stroke="#1F2937" strokeWidth="3" />
          </svg>
        );

      case 'bear_hug':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FFF1F2" />
            {/* Big Bear Body */}
            <circle cx="70" cy="90" r="38" fill="#92400E" />
            {/* Child being hugged */}
            <circle cx="94" cy="86" r="26" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
            {/* Bear ears */}
            <circle cx="46" cy="46" r="14" fill="#92400E" />
            <circle cx="46" cy="46" r="7" fill="#FDE68A" />
            <circle cx="82" cy="42" r="14" fill="#92400E" />
            <circle cx="82" cy="42" r="7" fill="#FDE68A" />
            {/* Bear head */}
            <circle cx="62" cy="62" r="26" fill="#B45309" />
            <circle cx="56" cy="58" r="3" fill="#1F2937" />
            <circle cx="72" cy="58" r="3" fill="#1F2937" />
            <ellipse cx="64" cy="68" rx="8" ry="6" fill="#FDE68A" />
            <circle cx="64" cy="66" r="3" fill="#1F2937" />
            {/* Hugging Arm wrapping around */}
            <path d="M44 86C44 106 100 114 112 92" stroke="#92400E" strokeWidth="16" strokeLinecap="round" />
            {/* Hearts */}
            <path d="M120 40C116 34 108 36 108 42C108 50 120 58 120 58C120 58 132 50 132 42C132 36 124 34 120 40Z" fill="#F43F5E" />
          </svg>
        );

      case 'build_lego':
      case 'fix_bike':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#F0FDF4" />
            {/* Blocks */}
            <rect x="36" y="96" width="44" height="28" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
            <circle cx="47" cy="92" r="4" fill="#1D4ED8" />
            <circle cx="69" cy="92" r="4" fill="#1D4ED8" />

            <rect x="80" y="96" width="44" height="28" rx="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
            <circle cx="91" cy="92" r="4" fill="#B91C1C" />
            <circle cx="113" cy="92" r="4" fill="#B91C1C" />

            <rect x="58" y="68" width="44" height="28" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
            <circle cx="69" cy="64" r="4" fill="#B45309" />
            <circle cx="91" cy="64" r="4" fill="#B45309" />

            {/* Hammer / tool */}
            <g transform="translate(104, 46) rotate(35)">
              <rect x="-4" y="0" width="8" height="42" rx="3" fill="#78350F" />
              <rect x="-14" y="-12" width="28" height="14" rx="3" fill="#64748B" stroke="#334155" strokeWidth="2" />
            </g>
          </svg>
        );

      case 'count_numbers':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FAF5FF" />
            {/* Giant colorful numbers 1 2 3 */}
            <text x="40" y="82" fontSize="52" fontWeight="bold" fill="#3B82F6" fontFamily="sans-serif">1</text>
            <text x="70" y="104" fontSize="56" fontWeight="bold" fill="#EC4899" fontFamily="sans-serif">2</text>
            <text x="104" y="88" fontSize="52" fontWeight="bold" fill="#10B981" fontFamily="sans-serif">3</text>
            <circle cx="48" cy="44" r="8" fill="#FBBF24" />
            <circle cx="116" cy="42" r="6" fill="#8B5CF6" />
            <circle cx="82" cy="124" r="5" fill="#F43F5E" />
          </svg>
        );

      case 'understand_bulb':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FEFCE8" />
            {/* Glowing rays */}
            <line x1="80" y1="20" x2="80" y2="32" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
            <line x1="38" y1="38" x2="48" y2="48" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
            <line x1="122" y1="38" x2="112" y2="48" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
            <line x1="22" y1="78" x2="34" y2="78" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
            <line x1="138" y1="78" x2="126" y2="78" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
            {/* Light bulb */}
            <path d="M80 40C62 40 50 54 50 72C50 84 58 94 66 102V114C66 116 68 118 70 118H90C92 118 94 116 94 114V102C102 94 110 84 110 72C110 54 98 40 80 40Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="4" />
            {/* Base & filament */}
            <line x1="72" y1="124" x2="88" y2="124" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            <path d="M72 74C74 66 86 66 88 74" stroke="#CA8A04" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'knee_hurt':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FFF7ED" />
            {/* Leg outline */}
            <path d="M50 40C64 64 66 90 62 120" stroke="#FDBA74" strokeWidth="24" strokeLinecap="round" />
            {/* Knee bandage (crossed) */}
            <rect x="58" y="74" width="34" height="14" rx="4" transform="rotate(-25 75 81)" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <rect x="58" y="74" width="34" height="14" rx="4" transform="rotate(25 75 81)" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
            {/* Pain bursts */}
            <path d="M102 54L108 60M118 72L126 72M106 90L114 96" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      case 'cat_feed':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FFFBEB" />
            {/* Cat head */}
            <circle cx="80" cy="74" r="32" fill="#FB923C" stroke="#C2410C" strokeWidth="4" />
            {/* Ears */}
            <polygon points="56,52 66,24 76,46" fill="#EA580C" stroke="#C2410C" strokeWidth="3" />
            <polygon points="104,52 94,24 84,46" fill="#EA580C" stroke="#C2410C" strokeWidth="3" />
            {/* Eyes */}
            <ellipse cx="68" cy="70" rx="5" ry="7" fill="#15803D" />
            <ellipse cx="92" cy="70" rx="5" ry="7" fill="#15803D" />
            {/* Nose & Whiskers */}
            <polygon points="76,82 84,82 80,87" fill="#F43F5E" />
            <line x1="50" y1="80" x2="68" y2="82" stroke="#78350F" strokeWidth="2" />
            <line x1="48" y1="88" x2="68" y2="86" stroke="#78350F" strokeWidth="2" />
            <line x1="110" y1="80" x2="92" y2="82" stroke="#78350F" strokeWidth="2" />
            <line x1="112" y1="88" x2="92" y2="86" stroke="#78350F" strokeWidth="2" />
            {/* Food Bowl */}
            <ellipse cx="80" cy="120" rx="28" ry="10" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
            <ellipse cx="80" cy="116" rx="22" ry="6" fill="#78350F" />
            {/* Fish on plate */}
            <path d="M72 116C78 112 84 118 90 116L94 112V120L90 116" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          </svg>
        );

      case 'bus_school':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FEF3C7" />
            {/* School Bus body */}
            <rect x="36" y="56" width="88" height="52" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
            {/* Windows */}
            <rect x="44" y="64" width="16" height="16" rx="2" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
            <rect x="66" y="64" width="16" height="16" rx="2" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
            <rect x="88" y="64" width="16" height="16" rx="2" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
            {/* Stripe */}
            <line x1="36" y1="90" x2="124" y2="90" stroke="#78350F" strokeWidth="4" />
            {/* Wheels */}
            <circle cx="56" cy="108" r="12" fill="#1F2937" stroke="#D1D5DB" strokeWidth="4" />
            <circle cx="104" cy="108" r="12" fill="#1F2937" stroke="#D1D5DB" strokeWidth="4" />
            {/* Exhaust puff */}
            <circle cx="28" cy="104" r="5" fill="#E5E7EB" />
            <circle cx="20" cy="100" r="7" fill="#E5E7EB" />
          </svg>
        );

      case 'pinocchio_lie':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            <circle cx="80" cy="80" r="70" fill="#FEF2F2" />
            {/* Pinocchio head & hat */}
            <polygon points="50,44 65,16 80,44" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
            <circle cx="65" cy="74" r="26" fill="#FED7AA" stroke="#EA580C" strokeWidth="3" />
            <circle cx="58" cy="70" r="3" fill="#1F2937" />
            <circle cx="68" cy="70" r="3" fill="#1F2937" />
            <path d="M58 84C62 88 68 88 72 84" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            {/* Extra Long Nose! */}
            <path d="M72 74L138 74" stroke="#FDBA74" strokeWidth="8" strokeLinecap="round" />
            <circle cx="138" cy="74" r="5" fill="#FB923C" />
            {/* Leaf sprouting from nose */}
            <path d="M120 74C120 64 128 66 128 66C128 66 126 74 120 74Z" fill="#22C55E" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100/60 rounded-2xl border-2 border-dashed border-amber-200 p-4">
            <span className="text-7xl filter drop-shadow select-none animate-bounce duration-1000">
              {emoji}
            </span>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center rounded-3xl bg-white shadow-md border-4 border-amber-200 overflow-hidden p-2 ${className}`}>
      {renderGraphic()}
      <div className="absolute top-2 right-2 bg-amber-100/90 text-amber-900 text-lg px-2.5 py-1 rounded-full font-bold shadow-xs">
        {emoji}
      </div>
    </div>
  );
};
