export const palette = {
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

const fonts = {
  body: 'Oxygen_400Regular',
  bodyLight: 'Oxygen_300Light',
  header: 'Nobile_700Bold',
};

export const theme = {
  colors: {
    background: palette.purple,
    backgroundDark: palette.purple,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.purple,
    danger: palette.yellow,
    failure: palette.red,
  },

  palette: { ...palette },
  spacing: {
    s: 10,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 80,
    fromTop: 130,
  },
  textVariants: {
    header: {
      fontFamily: fonts.header,
      fontSize: 36,
      fontWeight: 'bold',
    },
    subHeader: {
      fontFamily: fonts.header,
      fontSize: 24,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: fonts.body,
      fontSize: 14,
    },
    subHeaderLight: {
      fontFamily: fonts.bodyLight,
      fontSize: 24,
    },
    bodyLight: {
      fontFamily: fonts.bodyLight,
      fontSize: 14,
    },
  },
  textFields: {
    singleLine: {
      backgroundColor: palette.blue,
      fontFamily: fonts.body,
      fontSize: 14,
      borderRadius: 10,
      width: 250,
      height: 40,
      color: palette.black,
      paddingHorizontal: 10,
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
