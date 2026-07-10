/* Premium abstract icon system for the pricing tiers.
   Rendered white-on-gradient inside each plan's existing color chip —
   the chip itself still carries the plan's brand gradient/color. */

export default function PlanIcon({ plan, size = 26 }) {
  const gid = `planIconGlow-${plan}`

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <filter id={gid} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* shared soft top-left highlight for depth */}
      <ellipse cx="12" cy="10" rx="9" ry="7" fill="#fff" opacity=".14" filter={`url(#${gid})`} />

      {plan === 'Starter' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g transform="rotate(-32 16 16)">
            <rect x="12.4" y="5.5" width="7.2" height="18" rx="3.6" fill="#fff" fillOpacity=".22" stroke="#fff" strokeWidth="1.7" />
            <circle cx="16" cy="10.3" r="1.5" fill="#fff" />
          </g>
          <path d="M8.2 23.6c1.6.35 3-.1 4-1.2" stroke="#fff" strokeWidth="1.6" opacity=".6" fill="none" />
          <path d="M5.6 20.9c1.2.45 2.3.25 3.1-.5" stroke="#fff" strokeWidth="1.4" opacity=".35" fill="none" />
          <circle cx="23.4" cy="8.6" r="1.3" fill="#fff" opacity=".75" />
          <circle cx="25.8" cy="12.2" r=".8" fill="#fff" opacity=".45" />
        </g>
      )}

      {plan === 'Basic' && (
        <g stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <rect x="6" y="15.5" width="8.2" height="8.2" rx="2.3" fill="#fff" fillOpacity=".2" />
          <rect x="16.2" y="9" width="7.2" height="7.2" rx="2" fill="#fff" fillOpacity=".2" />
          <rect x="16.2" y="18.4" width="7.2" height="7.2" rx="2" fill="#fff" fillOpacity=".2" />
          <path d="M14.2 18.6h2" strokeWidth="1.3" opacity=".7" />
          <path d="M19.8 16.2v2.2" strokeWidth="1.3" opacity=".7" />
          <circle cx="10.1" cy="19.6" r="1" fill="#fff" stroke="none" />
        </g>
      )}

      {plan === 'Growth' && (
        <g fill="none" strokeLinecap="round">
          <path d="M6 23.5c3-1 5-4 6.5-7.2 1.9-3.7 4.1-6.6 7.2-8.5" stroke="#fff" strokeWidth="2" opacity=".9" />
          <circle cx="9" cy="19.6" r="1.3" fill="#fff" opacity=".55" />
          <circle cx="15" cy="13.4" r="1.6" fill="#fff" opacity=".8" />
          <circle cx="19.9" cy="7.5" r="2.1" fill="#fff" />
        </g>
      )}

      {plan === 'Pro' && (
        <g strokeLinejoin="round" fill="none">
          <path d="M9.3 10.4L16 6.2l6.7 4.2L20.2 24h-8.4L9.3 10.4z" fill="#fff" fillOpacity=".18" stroke="#fff" strokeWidth="1.6" />
          <path d="M9.3 10.4h13.4M13 10.4L16 6.2l3 4.2M12.7 10.4L12 24M19.3 10.4L20.2 24" stroke="#fff" strokeWidth="1" opacity=".6" />
        </g>
      )}

      {plan === 'Scale' && (
        <g>
          <g stroke="#fff" strokeWidth="1.5" opacity=".7">
            <line x1="16" y1="16" x2="8.2" y2="10.2" />
            <line x1="16" y1="16" x2="23.8" y2="10.2" />
            <line x1="16" y1="16" x2="8.2" y2="21.8" />
            <line x1="16" y1="16" x2="23.8" y2="21.8" />
            <line x1="16" y1="16" x2="16" y2="7.6" />
          </g>
          <circle cx="16" cy="16" r="2.4" fill="#fff" />
          <circle cx="8.2" cy="10.2" r="1.5" fill="#fff" opacity=".85" />
          <circle cx="23.8" cy="10.2" r="1.5" fill="#fff" opacity=".85" />
          <circle cx="8.2" cy="21.8" r="1.5" fill="#fff" opacity=".85" />
          <circle cx="23.8" cy="21.8" r="1.5" fill="#fff" opacity=".85" />
          <circle cx="16" cy="7.6" r="1.2" fill="#fff" opacity=".7" />
        </g>
      )}
    </svg>
  )
}
