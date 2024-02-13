export const headerAppHeight = 70;

export const GENERAL_COLOR = {
  PRIMARY: '#032240',
  SECONDARY: '#EAC46E',
  ERROR: '#FF6B6B',
  SUCCESS: '#33B9A1',
  WARNING: '#FE8653',
  INFO: '#395FC1',
};

export const COLOR = {
  LIGHT: {
    ...GENERAL_COLOR,
    PRIMARY: '#385D7E',
    BACKGROUND: '#f8f8f8',
    TEXT: '#032240',
    SUB_TEXT: '#707B84',
    HIGHLIGHT_TEXT: '#385D7E',
    BORDER: 'rgb(224 224 224)',
    HOVER_BORDER: '#032240',
    HOVER_TEXT: '#032240',
  },
  DARK: {
    ...GENERAL_COLOR,
    PRIMARY: '#447DAF',
    BACKGROUND: '#122231',
    TEXT: '#D5E4F0',
    SUB_TEXT: '#707B84',
    HIGHLIGHT_TEXT: '#447DAF',
    BORDER: '#45525E',
    HOVER_TEXT: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

export const FONT = {
  HEEBO: 'Heebo',
  PLAYFAIR_DISPLAY: 'PlayfairDisplay',
};

export enum THEME_MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const SPACE = {
  SECTION: '3rem',
  ELEMENT: '1.5rem',
};

export const TABLE = {
  INNER_SHADOW: 'rgba(0, 0, 0, 0.09) 0px 3px 12px inset',
};
