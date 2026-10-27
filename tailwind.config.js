/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        ember: 'rgb(var(--ember) / <alpha-value>)',
        ok: 'rgb(var(--ok) / <alpha-value>)',
        bad: 'rgb(var(--bad) / <alpha-value>)',
        parchment: 'rgb(var(--parchment) / <alpha-value>)',
        sepia: 'rgb(var(--sepia) / <alpha-value>)',
        azure: 'rgb(var(--azure) / <alpha-value>)',
        teal: 'rgb(var(--teal) / <alpha-value>)',
        pink: 'rgb(var(--pink) / <alpha-value>)',
        sun: 'rgb(var(--sun) / <alpha-value>)',
        leaf: 'rgb(var(--leaf) / <alpha-value>)',
        leather: 'rgb(var(--leather) / <alpha-value>)',
      },
      fontFamily: {
        // As famílias vêm das variáveis do tema (o painel de personalização pode trocá-las).
        gothic: ['var(--font-title)'],
        display: ['var(--font-title)'],
        logo: ['var(--font-title)'],
        title: ['var(--font-title)'],
        sans: ['var(--font-text)'],
        serif: ['"IBM Plex Sans"', 'Inter Tight Variable', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
