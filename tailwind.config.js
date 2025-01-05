/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--color-on-surface-variant) / <alpha-value>)',
        'surface-variant': 'rgb(var(--color-surface-variant) / <alpha-value>)',
        'surface-container': 'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-container-high': 'rgb(var(--color-surface-container-high) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--color-surface-container-highest) / <alpha-value>)',

        'soft': 'rgb(var(--color-soft) / <alpha-value>)',
        'softer': 'rgb(var(--color-softer) / <alpha-value>)',



        'outline': 'rgb(var(--border-color) / <alpha-value>)',
        'outline-variant': 'rgb(var(--border-color-variant) / <alpha-value>)',

        'error': 'rgb(var(--color-error) / <alpha-value>)',
        'error-light': 'rgb(var(--color-error-light) / <alpha-value>)',
        'on-error': 'rgb(var(--color-on-error) / <alpha-value>)',
        'error-container': 'rgb(var(--color-error-container) / <alpha-value>)',
        'on-error-container': 'rgb(var(--color-on-error-container) / <alpha-value>)',

        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        'primary-container': 'rgb(var(--color-primary-container) / <alpha-value>)',
        'on-primary-container': 'rgb(var(--color-on-primary-container) / <alpha-value>)',

        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'secondary-light': 'rgb(var(--color-secondary-light) / <alpha-value>)',
        'on-secondary': 'rgb(var(--color-on-secondary) / <alpha-value>)',
        'secondary-container': 'rgb(var(--color-secondary-container) / <alpha-value>)',
        'on-secondary-container': 'rgb(var(--color-on-secondary-container) / <alpha-value>)',

        'tertiary': 'rgb(var(--color-tertiary) / <alpha-value>)',
        'tertiary-light': 'rgb(var(--color-tertiary-light) / <alpha-value>)',
        'on-tertiary': 'rgb(var(--color-on-tertiary) / <alpha-value>)',
        'tertiary-container': 'rgb(var(--color-tertiary-container) / <alpha-value>)',
        'on-tertiary-container': 'rgb(var(--color-on-tertiary-container) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}

