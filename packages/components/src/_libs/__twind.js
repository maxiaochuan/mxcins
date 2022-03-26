import * as colors from 'twind/colors';
import * as antcolors from '@ant-design/colors';
import { content } from '@twind/content';
import { domSheet } from 'twind/sheets';

const INLINE_ELEMENT_BASE_HEIGHT = [24, 32, 40];
const INLINE_ELEMENT_BASE_LINEHEIGHT = [22, 22, 24];

const INLINE_ELEMENT_BASE_PY = INLINE_ELEMENT_BASE_HEIGHT.map(
  (h, i) => (h - 2 - INLINE_ELEMENT_BASE_LINEHEIGHT[i]) / 2,
);

// const Y2 = 32 // 4
//             - 22 // 2.35
//             - 1

//             1.65 - 1px

/**
 * @type import('twind').Configuration
 */
export const conf = {
  darkMode: 'class',
  sheet: domSheet(),
  plugins: { content },
  preflight: {
    ':root': {
      '--color-primary': colors.blue[500],
      '--color-primary-hover': colors.blue[400],
      '--color-primary-active': colors.blue[600],
      '--color-link': colors.red[500],
      '--color-link-hover': colors.red[400],
      '--color-link-active': colors.red[600],
      '--color-danger': colors.red[500],
      '--color-danger-hover': colors.red[400],
      '--color-danger-active': colors.red[600],
    },
    'button:focus': { outline: '0' },
    /* ------ 2022-03-10 12:00:12 默认的 middle 会影响 anticon的样式  ------ */
    svg: { 'vertical-align': 'initial' },
    /* ------ 2022-03-10 12:00:12 默认的 middle 会影响 anticon的样式  ------ */
  },
  theme: {
    content: {
      empty: '""',
    },
    colors: {
      initial: 'initial',
      inherit: 'inherit',
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
      text: {
        DEFAULT: 'rgba(0, 0, 0, .85)', // 主字体颜色
      },
      border: {
        DEFAULT: 'rgba(0, 0, 0, .85)',
      },
      background: {
        disabled: '',
      },
      link: {
        DEFAULT: 'var(--color-link)',
        hover: 'var(--color-link-hover)',
        active: 'var(--color-link-active)',
      },
      primary: {
        DEFAULT: 'var(--color-primary)',
        hover: 'var(--color-primary-hover)',
        active: 'var(--color-primary-active)',
      },
      danger: {
        DEFAULT: 'var(--color-danger)',
        hover: 'var(--color-danger-hover)',
        active: 'var(--color-danger-active)',
      },
      background: {
        DEFAULT: '#f0f2f5',
      },
    },
    transitionProperty: {
      width: 'width',
      opacity: 'opacity',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(.645,.045,.355,1)',
    },
    transitionDuration: {
      DEFAULT: '300ms',
      200: '200ms',
    },
    minWidth: {
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
    },
    maxWidth: {
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
    },
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      '1/24': '4.166667%',
      '2/24': '8.333333%',
      '3/24': '12.5%',
      '4/24': '16.666667%',
      '5/24': '20.833333%',
      '6/24': '25%',
      '7/24': '29.166667%',
      '8/24': '33.333333%',
      '9/24': '37.5%',
      '10/24': '41.666667%',
      '11/24': '45.833333%',
      '12/24': '50%',
      '13/24': '54.166667%',
      '14/24': '58.333333%',
      '15/24': '62.5%',
      '16/24': '66.666667%',
      '17/24': '70.833333%',
      '18/24': '75%',
      '19/24': '79.166667%',
      '20/24': '83.333333%',
      '21/24': '87.5%',
      '22/24': '91.666667%',
      '23/24': '95.833333%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
    }),
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.375rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    padding: theme => {
      return {
        ...theme('spacing'),
        'inline-bordered': INLINE_ELEMENT_BASE_PY[1] + 'px',
        'inline-bordered-sm': INLINE_ELEMENT_BASE_PY[0] + 'px',
        'inline-bordered-lg': INLINE_ELEMENT_BASE_PY[2] + 'px',
        '2-bordered': '0.4375rem', // 0.5rem - 1px
        '3-bordered': '0.6875rem', // 0.75rem - 1px
        '4-bordered': 'calc(1rem - 1px)', // 0.75rem - 1px
        '2y-bordered': '',
      };
    },
    // extend: {
    //   colors,
    // },
  },
};
