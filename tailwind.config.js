/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false, // keep existing CSS untouched
    container: false, // css/style.css already defines .container (1180px cap, always centered) —
                       // Tailwind's own breakpoint-based .container utility was loading after it and
                       // silently overriding the max-width at 1024/1280/1536px, making every section's
                       // width jump around inconsistently instead of holding a steady 1180px cap.
  },
  theme: {
    extend: {
      colors: {
        border:      'var(--border)',
        background:  'var(--bg)',
        foreground:  'var(--text)',
        primary: {
          DEFAULT:    '#6366f1',
          foreground: '#fff',
        },
        muted: {
          DEFAULT:    'var(--surface)',
          foreground: 'var(--text-soft)',
        },
        card: {
          DEFAULT:    'var(--surface)',
          foreground: 'var(--text)',
        },
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
    },
  },
  plugins: [],
}
