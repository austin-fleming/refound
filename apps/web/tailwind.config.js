const defaultTheme = require("tailwindcss/defaultTheme");

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: withOpacityValue('--c-background'),
          less: withOpacityValue('--c-background--less'),
          lesser: withOpacityValue('--c-background--lesser'),
        },
        primary: {
          DEFAULT: withOpacityValue('--c-primary'),
          less: withOpacityValue('--c-primary--less'),
          lesser: withOpacityValue('--c-primary--lesser'),
        },
      },
      fontFamily: {
        'sans': ['primary-family', ...defaultTheme.fontFamily.sans]
      },
      maxWidth: {
        container: `var(--l-max-content-width)`,
        'container-narrow': `var(--l-max-content-width--narrow)`,
      },
      spacing: {
        contentPadding: 'var(--l-content-padding)',
        sitegap: '32px', // TODO: remove?
        sitepad: '2rem', // TODO: remove?
        sitebottom: '8rem', // TODO: remove?
      },
    },
  },
  plugins: [],
};
