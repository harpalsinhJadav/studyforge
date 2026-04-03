export const fontFamilies = {
  display: 'Syne',   // logo, display headings
  heading: 'Syne',   // section headings
  label:   'Outfit', // UI labels, buttons
  body:    'DM Sans', // body text, metadata
} as const;

export const fontWeights = {
  regular:     '400',
  medium:      '500',
  semibold:    '600',
  bold:        '700',
  extraBold:   '800',
} as const;

export const fontSizes = {
  xs:   8,
  sm:   10,
  base: 12,
  md:   13,
  lg:   14,
  xl:   16,
  '2xl': 18,
  '3xl': 22,
  '4xl': 28,
  '5xl': 32,
} as const;

/** Google Fonts import URL for web */
export const googleFontsUrl =
  'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap';
