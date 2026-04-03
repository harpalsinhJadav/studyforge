export const colors = {
  // Brand
  primary:      '#7C6FF7',
  primaryDark:  '#5B4FD4',
  primaryLight: '#A78BFA',

  // Accents
  accentOrange: '#E85D2F',
  accentAmber:  '#F4A227',

  // Semantic
  success: '#10B981',
  danger:  '#EF4444',

  // Backgrounds
  bgPage:    '#0A0A14',
  bgScreen:  '#0D0D18',
  bgTopbar:  '#111120',

  // Surface / borders
  surface: 'rgba(255,255,255,0.04)',
  border:  'rgba(255,255,255,0.07)',

  // Text
  textPrimary:   '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.55)',
  textMuted:     'rgba(255,255,255,0.35)',
} as const;

export type ColorToken = keyof typeof colors;
