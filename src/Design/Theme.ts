//TODO : import the theme on the App.js and load it into the redux state
const palette = {
  purple: '#786EE2',
  purpleDark: '#221980',
  purpleLight: '#A8A1EC',
  purpleTransparent: '#D7D4F7',
  black: '#2D2E2F',
  grey: '#787D80',
  greyTransparent: '#C0C8CC',
  red: '#C24749',
  redLight: '#E3ABAC',
  redTransparent: '#F2D9D9',
  yellow: '#F5E7B8',
  blue: '#E9F1F7',
  blueLight: '#F8FAFC',
  white: '#FFFFFF',
};

export const theme = {
  colors: {
    background: palette.purple,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.yellow,
    danger: palette.red,
    failure: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: 'Nobile_700Bold',
      fontSize: 38,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: 'Oxygen_400Regular',
      fontSize: 14,
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  },
};
