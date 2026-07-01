/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false, // keep existing CSS untouched
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
