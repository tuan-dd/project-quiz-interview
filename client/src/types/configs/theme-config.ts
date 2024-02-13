import { COLOR, FONT, GENERAL_COLOR, SPACE } from '@/types/enums';
import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const mapColor: Record<string, Array<string>> = {
  '0': ['f', '1'],
  '1': ['0', '2'],
  '2': ['1', '3'],
  '3': ['2', '4'],
  '4': ['3', '5'],
  '5': ['4', '6'],
  '6': ['5', '7'],
  '7': ['6', '8'],
  '8': ['7', '9'],
  '9': ['8', 'a'],

  a: ['9', 'b'],
  b: ['a', 'c'],
  c: ['b', 'd'],
  d: ['c', 'e'],
  e: ['d', 'f'],
  f: ['e', '0'],
};

export const calcColorFormHex = (
  input: string,
): { main: string; hoverColor: string; activeColor: string } => {
  let hoverColor = '';
  let activeColor = '';
  const main = input.toLowerCase();

  for (let i = 0; i < main.length; i++) {
    const char = main[i];
    if (i % 2 === 0) {
      hoverColor += char;
      activeColor += char;
    } else {
      hoverColor += mapColor[char][0];
      activeColor += mapColor[char][1];
    }
  }
  return {
    main,
    hoverColor,
    activeColor,
  };
};

type InputType = {
  palette: {
    primary: string;
    text: string;
    divider: string;
    background: string;
    secondary: string;
    selected_text: string;
    subtext: string;
  };
  mode: 'dark' | 'light';
};

const generateThemeConfig = (input: InputType): ThemeOptions => {
  const { palette, mode } = input;
  return {
    palette: {
      mode,
      error: {
        main: GENERAL_COLOR.ERROR,
      },
      warning: {
        main: GENERAL_COLOR.WARNING,
      },
      success: {
        main: GENERAL_COLOR.SUCCESS,
      },
      secondary: {
        main: GENERAL_COLOR.SECONDARY,
      },
      primary: {
        main: palette.primary,
      },
      text: {
        primary: palette.text,
      },
      divider: palette.divider,
      background: {
        default: palette.background,
        paper: palette.background,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: [
        FONT.HEEBO,
        FONT.PLAYFAIR_DISPLAY,
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    components: {
      MuiFormControl: {
        styleOverrides: {
          fullWidth: true,
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            overflow: 'scroll',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            height: '40px',
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderWidth: 0,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontSize: '0.875rem',
            textDecoration: 'none',
            // '&:hover': {
            // textDecoration: 'underline',
            // },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            overflow: 'unset',
          },
          indicator: {
            display: 'none',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            color: palette.subtext,
            '&.Mui-selected': {
              color: palette.selected_text,
            },
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: 'dashed' },
            style: {
              borderWidth: '1px',
              borderStyle: 'dashed',
            },
          },
        ],
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
        styleOverrides: {
          root: {
            fontSize: '0.875rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: 'auto',
            paddingBottom: 'auto',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          sizeMedium: ({ theme }) => ({
            [theme.breakpoints.down('md')]: {
              height: '2.75rem',
            },
            height: '3.75rem',
          }),
          sizeLarge: ({ theme }) => ({
            [theme.breakpoints.down('md')]: {
              height: '3.75rem',
            },
            height: '4.75rem',
          }),
          sizeSmall: ({ theme }) => ({
            [theme.breakpoints.down('md')]: {
              height: '2.3rem',
            },

            height: '2.75rem',
          }),
          containedPrimary: {
            main: GENERAL_COLOR.SECONDARY,
            backgroundColor: GENERAL_COLOR.SECONDARY,
            color: GENERAL_COLOR.PRIMARY,
            '&:hover': {
              background: calcColorFormHex(GENERAL_COLOR.SECONDARY).hoverColor,
            },
            '&:active': {
              background: calcColorFormHex(GENERAL_COLOR.SECONDARY).activeColor,
            },
            '&:focus': {
              background: calcColorFormHex(GENERAL_COLOR.SECONDARY).activeColor,
            },
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: SPACE.SECTION,
            paddingBottom: 0,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            fontWeight: 500,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            paddingTop: SPACE.ELEMENT,
            padding: '2rem',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: palette.background,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: { background: palette.background },
        },
      },
      MuiStepper: {
        styleOverrides: {
          root: { background: palette.background },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { background: palette.background },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: palette.subtext },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: { color: COLOR.LIGHT.TEXT },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            background: palette.background,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: palette.divider,
          },
          head: {
            color: palette.subtext,
            fontWeight: 400,
            fontSize: '0.75rem',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: palette.primary,
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            color: palette.text,
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            border: 0,
          },
        },
      },
    },
  };
};

export const lightThemeConfig = createTheme(
  generateThemeConfig({
    mode: 'light',
    palette: {
      primary: COLOR.LIGHT.PRIMARY,
      secondary: COLOR.LIGHT.SECONDARY,
      selected_text: COLOR.LIGHT.HIGHLIGHT_TEXT,
      text: COLOR.LIGHT.TEXT,
      divider: '#EBEBEB',
      background: COLOR.LIGHT.BACKGROUND,
      subtext: COLOR.LIGHT.SUB_TEXT,
    },
  }),
);

export const darkThemeConfig = createTheme(
  generateThemeConfig({
    mode: 'dark',
    palette: {
      primary: COLOR.DARK.PRIMARY,
      secondary: COLOR.DARK.SECONDARY,
      selected_text: COLOR.DARK.HIGHLIGHT_TEXT,
      text: COLOR.DARK.TEXT,
      divider: '#45525E',
      background: COLOR.DARK.BACKGROUND,
      subtext: COLOR.DARK.SUB_TEXT,
    },
  }),
);
