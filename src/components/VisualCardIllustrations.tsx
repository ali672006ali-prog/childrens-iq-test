import React from 'react';

interface ShapeProps {
  shapeKey: string;
  className?: string;
}

export const VisualIllustration: React.FC<ShapeProps> = ({ shapeKey, className = 'w-24 h-24' }) => {
  const stroke = '#0F172A';
  const fillSoft = '#E2E8F0';
  const fillWarm = '#F1F5F9';
  const accent = '#0F4C81';

  const renderShape = () => {
    switch (shapeKey) {
      // --- Geometric & Flags ---
      case 'square':
      case 'closed_square':
        return <rect x="26" y="26" width="68" height="68" rx="2" fill={fillWarm} stroke={stroke} strokeWidth="3.2" />;
      case 'circle':
        return <circle cx="60" cy="60" r="35" fill={fillWarm} stroke={stroke} strokeWidth="3.2" />;
      case 'diamond':
        return <polygon points="60,20 100,60 60,100 20,60" fill={fillWarm} stroke={stroke} strokeWidth="3.2" />;
      case 'open_oval':
        return <path d="M52 24 A38 28 0 1 0 68 24" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />;
      case 'open_circle':
        return <path d="M50 26 A34 34 0 1 0 70 26" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />;
      case 'open_diamond':
        return <polyline points="52,26 22,60 60,96 98,60 68,26" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />;
      case 'circle_tabs':
        return (
          <g>
            <rect x="52" y="18" width="16" height="12" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="52" y="90" width="16" height="12" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <circle cx="60" cy="60" r="30" fill={fillWarm} stroke={stroke} strokeWidth="3" />
          </g>
        );
      case 'oval_tabs_sm':
        return (
          <g>
            <rect x="52" y="20" width="16" height="12" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="52" y="88" width="16" height="12" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <ellipse cx="60" cy="60" rx="36" ry="28" fill={fillWarm} stroke={stroke} strokeWidth="3" />
          </g>
        );
      case 'oval_tabs_lg':
        return (
          <g>
            <rect x="52" y="14" width="16" height="12" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="52" y="94" width="16" height="12" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <ellipse cx="60" cy="60" rx="44" ry="34" fill={fillWarm} stroke={stroke} strokeWidth="3" />
          </g>
        );
      case 'circle_bar':
        return (
          <g>
            <circle cx="60" cy="60" r="32" fill={fillWarm} stroke={stroke} strokeWidth="3" />
            <rect x="53" y="16" width="14" height="88" fill="#FFFFFF" stroke={stroke} strokeWidth="3" />
          </g>
        );
      case 'star':
        return (
          <polygon
            points="60,16 71,44 101,45 77,63 86,93 60,76 34,93 43,63 19,45 49,44"
            fill={fillWarm}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        );
      case 'wheel':
        return (
          <g>
            <circle cx="60" cy="60" r="36" fill="none" stroke={stroke} strokeWidth="5.5" />
            <circle cx="60" cy="60" r="7" fill={stroke} />
            {[0, 45, 90, 135].map((deg) => (
              <line
                key={deg}
                x1="60"
                y1="24"
                x2="60"
                y2="96"
                stroke={stroke}
                strokeWidth="2.4"
                transform={`rotate(${deg} 60 60)`}
              />
            ))}
          </g>
        );
      case 'cross_circle':
        return (
          <g>
            <circle cx="60" cy="60" r="35" fill={fillWarm} stroke={stroke} strokeWidth="3" />
            <line x1="60" y1="25" x2="60" y2="95" stroke={stroke} strokeWidth="2.6" />
            <line x1="25" y1="60" x2="95" y2="60" stroke={stroke} strokeWidth="2.6" />
          </g>
        );
      case 'soccer_ball':
        return (
          <g>
            <circle cx="60" cy="60" r="35" fill="#FFFFFF" stroke={stroke} strokeWidth="3" />
            <polygon points="60,44 74,54 68,70 52,70 46,54" fill={stroke} />
            <path d="M60 44 L60 25 M74 54 L92 48 M68 70 L82 87 M52 70 L38 87 M46 54 L28 48" stroke={stroke} strokeWidth="2.4" />
            <polygon points="60,25 49,29 71,29" fill={stroke} />
            <polygon points="92,48 93,60 85,52" fill={stroke} />
            <polygon points="28,48 27,60 35,52" fill={stroke} />
          </g>
        );
      case 'flag_normal':
        return (
          <g>
            <line x1="30" y1="20" x2="30" y2="104" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <rect x="30" y="24" width="66" height="16" fill={stroke} stroke={stroke} strokeWidth="2" />
            <rect x="30" y="40" width="66" height="16" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
            <rect x="30" y="56" width="66" height="16" fill="#CBD5E1" stroke={stroke} strokeWidth="2" />
            <path d="M36 56 L48 72 M48 56 L60 72 M60 56 L72 72 M72 56 L84 72 M84 56 L96 72" stroke={stroke} strokeWidth="1.6" />
          </g>
        );
      case 'flag_reversed':
        return (
          <g>
            <line x1="30" y1="20" x2="30" y2="104" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <rect x="30" y="24" width="66" height="16" fill="#CBD5E1" stroke={stroke} strokeWidth="2" />
            <path d="M36 24 L48 40 M48 24 L60 40 M60 24 L72 40 M72 24 L84 40 M84 24 L96 40" stroke={stroke} strokeWidth="1.6" />
            <rect x="30" y="40" width="66" height="16" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
            <rect x="30" y="56" width="66" height="16" fill={stroke} stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'sunburst':
        return (
          <polygon
            points="60,16 66,27 78,20 79,33 92,31 87,43 100,48 91,57 100,67 88,72 93,84 80,84 79,97 67,91 60,103 53,91 41,97 40,84 27,84 32,72 20,67 29,57 20,48 33,43 28,31 41,33 42,20 54,27"
            fill="#FEF3C7"
            stroke={stroke}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        );
      case 'tree':
        return (
          <g>
            <path d="M54 74 L52 104 L68 104 L66 74 Z" fill="#E2E8F0" stroke={stroke} strokeWidth="2.6" />
            <path
              d="M60 18 C44 18 36 28 38 38 C26 42 24 58 34 66 C32 76 46 82 60 76 C74 82 88 76 86 66 C96 58 94 42 82 38 C84 28 76 18 60 18 Z"
              fill="#ECFDF5"
              stroke={stroke}
              strokeWidth="2.8"
            />
            <path d="M52 44 Q60 38 68 44 M46 58 Q54 52 60 58" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      // --- Animals & Birds ---
      case 'elephant':
        return (
          <g>
            <path d="M36 52 C24 52 20 68 28 84 L36 84 L38 72 L52 72 L52 84 L62 84 L62 70 L78 70 L78 84 L88 84 L88 56 C88 38 74 30 56 30 C44 30 36 38 36 52 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M36 46 C22 44 18 62 18 72 C18 78 24 78 26 72 C26 65 28 58 36 56" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
            <path d="M46 36 C56 36 62 46 56 56 C52 62 44 58 46 46 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.4" />
            <circle cx="38" cy="44" r="2.2" fill={stroke} />
            <path d="M88 52 L96 62" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'hen':
        return (
          <g>
            <path d="M30 66 C28 48 44 42 58 46 C64 36 72 28 78 30 C82 32 82 40 78 46 C86 52 84 68 72 74 L42 74 C34 74 30 70 30 66 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <polygon points="81,34 90,37 81,41" fill="#FDE68A" stroke={stroke} strokeWidth="2" />
            <path d="M71 29 Q74 21 78 26 Q81 22 80 30" fill="#FECACA" stroke={stroke} strokeWidth="2" />
            <path d="M44 54 Q58 52 62 64 Q48 66 44 54 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
            <path d="M52 74 L52 90 M46 90 L58 90 M66 74 L66 90 M60 90 L72 90" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="76" cy="36" r="2" fill={stroke} />
          </g>
        );
      case 'rooster':
        return (
          <g>
            <path d="M40 66 C40 50 54 44 68 48 C74 36 80 30 86 32 C90 34 88 42 84 48 C90 56 84 72 72 74 L46 74 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M40 58 C24 44 16 56 26 68 C18 66 18 76 32 74 C26 82 38 84 44 74" fill={fillSoft} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M74 31 C74 20 82 20 84 26 C88 20 92 26 86 33" fill="#FCA5A5" stroke={stroke} strokeWidth="2.2" />
            <polygon points="87,36 96,39 87,43" fill="#FDE68A" stroke={stroke} strokeWidth="2" />
            <path d="M56 74 L56 92 M50 92 L62 92 M68 74 L68 92 M62 92 L74 92" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="82" cy="37" r="2" fill={stroke} />
          </g>
        );
      case 'cat_bowtie':
        return (
          <g>
            <ellipse cx="64" cy="70" rx="22" ry="18" fill={stroke} />
            <circle cx="48" cy="48" r="16" fill={stroke} />
            <polygon points="35,38 38,22 48,34" fill={stroke} />
            <polygon points="50,34 60,22 62,38" fill={stroke} />
            <circle cx="43" cy="46" r="3" fill="#FFFFFF" />
            <circle cx="54" cy="46" r="3" fill="#FFFFFF" />
            <circle cx="43" cy="46" r="1.4" fill={stroke} />
            <circle cx="54" cy="46" r="1.4" fill={stroke} />
            <polygon points="44,61 54,66 44,71" fill="#FFFFFF" stroke={stroke} strokeWidth="1.5" />
            <polygon points="62,61 52,66 62,71" fill="#FFFFFF" stroke={stroke} strokeWidth="1.5" />
            <path d="M84 68 C96 58 96 42 88 40" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
            <path d="M32 50 L20 48 M32 53 L20 55 M62 50 L74 48 M62 53 L74 55" stroke={stroke} strokeWidth="1.8" />
          </g>
        );
      case 'teddy_bear':
        return (
          <g>
            <circle cx="40" cy="30" r="8" fill={stroke} />
            <circle cx="80" cy="30" r="8" fill={stroke} />
            <circle cx="60" cy="42" r="18" fill={stroke} />
            <ellipse cx="60" cy="76" rx="22" ry="20" fill={stroke} />
            <ellipse cx="60" cy="76" rx="12" ry="12" fill="#FFFFFF" />
            <ellipse cx="36" cy="68" rx="7" ry="12" transform="rotate(24 36 68)" fill={stroke} />
            <ellipse cx="84" cy="68" rx="7" ry="12" transform="rotate(-24 84 68)" fill={stroke} />
            <circle cx="54" cy="38" r="2.6" fill="#FFFFFF" />
            <circle cx="66" cy="38" r="2.6" fill="#FFFFFF" />
            <ellipse cx="60" cy="46" rx="7" ry="5" fill="#FFFFFF" />
            <circle cx="60" cy="44" r="2" fill={stroke} />
          </g>
        );
      case 'bird':
        return (
          <g>
            <path d="M32 66 C34 48 52 36 70 36 C78 36 84 42 84 50 C84 64 68 74 50 74 L24 86 L32 66 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <polygon points="84,42 96,45 84,49" fill="#FDE68A" stroke={stroke} strokeWidth="2" />
            <circle cx="75" cy="43" r="2.2" fill={stroke} />
            <path d="M44 58 Q58 50 66 60" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M52 74 L48 92 M42 92 L54 92 M64 72 L62 92 M56 92 L68 92" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'turtle':
        return (
          <g>
            <path d="M32 68 C32 42 84 42 84 68 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <path d="M44 68 L44 50 M58 68 L58 46 M72 68 L72 50 M36 58 L80 58" stroke={stroke} strokeWidth="2" />
            <path d="M84 62 C94 56 102 60 100 68 C98 74 88 74 82 70" fill="#DCFCE7" stroke={stroke} strokeWidth="2.6" />
            <circle cx="94" cy="63" r="2" fill={stroke} />
            <rect x="38" y="68" width="10" height="14" rx="4" fill="#DCFCE7" stroke={stroke} strokeWidth="2.4" />
            <rect x="68" y="68" width="10" height="14" rx="4" fill="#DCFCE7" stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'butterfly':
        return (
          <g>
            <path d="M58 54 C38 22 18 30 24 52 C28 62 44 62 58 58" fill="#FEF3C7" stroke={stroke} strokeWidth="2.6" />
            <path d="M62 54 C82 22 102 30 96 52 C92 62 76 62 62 58" fill="#FEF3C7" stroke={stroke} strokeWidth="2.6" />
            <path d="M58 62 C36 62 24 82 36 92 C48 98 58 82 58 66" fill="#FDE68A" stroke={stroke} strokeWidth="2.6" />
            <path d="M62 62 C84 62 96 82 84 92 C72 98 62 82 62 66" fill="#FDE68A" stroke={stroke} strokeWidth="2.6" />
            <ellipse cx="60" cy="62" rx="4" ry="18" fill={stroke} />
            <path d="M58 44 Q50 30 44 30 M62 44 Q70 30 76 30" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'dog_lying':
        return (
          <g>
            <path d="M26 72 C24 54 44 50 64 54 C74 42 88 42 94 52 C98 60 94 72 84 74 L84 84 L74 84 L74 74 L40 74 L40 84 L28 84 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M76 50 C70 50 68 62 74 64 C78 64 80 56 76 50 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
            <circle cx="88" cy="54" r="2.2" fill={stroke} />
            <circle cx="95" cy="58" r="2.6" fill={stroke} />
            <path d="M26 62 C18 52 18 42 26 38" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
          </g>
        );
      case 'dog_standing':
        return (
          <g>
            <path d="M32 58 C30 48 48 48 64 48 C68 34 80 30 90 36 C96 40 96 50 88 54 L82 56 L82 84 L74 84 L74 66 L44 66 L44 84 L36 84 L36 62 L24 54" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <ellipse cx="76" cy="44" rx="5" ry="9" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
            <circle cx="87" cy="42" r="2" fill={stroke} />
            <circle cx="94" cy="46" r="2.5" fill={stroke} />
          </g>
        );
      case 'fish_long':
        return (
          <g>
            <path d="M26 60 C44 40 78 40 98 60 C78 80 44 80 26 60 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <polygon points="26,60 12,46 16,60 12,74" fill={fillSoft} stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M52 45 L62 34 L68 46" fill={fillSoft} stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
            <circle cx="84" cy="56" r="2.6" fill={stroke} />
            <path d="M74 52 Q70 60 74 68" fill="none" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'fish_chubby':
        return (
          <g>
            <path d="M32 60 C44 32 76 32 94 60 C76 88 44 88 32 60 Z" fill="#E0F2FE" stroke={stroke} strokeWidth="2.8" />
            <polygon points="32,60 14,42 18,60 14,78" fill={fillSoft} stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M50 38 L58 26 L70 39" fill={fillSoft} stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M54 81 L60 92 L68 81" fill={fillSoft} stroke={stroke} strokeWidth="2.4" />
            <circle cx="80" cy="54" r="3" fill={stroke} />
            <path d="M72 48 Q66 60 72 72" fill="none" stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'cat_sitting':
        return (
          <g>
            <ellipse cx="56" cy="70" rx="20" ry="18" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <circle cx="62" cy="40" r="16" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <polygon points="48,30 48,16 58,25" fill={fillSoft} stroke={stroke} strokeWidth="2.5" />
            <polygon points="66,25 76,16 76,30" fill={fillSoft} stroke={stroke} strokeWidth="2.5" />
            <circle cx="57" cy="38" r="2" fill={stroke} />
            <circle cx="67" cy="38" r="2" fill={stroke} />
            <path d="M60 44 L64 44 L62 46 Z" fill={stroke} />
            <path d="M36 74 C22 72 22 48 34 46" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
            <path d="M44 42 L34 40 M44 45 L34 46 M80 42 L90 40 M80 45 L90 46" stroke={stroke} strokeWidth="1.8" />
          </g>
        );
      case 'sheep':
        return (
          <g>
            <path d="M34 52 C26 42 38 32 48 36 C56 28 72 30 76 40 C86 42 88 56 80 64 C78 72 64 72 56 68 C46 72 32 68 34 52 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <ellipse cx="86" cy="48" rx="11" ry="8" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <ellipse cx="82" cy="40" rx="5" ry="3" transform="rotate(-25 82 40)" fill={fillSoft} stroke={stroke} strokeWidth="2" />
            <circle cx="90" cy="46" r="2" fill={stroke} />
            <path d="M42 68 L42 88 M52 68 L52 88 M68 68 L68 88 M76 68 L76 88" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'goose':
        return (
          <g>
            <path d="M32 68 C32 54 50 50 66 56 L72 34 C74 26 84 26 84 34 C84 40 78 44 76 58 C74 72 56 76 40 74 L24 72 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <polygon points="84,30 96,33 84,36" fill="#FDE68A" stroke={stroke} strokeWidth="2" />
            <circle cx="79" cy="32" r="2" fill={stroke} />
            <path d="M50 74 L48 90 M42 90 L54 90 M60 74 L60 90 M54 90 L66 90" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'chick_small':
        return (
          <g transform="translate(14,14) scale(0.75)">
            <circle cx="62" cy="44" r="14" fill="#FEF3C7" stroke={stroke} strokeWidth="3" />
            <ellipse cx="52" cy="68" rx="20" ry="16" fill="#FEF3C7" stroke={stroke} strokeWidth="3" />
            <polygon points="75,42 85,45 75,49" fill="#F59E0B" stroke={stroke} strokeWidth="2" />
            <circle cx="66" cy="41" r="2.2" fill={stroke} />
            <path d="M48 84 L48 96 M58 84 L58 96" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
          </g>
        );
      case 'chick_large':
        return (
          <g>
            <circle cx="64" cy="36" r="16" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" />
            <ellipse cx="52" cy="64" rx="24" ry="20" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" />
            <polygon points="79,34 91,38 79,42" fill="#F59E0B" stroke={stroke} strokeWidth="2" />
            <circle cx="68" cy="33" r="2.4" fill={stroke} />
            <path d="M44 58 Q56 52 62 66" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M46 84 L46 98 M38 98 L54 98 M60 84 L60 98 M52 98 L68 98" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        );
      case 'ducks_pair':
        return (
          <g>
            <circle cx="44" cy="44" r="12" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <path d="M32 62 C32 54 56 54 56 68 L56 84 L32 84 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <circle cx="76" cy="44" r="12" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <path d="M64 62 C64 54 88 54 88 68 L88 84 L64 84 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <path d="M30 34 Q44 22 58 34" fill="none" stroke={stroke} strokeWidth="2.4" />
            <path d="M62 34 Q76 22 90 34" fill="none" stroke={stroke} strokeWidth="2.4" />
            <circle cx="40" cy="43" r="1.8" fill={stroke} />
            <circle cx="48" cy="43" r="1.8" fill={stroke} />
            <circle cx="72" cy="43" r="1.8" fill={stroke} />
            <circle cx="80" cy="43" r="1.8" fill={stroke} />
          </g>
        );
      case 'palm_small':
        return (
          <g transform="translate(15,18) scale(0.75)">
            <path d="M56 102 Q58 72 62 46" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
            <path d="M62 46 C42 30 28 38 24 46 M62 46 C44 20 62 16 68 24 M62 46 C82 22 96 34 94 46 M62 46 C82 46 88 60 80 68 M62 46 C42 50 34 62 42 70" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
          </g>
        );
      case 'palm_large':
        return (
          <g>
            <path d="M54 106 Q56 70 62 40" fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round" />
            <path d="M62 40 C36 22 20 32 16 44 M62 40 C40 12 64 8 72 20 M62 40 C86 14 104 28 102 44 M62 40 C88 42 96 58 86 68 M62 40 C36 46 26 60 36 72" fill="none" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" />
          </g>
        );

      // --- Flowers & Pots & Fruit ---
      case 'flower_simple':
      case 'flower_daisy':
      case 'flower_tulip':
        return (
          <g>
            <path d="M60 60 L60 102" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <path d="M60 84 Q42 78 40 68 Q54 70 60 84" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
            <path d="M60 88 Q78 82 80 72 Q66 74 60 88" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse
                key={deg}
                cx="60"
                cy="34"
                rx="8"
                ry="14"
                fill={shapeKey === 'flower_tulip' ? '#E0F2FE' : '#FEF3C7'}
                stroke={stroke}
                strokeWidth="2.4"
                transform={`rotate(${deg} 60 50)`}
              />
            ))}
            <circle cx="60" cy="50" r="8" fill="#F59E0B" stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'pot_upright_1':
      case 'pot_upright_2':
      case 'pot_upright_3':
      case 'pot_single_daisy':
        return (
          <g>
            <polygon points="40,74 80,74 74,104 46,104" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="36" y="68" width="48" height="8" rx="2" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <line x1="60" y1="68" x2="60" y2="38" stroke={stroke} strokeWidth="2.8" />
            <path d="M60 56 Q44 50 42 42 Q54 44 60 56" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse key={deg} cx="60" cy="24" rx="6" ry="10" fill="#FEF3C7" stroke={stroke} strokeWidth="2" transform={`rotate(${deg} 60 36)`} />
            ))}
            <circle cx="60" cy="36" r="6" fill="#F59E0B" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'pot_wilted':
        return (
          <g>
            <polygon points="40,74 80,74 74,104 46,104" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="36" y="68" width="48" height="8" rx="2" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <path d="M60 68 C58 44 68 24 84 34 C90 38 86 52 78 58" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
            <path d="M78 58 C72 64 66 56 72 48 C78 44 86 50 78 58 Z" fill="#FECACA" stroke={stroke} strokeWidth="2.2" />
            <path d="M58 50 Q46 56 44 48" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );
      case 'pot_drooping_buds':
        return (
          <g>
            <polygon points="40,74 80,74 74,104 46,104" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="36" y="68" width="48" height="8" rx="2" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <path d="M56 68 L52 38 M64 68 L68 38 M60 68 C74 52 84 52 86 64" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <ellipse cx="52" cy="32" rx="5" ry="9" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
            <ellipse cx="68" cy="32" rx="5" ry="9" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
            <ellipse cx="86" cy="70" rx="6" ry="9" fill="#FEF3C7" stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'pot_mixed_daisy':
        return (
          <g>
            <polygon points="40,74 80,74 74,104 46,104" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="36" y="68" width="48" height="8" rx="2" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <path d="M54 68 L50 38 M66 68 L70 38 M60 68 L82 48" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <ellipse cx="50" cy="32" rx="5" ry="9" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
            <ellipse cx="70" cy="32" rx="5" ry="9" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse key={deg} cx="84" cy="36" rx="4" ry="7" fill="#FEF3C7" stroke={stroke} strokeWidth="1.8" transform={`rotate(${deg} 84 44)`} />
            ))}
            <circle cx="84" cy="44" r="4.5" fill="#F59E0B" stroke={stroke} strokeWidth="1.8" />
          </g>
        );
      case 'apple':
        return (
          <g>
            <path d="M60 36 C42 28 24 44 28 68 C32 90 48 96 60 92 C72 96 88 90 92 68 C96 44 78 28 60 36 Z" fill="#FEE2E2" stroke={stroke} strokeWidth="2.8" />
            <path d="M60 36 Q62 22 70 20" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
            <path d="M62 28 Q78 22 80 32 Q68 36 62 28 Z" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'tomato':
        return (
          <g>
            <circle cx="60" cy="64" r="30" fill="#FEE2E2" stroke={stroke} strokeWidth="2.8" />
            <path d="M60 34 L50 26 L56 36 L44 38 L56 42 L60 50 L64 42 L76 38 L64 36 L70 26 Z" fill="#DCFCE7" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
          </g>
        );
      case 'pomegranate':
        return (
          <g>
            <path d="M60 28 C38 30 28 48 30 68 C32 88 46 96 60 96 C74 96 88 88 90 68 C92 48 82 30 60 28 Z" fill="#FEE2E2" stroke={stroke} strokeWidth="2.8" />
            <polygon points="50,28 54,18 60,24 66,18 70,28" fill="#FEE2E2" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M40 58 Q60 72 80 58 Q60 80 40 58 Z" fill="#FECACA" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'grapes':
        return (
          <g>
            <path d="M60 20 L60 34 M60 26 Q74 20 76 30" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
            {[
              [48, 42], [60, 42], [72, 42],
              [44, 54], [56, 54], [68, 54], [78, 54],
              [48, 66], [60, 66], [72, 66],
              [54, 78], [66, 78],
              [60, 90],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="7" fill="#E0E7FF" stroke={stroke} strokeWidth="2.2" />
            ))}
          </g>
        );
      case 'banana':
        return (
          <g>
            <path d="M30 78 C46 92 84 80 94 34 L88 26 C78 60 50 72 34 66 Z" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M38 72 Q68 74 86 42" fill="none" stroke={stroke} strokeWidth="2" />
          </g>
        );

      // --- People, Faces & Body Parts ---
      case 'man_face_old':
      case 'old_man_head':
        return (
          <g>
            <circle cx="60" cy="60" r="30" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <circle cx="48" cy="54" r="7" fill="#FFFFFF" stroke={stroke} strokeWidth="2.2" />
            <circle cx="72" cy="54" r="7" fill="#FFFFFF" stroke={stroke} strokeWidth="2.2" />
            <line x1="55" y1="54" x2="65" y2="54" stroke={stroke} strokeWidth="2.2" />
            <circle cx="48" cy="54" r="2" fill={stroke} />
            <circle cx="72" cy="54" r="2" fill={stroke} />
            <path d="M46 72 Q60 66 74 72" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
            <path d="M34 46 Q42 36 52 38 M68 38 Q78 36 86 46" fill="none" stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'boy_listening':
      case 'boy_smiling':
        return (
          <g>
            <circle cx="60" cy="62" r="28" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <path d="M32 56 C32 34 46 28 60 28 C74 28 88 34 88 56 C80 42 68 40 60 40 C52 40 40 42 32 56 Z" fill={stroke} />
            <circle cx="49" cy="58" r="2.6" fill={stroke} />
            <circle cx="71" cy="58" r="2.6" fill={stroke} />
            <path d="M49 72 Q60 82 71 72" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        );
      case 'boy_frowning':
        return (
          <g>
            <circle cx="60" cy="62" r="28" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <path d="M32 56 C32 34 46 28 60 28 C74 28 88 34 88 56 C80 42 68 40 60 40 C52 40 40 42 32 56 Z" fill={stroke} />
            <line x1="42" y1="50" x2="54" y2="54" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="78" y1="50" x2="66" y2="54" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="49" cy="58" r="2.6" fill={stroke} />
            <circle cx="71" cy="58" r="2.6" fill={stroke} />
            <path d="M49 78 Q60 68 71 78" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        );
      case 'girl_face_plain':
      case 'girl_face_dots':
      case 'girl_bob':
      case 'girl_curls':
      case 'woman_head':
        return (
          <g>
            <path d="M28 62 C28 34 44 26 60 26 C76 26 92 34 92 62 C92 78 82 86 76 86 L44 86 C38 86 28 78 28 62 Z" fill={stroke} />
            <circle cx="60" cy="60" r="24" fill="#FFFFFF" stroke={stroke} strokeWidth="2.6" />
            <path d="M38 50 Q60 36 82 50" fill={stroke} />
            <circle cx="51" cy="58" r="2.4" fill={stroke} />
            <circle cx="69" cy="58" r="2.4" fill={stroke} />
            <path d="M52 70 Q60 76 68 70" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            {shapeKey === 'girl_face_dots' && (
              <g fill={stroke}>
                <circle cx="42" cy="92" r="2" />
                <circle cx="60" cy="94" r="2" />
                <circle cx="78" cy="92" r="2" />
              </g>
            )}
          </g>
        );
      case 'girl_side':
        return (
          <g>
            <path d="M36 60 C36 34 52 26 68 28 C82 30 90 48 86 78 L46 82 C38 78 36 68 36 60 Z" fill={stroke} />
            <path d="M44 46 C36 52 34 62 38 70 C42 78 52 80 60 76" fill="#FFFFFF" stroke={stroke} strokeWidth="2.6" />
            <circle cx="44" cy="56" r="2.2" fill={stroke} />
            <path d="M38 66 L44 66" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'boy_cap':
        return (
          <g>
            <circle cx="60" cy="64" r="24" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <path d="M36 54 C36 34 50 26 64 26 C78 26 86 36 86 52 Z" fill={accent} stroke={stroke} strokeWidth="2.6" />
            <path d="M34 52 L18 56 L36 58 Z" fill={stroke} />
            <circle cx="50" cy="64" r="2.4" fill={stroke} />
            <circle cx="68" cy="64" r="2.4" fill={stroke} />
            <path d="M50 76 Q58 80 66 76" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'puppet_clown':
        return (
          <g>
            <path d="M36 86 L42 62 C36 54 36 40 46 34 C56 28 74 30 82 42 C90 54 84 68 72 72 L78 86 Z" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <circle cx="68" cy="44" r="4" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
            <circle cx="68" cy="44" r="1.5" fill={stroke} />
            <path d="M54 58 Q68 62 82 54" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        );
      case 'clown_hat':
        return (
          <g>
            <polygon points="38,44 60,14 82,44" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <line x1="46" y1="34" x2="74" y2="34" stroke={stroke} strokeWidth="2.2" />
            <circle cx="60" cy="14" r="4" fill={stroke} />
            <circle cx="60" cy="68" r="24" fill="#FFFFFF" stroke={stroke} strokeWidth="2.8" />
            <circle cx="52" cy="64" r="2.4" fill={stroke} />
            <circle cx="68" cy="64" r="2.4" fill={stroke} />
            <circle cx="60" cy="70" r="4.5" fill="#FCA5A5" stroke={stroke} strokeWidth="2" />
            <path d="M48 78 Q60 86 72 78" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'man_fez':
        return (
          <g>
            <polygon points="40,42 44,18 76,18 80,42" fill="#DC2626" stroke={stroke} strokeWidth="2.6" />
            <line x1="74" y1="22" x2="82" y2="38" stroke={stroke} strokeWidth="2.4" />
            <circle cx="60" cy="66" r="24" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <circle cx="51" cy="62" r="2.4" fill={stroke} />
            <circle cx="69" cy="62" r="2.4" fill={stroke} />
            <path d="M52 76 L68 76" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'man_cap_left':
      case 'man_cap_right':
        return (
          <g>
            <path d="M36 46 C36 28 84 28 84 46 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <circle cx="60" cy="66" r="24" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <circle cx="51" cy="62" r="2.4" fill={stroke} />
            <circle cx="69" cy="62" r="2.4" fill={stroke} />
            <path d="M52 76 Q60 79 68 76" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'man_bald':
        return (
          <g>
            <circle cx="60" cy="60" r="26" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <path d="M36 52 Q42 42 46 46 M74 46 Q78 42 84 52" fill="none" stroke={stroke} strokeWidth="2" />
            <circle cx="51" cy="58" r="2.4" fill={stroke} />
            <circle cx="69" cy="58" r="2.4" fill={stroke} />
            <path d="M52 72 Q60 75 68 72" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'man_head':
        return (
          <g>
            <circle cx="60" cy="60" r="25" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <path d="M36 50 C36 32 84 32 84 50 C76 42 44 42 36 50 Z" fill={stroke} />
            <circle cx="51" cy="58" r="2.4" fill={stroke} />
            <circle cx="69" cy="58" r="2.4" fill={stroke} />
            <path d="M52 72 Q60 75 68 72" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'old_woman_head':
        return (
          <g>
            <path d="M30 68 C30 34 46 26 60 26 C74 26 90 34 90 68 L84 86 L36 86 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <circle cx="60" cy="60" r="21" fill="#FFFFFF" stroke={stroke} strokeWidth="2.6" />
            <circle cx="52" cy="58" r="2.2" fill={stroke} />
            <circle cx="68" cy="58" r="2.2" fill={stroke} />
            <path d="M53 70 Q60 74 67 70" fill="none" stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'baby_head':
        return (
          <g>
            <circle cx="60" cy="60" r="26" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" />
            <path d="M56 34 Q60 24 66 34" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="50" cy="58" r="2.4" fill={stroke} />
            <circle cx="70" cy="58" r="2.4" fill={stroke} />
            <path d="M52 70 Q60 76 68 70" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M44 84 L76 84 L70 96 L50 96 Z" fill="#FFFFFF" stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'sailor_boy':
        return (
          <g>
            <circle cx="60" cy="36" r="12" fill={fillWarm} stroke={stroke} strokeWidth="2.5" />
            <path d="M46 28 L60 18 L74 28 Z" fill="#FFFFFF" stroke={stroke} strokeWidth="2.4" />
            <rect x="44" y="48" width="32" height="32" rx="4" fill={accent} stroke={stroke} strokeWidth="2.6" />
            <line x1="52" y1="80" x2="52" y2="100" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
            <line x1="68" y1="80" x2="68" y2="100" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
            <path d="M44 54 L34 38 M76 54 L86 38" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );
      case 'stick_boy':
        return (
          <g>
            <circle cx="60" cy="34" r="12" fill={fillWarm} stroke={stroke} strokeWidth="2.5" />
            <rect x="46" y="46" width="28" height="34" rx="4" fill={fillSoft} stroke={stroke} strokeWidth="2.5" />
            <line x1="52" y1="80" x2="52" y2="100" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="68" y1="80" x2="68" y2="100" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="80" y1="30" x2="96" y2="88" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'girl_coat':
        return (
          <g>
            <circle cx="60" cy="34" r="12" fill={fillWarm} stroke={stroke} strokeWidth="2.5" />
            <path d="M44 46 L76 46 L84 86 L36 86 Z" fill="#FCE7F3" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <line x1="52" y1="86" x2="52" y2="102" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
            <line x1="68" y1="86" x2="68" y2="102" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      case 'boy_bike':
      case 'girl_bike':
        return (
          <g>
            <circle cx="34" cy="80" r="14" fill="none" stroke={stroke} strokeWidth="2.8" />
            <circle cx="86" cy="80" r="14" fill="none" stroke={stroke} strokeWidth="2.8" />
            <polyline points="34,80 56,80 72,56 48,56 34,80" fill="none" stroke={stroke} strokeWidth="2.6" />
            <line x1="72" y1="56" x2="86" y2="80" stroke={stroke} strokeWidth="2.6" />
            <circle cx="56" cy="34" r="9" fill={fillWarm} stroke={stroke} strokeWidth="2.4" />
            <path d="M52 44 L48 64 L64 64 Z" fill={shapeKey === 'girl_bike' ? '#FCE7F3' : '#DBEAFE'} stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'hand':
        return (
          <path
            d="M36 96 L36 62 C36 56 42 56 44 62 L44 36 C44 30 50 30 52 36 L52 28 C52 22 58 22 60 28 L60 34 C60 28 66 28 68 34 L68 42 C68 36 74 36 76 42 L76 74 C76 86 68 96 56 96 Z"
            fill={fillWarm}
            stroke={stroke}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        );
      case 'foot':
        return (
          <path
            d="M44 24 L44 68 C44 76 34 80 28 84 C22 88 26 96 38 96 L74 96 C82 96 86 90 82 84 C76 76 66 70 64 56 L64 24 Z"
            fill={fillWarm}
            stroke={stroke}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        );

      // --- Utensils, Clocks, Furniture, Vehicles & Tools ---
      case 'spoon':
        return (
          <g transform="rotate(35 60 60)">
            <ellipse cx="60" cy="32" rx="14" ry="20" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="56" y="52" width="8" height="48" rx="4" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
          </g>
        );
      case 'fork':
        return (
          <g transform="rotate(35 60 60)">
            <path d="M46 16 L46 42 C46 48 54 52 56 54 L56 100 L64 100 L64 54 C66 52 74 48 74 42 L74 16 M55 16 L55 38 M65 16 L65 38" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'wristwatch':
        return (
          <g transform="rotate(-25 60 60)">
            <rect x="48" y="14" width="24" height="24" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <rect x="48" y="82" width="24" height="24" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <circle cx="60" cy="60" r="24" fill="#FFFFFF" stroke={stroke} strokeWidth="3" />
            <polyline points="60,46 60,60 70,64" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        );
      case 'alarm_clock':
        return (
          <g>
            <circle cx="38" cy="30" r="10" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <circle cx="82" cy="30" r="10" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <circle cx="60" cy="60" r="30" fill="#FFFFFF" stroke={stroke} strokeWidth="3.2" />
            <polyline points="60,42 60,60 74,66" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
            <line x1="40" y1="84" x2="34" y2="96" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="80" y1="84" x2="86" y2="96" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
          </g>
        );
      case 'sailboat_mast':
        return (
          <g>
            <line x1="56" y1="20" x2="56" y2="82" stroke={stroke} strokeWidth="3" />
            <polygon points="58,24 94,76 58,76" fill="#E0F2FE" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <polygon points="24,82 96,82 86,98 34,98" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
          </g>
        );
      case 'sailboat_nomast':
        return (
          <g>
            <polygon points="58,24 94,76 58,76" fill="#E0F2FE" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <polygon points="24,82 96,82 86,98 34,98" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
          </g>
        );
      case 'armchair_round':
        return (
          <g>
            <path d="M34 52 C34 26 86 26 86 52 L86 78 L34 78 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="26" y="54" width="14" height="28" rx="6" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <rect x="80" y="54" width="14" height="28" rx="6" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <rect x="34" y="66" width="52" height="16" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <line x1="38" y1="82" x2="38" y2="96" stroke={stroke} strokeWidth="3.2" />
            <line x1="82" y1="82" x2="82" y2="96" stroke={stroke} strokeWidth="3.2" />
          </g>
        );
      case 'armchair_square':
        return (
          <g>
            <rect x="32" y="28" width="56" height="50" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="26" y="52" width="12" height="30" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <rect x="82" y="52" width="12" height="30" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <rect x="38" y="66" width="44" height="16" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <line x1="36" y1="82" x2="36" y2="96" stroke={stroke} strokeWidth="3.2" />
            <line x1="84" y1="82" x2="84" y2="96" stroke={stroke} strokeWidth="3.2" />
          </g>
        );
      case 'mickey_large':
        return (
          <g>
            <circle cx="34" cy="34" r="14" fill={stroke} />
            <circle cx="86" cy="34" r="14" fill={stroke} />
            <circle cx="60" cy="64" r="24" fill={stroke} />
            <ellipse cx="60" cy="70" rx="16" ry="14" fill="#FFFFFF" />
            <circle cx="54" cy="62" r="3" fill={stroke} />
            <circle cx="66" cy="62" r="3" fill={stroke} />
            <ellipse cx="60" cy="72" rx="4" ry="3" fill={stroke} />
          </g>
        );
      case 'mickey_small':
        return (
          <g transform="translate(22,22) scale(0.65)">
            <circle cx="34" cy="34" r="14" fill={stroke} />
            <circle cx="86" cy="34" r="14" fill={stroke} />
            <circle cx="60" cy="64" r="24" fill={stroke} />
            <ellipse cx="60" cy="70" rx="16" ry="14" fill="#FFFFFF" />
            <circle cx="54" cy="62" r="3" fill={stroke} />
            <circle cx="66" cy="62" r="3" fill={stroke} />
            <ellipse cx="60" cy="72" rx="4" ry="3" fill={stroke} />
          </g>
        );
      case 'shirt_bowtie':
        return (
          <g>
            <path d="M40 30 L20 46 L30 58 L40 50 L40 94 L80 94 L80 50 L90 58 L100 46 L80 30 L68 34 L52 34 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <polygon points="48,32 60,38 48,44" fill={stroke} />
            <polygon points="72,32 60,38 72,44" fill={stroke} />
            <line x1="40" y1="68" x2="80" y2="68" stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'shirt_necktie':
        return (
          <g>
            <path d="M40 30 L20 46 L30 58 L40 50 L40 94 L80 94 L80 50 L90 58 L100 46 L80 30 L68 34 L52 34 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <polygon points="56,36 64,36 68,74 60,84 52,74" fill={accent} stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'umbrella_closed':
        return (
          <g transform="rotate(35 60 60)">
            <polygon points="60,16 50,76 70,76" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M60 76 L60 94 C60 100 70 100 70 94" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'umbrella_open':
        return (
          <g>
            <path d="M20 60 C26 24 94 24 100 60 Q80 50 60 60 Q40 50 20 60 Z" fill="#E0F2FE" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <line x1="60" y1="26" x2="60" y2="92" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <path d="M60 92 C60 100 72 100 72 92" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'cap_hat':
        return (
          <g>
            <path d="M24 64 C24 38 92 38 92 64 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <path d="M22 64 L102 68 L84 74 L24 68 Z" fill={stroke} />
          </g>
        );
      case 'shoe_child':
        return (
          <g>
            <path d="M36 44 L54 44 L62 66 L90 70 C96 72 96 82 88 84 L32 84 Z" fill={fillWarm} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <line x1="56" y1="54" x2="66" y2="54" stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'shoe_man':
        return (
          <g>
            <path d="M24 54 L44 54 L56 68 L94 72 C100 74 100 84 90 86 L24 86 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <rect x="24" y="86" width="18" height="6" fill={stroke} />
          </g>
        );
      case 'shoe_heel':
        return (
          <g>
            <path d="M26 48 L36 48 L56 76 L94 78 C98 80 96 86 88 86 L54 86 L36 64 L32 86 L26 86 Z" fill="#FCE7F3" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
          </g>
        );
      case 'nefertiti':
      case 'pharaoh_bust':
        return (
          <g>
            <polygon points="34,26 86,26 78,56 42,56" fill={accent} stroke={stroke} strokeWidth="2.6" />
            <circle cx="60" cy="64" r="18" fill="#FEF3C7" stroke={stroke} strokeWidth="2.6" />
            <path d="M46 82 L74 82 L80 98 L40 98 Z" fill="#FDE68A" stroke={stroke} strokeWidth="2.6" />
          </g>
        );
      case 'tut_mask':
        return (
          <g>
            <path d="M32 34 C32 20 88 20 88 34 L94 84 L74 84 L60 98 L46 84 L26 84 Z" fill="#FEF3C7" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <circle cx="52" cy="54" r="2.2" fill={stroke} />
            <circle cx="68" cy="54" r="2.2" fill={stroke} />
            <line x1="36" y1="42" x2="84" y2="42" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'pyramids':
        return (
          <g>
            <polygon points="18,88 46,34 74,88" fill="#FEF3C7" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <polygon points="56,88 80,44 104,88" fill="#FDE68A" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
            <line x1="46" y1="34" x2="54" y2="88" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'ladder':
        return (
          <g transform="rotate(20 60 60)">
            <line x1="42" y1="16" x2="42" y2="104" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="78" y1="16" x2="78" y2="104" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            {[28, 44, 60, 76, 92].map((y) => (
              <line key={y} x1="42" y1={y} x2="78" y2={y} stroke={stroke} strokeWidth="3" />
            ))}
          </g>
        );
      case 'telephone':
        return (
          <g>
            <path d="M26 42 C36 28 84 28 94 42 L88 50 L74 44 L46 44 L32 50 Z" fill={stroke} />
            <polygon points="36,52 84,52 94,90 26,90" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <circle cx="60" cy="72" r="12" fill="#FFFFFF" stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'tv':
        return (
          <g>
            <line x1="48" y1="34" x2="36" y2="18" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
            <line x1="72" y1="34" x2="84" y2="18" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
            <rect x="22" y="34" width="76" height="56" rx="6" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="30" y="42" width="46" height="40" rx="4" fill="#FFFFFF" stroke={stroke} strokeWidth="2.4" />
            <circle cx="86" cy="52" r="4" fill={stroke} />
            <circle cx="86" cy="66" r="4" fill={stroke} />
          </g>
        );
      case 'radio_box':
        return (
          <g>
            <rect x="22" y="36" width="76" height="54" rx="5" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <rect x="30" y="46" width="42" height="34" fill="#FFFFFF" stroke={stroke} strokeWidth="2.2" />
            <line x1="30" y1="56" x2="72" y2="56" stroke={stroke} strokeWidth="1.8" />
            <line x1="30" y1="68" x2="72" y2="68" stroke={stroke} strokeWidth="1.8" />
            <circle cx="84" cy="54" r="5" fill={stroke} />
            <circle cx="84" cy="72" r="5" fill={stroke} />
          </g>
        );
      case 'hammer':
        return (
          <g transform="rotate(-35 60 60)">
            <rect x="55" y="40" width="10" height="62" rx="3" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <path d="M36 24 L84 24 L84 40 L36 40 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
          </g>
        );
      case 'pincers':
        return (
          <g transform="rotate(35 60 60)">
            <path d="M46 98 L54 44 C46 32 48 20 58 18 M74 98 L66 44 C74 32 72 20 62 18" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="60" cy="46" r="4" fill={stroke} />
          </g>
        );
      case 'key':
        return (
          <g transform="rotate(-35 60 60)">
            <circle cx="38" cy="60" r="14" fill={fillSoft} stroke={stroke} strokeWidth="3" />
            <circle cx="38" cy="60" r="5" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
            <line x1="52" y1="60" x2="96" y2="60" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
            <line x1="78" y1="60" x2="78" y2="72" stroke={stroke} strokeWidth="3.5" />
            <line x1="90" y1="60" x2="90" y2="72" stroke={stroke} strokeWidth="3.5" />
          </g>
        );
      case 'saw':
        return (
          <g transform="rotate(-35 60 60)">
            <polygon points="44,24 68,24 62,88 52,88" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <rect x="46" y="88" width="20" height="16" rx="4" fill={stroke} />
            <path d="M44 34 L38 40 L44 46 L38 52 L44 58 L38 64 L44 70 L38 76 L44 82" fill="none" stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'scissors_open':
        return (
          <g>
            <circle cx="42" cy="84" r="10" fill="none" stroke={stroke} strokeWidth="3" />
            <circle cx="78" cy="84" r="10" fill="none" stroke={stroke} strokeWidth="3" />
            <line x1="48" y1="76" x2="82" y2="24" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="72" y1="76" x2="38" y2="24" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="60" cy="56" r="3" fill={stroke} />
          </g>
        );
      case 'scissors_closed':
        return (
          <g>
            <circle cx="48" cy="84" r="9" fill="none" stroke={stroke} strokeWidth="3" />
            <circle cx="72" cy="84" r="9" fill="none" stroke={stroke} strokeWidth="3" />
            <line x1="54" y1="76" x2="62" y2="20" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
            <line x1="66" y1="76" x2="58" y2="20" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
          </g>
        );
      case 'house':
        return (
          <g>
            <polygon points="22,56 60,24 98,56" fill="#FEE2E2" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <rect x="30" y="56" width="60" height="40" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <rect x="52" y="70" width="16" height="26" fill={accent} stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'pitcher':
        return (
          <g>
            <path d="M44 26 L76 26 L72 44 C82 54 84 82 70 94 L46 94 C34 82 36 54 46 44 Z" fill="#E0F2FE" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M76 38 C94 38 94 74 78 76" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'glass':
        return (
          <g>
            <polygon points="38,28 82,28 74,94 46,94" fill="#E0F2FE" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <ellipse cx="60" cy="28" rx="22" ry="5" fill="#FFFFFF" stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'cup':
        return (
          <g>
            <path d="M34 42 L82 42 L76 80 C74 88 42 88 40 80 Z" fill="#FFFFFF" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M82 48 C96 48 96 70 78 70" fill="none" stroke={stroke} strokeWidth="3" />
          </g>
        );
      case 'kettle':
        return (
          <g>
            <path d="M36 44 C36 22 84 22 84 44" fill="none" stroke={stroke} strokeWidth="3.2" />
            <path d="M32 54 C32 42 88 42 88 54 L94 86 L26 86 Z" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M88 64 L104 48" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      case 'chair':
        return (
          <g>
            <rect x="40" y="22" width="40" height="38" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />
            <polygon points="34,60 86,60 80,72 40,72" fill={fillWarm} stroke={stroke} strokeWidth="2.6" />
            <line x1="40" y1="72" x2="40" y2="98" stroke={stroke} strokeWidth="3.2" />
            <line x1="80" y1="72" x2="80" y2="98" stroke={stroke} strokeWidth="3.2" />
          </g>
        );
      case 'desk':
        return (
          <g>
            <rect x="22" y="34" width="76" height="12" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <rect x="24" y="46" width="22" height="44" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <rect x="74" y="46" width="22" height="44" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <line x1="24" y1="60" x2="46" y2="60" stroke={stroke} strokeWidth="2" />
            <line x1="24" y1="74" x2="46" y2="74" stroke={stroke} strokeWidth="2" />
            <line x1="74" y1="60" x2="96" y2="60" stroke={stroke} strokeWidth="2" />
            <line x1="74" y1="74" x2="96" y2="74" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'car':
        return (
          <g>
            <path d="M24 68 L30 46 L78 46 L90 64 L102 68 L102 82 L18 82 L18 68 Z" fill="#DBEAFE" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <circle cx="36" cy="84" r="9" fill={stroke} />
            <circle cx="84" cy="84" r="9" fill={stroke} />
            <circle cx="36" cy="84" r="4" fill="#FFFFFF" />
            <circle cx="84" cy="84" r="4" fill="#FFFFFF" />
            <rect x="38" y="52" width="16" height="12" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
            <rect x="60" y="52" width="16" height="12" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'trumpet':
        return (
          <g transform="rotate(-25 60 60)">
            <polygon points="24,54 78,44 98,26 98,88 78,70 24,60" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <rect x="44" y="60" width="22" height="12" rx="4" fill="none" stroke={stroke} strokeWidth="2.4" />
          </g>
        );
      case 'bicycle':
        return (
          <g>
            <circle cx="32" cy="76" r="16" fill="none" stroke={stroke} strokeWidth="3" />
            <circle cx="88" cy="76" r="16" fill="none" stroke={stroke} strokeWidth="3" />
            <polyline points="32,76 56,76 74,46 46,46 32,76" fill="none" stroke={stroke} strokeWidth="2.8" />
            <line x1="74" y1="46" x2="88" y2="76" stroke={stroke} strokeWidth="2.8" />
            <line x1="68" y1="38" x2="82" y2="38" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="40" x2="52" y2="40" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'mosque':
        return (
          <g>
            <rect x="28" y="56" width="54" height="38" fill={fillWarm} stroke={stroke} strokeWidth="2.8" />
            <path d="M36 56 C36 32 74 32 74 56 Z" fill="#DCFCE7" stroke={stroke} strokeWidth="2.8" />
            <rect x="86" y="34" width="12" height="60" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <polygon points="84,34 92,16 100,34" fill="#DCFCE7" stroke={stroke} strokeWidth="2.4" />
            <path d="M48 94 L48 74 C48 68 62 68 62 74 L62 94 Z" fill={accent} stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'saucer':
        return (
          <g>
            <ellipse cx="60" cy="64" rx="42" ry="16" fill="#FFFFFF" stroke={stroke} strokeWidth="2.8" />
            <ellipse cx="60" cy="64" rx="22" ry="7" fill={fillSoft} stroke={stroke} strokeWidth="2.2" />
          </g>
        );
      case 'boot':
        return (
          <path
            d="M42 22 L66 22 L66 66 L90 74 C96 76 96 90 88 92 L38 92 Z"
            fill={fillSoft}
            stroke={stroke}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        );
      case 'nail':
        return (
          <g transform="rotate(35 60 60)">
            <rect x="46" y="20" width="28" height="8" rx="2" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <polygon points="56,28 64,28 60,98" fill={fillWarm} stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
          </g>
        );
      case 'eyeglasses':
        return (
          <g>
            <circle cx="38" cy="64" r="16" fill="#E0F2FE" stroke={stroke} strokeWidth="3" />
            <circle cx="82" cy="64" r="16" fill="#E0F2FE" stroke={stroke} strokeWidth="3" />
            <path d="M54 64 Q60 58 66 64" fill="none" stroke={stroke} strokeWidth="3" />
            <line x1="22" y1="60" x2="34" y2="38" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
            <line x1="98" y1="60" x2="86" y2="38" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
          </g>
        );
      case 'padlock':
        return (
          <g>
            <path d="M42 52 L42 36 C42 22 78 22 78 36 L78 52" fill="none" stroke={stroke} strokeWidth="5" />
            <rect x="34" y="52" width="52" height="42" rx="6" fill="#FEF3C7" stroke={stroke} strokeWidth="2.8" />
            <circle cx="60" cy="70" r="5" fill={stroke} />
            <line x1="60" y1="74" x2="60" y2="84" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );
      case 'handset':
        return (
          <g>
            <path d="M32 32 C22 42 28 76 52 90 C68 98 86 90 90 78 L78 68 L68 74 C58 70 48 60 44 50 L50 40 Z" fill={stroke} />
          </g>
        );
      case 'phone_base':
        return (
          <g>
            <polygon points="34,36 86,36 96,86 24,86" fill={fillSoft} stroke={stroke} strokeWidth="2.8" strokeLinejoin="round" />
            <circle cx="60" cy="62" r="16" fill="#FFFFFF" stroke={stroke} strokeWidth="2.6" />
            <circle cx="60" cy="62" r="6" fill={fillSoft} stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'airplane':
        return (
          <g>
            <path d="M22 62 L50 56 L66 22 L76 22 L68 56 L92 54 L100 44 L106 44 L100 60 L106 76 L100 76 L92 66 L68 64 L76 98 L66 98 L50 64 Z" fill="#E0F2FE" stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
          </g>
        );
      case 'candle':
        return (
          <g>
            <path d="M60 18 C52 28 54 38 60 38 C66 38 68 28 60 18 Z" fill="#FDE68A" stroke={stroke} strokeWidth="2.4" />
            <rect x="48" y="42" width="24" height="54" rx="3" fill="#FFFFFF" stroke={stroke} strokeWidth="2.8" />
            <path d="M48 54 Q60 60 72 54 M48 70 Q60 76 72 70" fill="none" stroke={stroke} strokeWidth="2" />
          </g>
        );
      case 'lantern':
        return (
          <g>
            <circle cx="60" cy="22" r="6" fill="none" stroke={stroke} strokeWidth="2.6" />
            <polygon points="44,32 76,32 82,46 38,46" fill="#FEF3C7" stroke={stroke} strokeWidth="2.6" />
            <polygon points="38,46 82,46 74,82 46,82" fill="#FEF3C7" stroke={stroke} strokeWidth="2.6" />
            <polygon points="46,82 74,82 80,96 40,96" fill={fillSoft} stroke={stroke} strokeWidth="2.6" />
            <circle cx="60" cy="64" r="5" fill="#F59E0B" />
          </g>
        );
      default:
        return <circle cx="60" cy="60" r="30" fill={fillSoft} stroke={stroke} strokeWidth="2.8" />;
    }
  };

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {renderShape()}
    </svg>
  );
};
