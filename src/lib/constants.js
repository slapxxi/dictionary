// @flow
const colors = {
  red: 'tomato',
  darkred: '#D9553D',
  blue: '#17F',
  white: 'white',
  black: '#050510',
  bgtop: '#2B3448',
  bg: '#0B1428',
  midgrey: '#C1C0C3',
  darkgrey: '#22262F',
  grey: '#6D6F7C',
  lightgrey: '#F1F0F3',
  bluegrey: '#5D687C',
  comment: '#40404A',
};

const theme = {
  bg: '#22262F',
  text: 'white',
  subtext: '#6D6F7f',
  link: colors.bluegrey,
  activelink: colors.white,
  heading: colors.bg,
  badge: colors.red,
  hiddentext: colors.comment,
};

const queries = {
  phone: '@media (min-width: 400px)',
  tablet: '@media (min-width: 660px)',
  desktop: '@media (min-width: 960px)',
};

export { colors, theme, queries };
