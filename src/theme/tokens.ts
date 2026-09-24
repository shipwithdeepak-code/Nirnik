/**
 * Nirnik Design Tokens
 * 
 * Strict palette tokens following modern premium SaaS principles:
 * Quiet, precise, editorial, evidence-oriented.
 */

export const tokens = {
  colors: {
    background: '#F7F7F4',
    surface: '#FFFFFF',
    surfaceSubtle: '#F2F3EF',
    border: '#E5E7E2',
    borderStrong: '#D6D9D2',
    primaryText: '#171A18',
    secondaryText: '#626862',
    mutedText: '#8A908A',
    
    // Brand Greens (Accent only)
    brandGreen: '#174A3A',
    brandGreenDark: '#10372C',
    brandGreenLight: '#DDEBE4',
    accentGreen: '#6FA889',
    
    // Status colors
    success: '#287A52',
    warning: '#A66B16',
    danger: '#B54747',
    info: '#496F8C',
  },
  typography: {
    fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSerif: "'Instrument Serif', 'DM Serif Display', Georgia, serif",
    fontMono: "'JetBrains Mono', ui-monospace, monospace",
  },
  radii: {
    controls: '8px',
    cards: '12px',
    containers: '14px',
  },
} as const;
