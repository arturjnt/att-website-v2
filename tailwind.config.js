module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: '#000000',
            white: '#FFFFFF',
            orange: { light: '#EEC170', DEFAULT: '#F2A65A', dark: '#F58549' },
            blue: { DEFAULT: '#464E5F', dark: '#2F3644' }
        }
    }
};