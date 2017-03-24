import { cssRaw } from 'typestyle'

export function addFonts() {
  cssRaw(`
  body {
    margin: 0;
    background: #eeeeee;
    overflow: hidden;
  }

  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  input {
    -webkit-user-select: auto !important;
    -moz-user-select: auto !important;
    -ms-user-select: auto !important;
    user-select: auto !important;
  }

  textarea {
    -webkit-user-select: auto !important;
    -moz-user-select: auto !important;
    -ms-user-select: auto !important;
    user-select: auto !important;
  }

  /* roboto-100 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 100;
    src: local('Roboto Thin'), local('Roboto-Thin'),
        url('assets/fonts/roboto-v15-latin-100.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-100.woff') format('woff');
  }
  /* roboto-100italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 100;
    src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
        url('assets/fonts/roboto-v15-latin-100italic.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-100italic.woff') format('woff');
  }
  /* roboto-300 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto Light'), local('Roboto-Light'),
        url('assets/fonts/roboto-v15-latin-300.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-300.woff') format('woff');
  }
  /* roboto-regular - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'),
        url('assets/fonts/roboto-v15-latin-regular.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-regular.woff') format('woff');
  }
  /* roboto-300italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
        url('assets/fonts/roboto-v15-latin-300italic.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-300italic.woff') format('woff');
  }
  /* roboto-italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    src: local('Roboto Italic'), local('Roboto-Italic'),
        url('assets/fonts/roboto-v15-latin-italic.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-italic.woff') format('woff');
  }
  /* roboto-500 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'), local('Roboto-Medium'),
        url('assets/fonts/roboto-v15-latin-500.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-500.woff') format('woff');
  }
  /* roboto-500italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 500;
    src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
        url('assets/fonts/roboto-v15-latin-500italic.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-500italic.woff') format('woff');
  }
  /* roboto-700 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Bold'), local('Roboto-Bold'),
        url('assets/fonts/roboto-v15-latin-700.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-700.woff') format('woff');
  }
  /* roboto-700italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 700;
    src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
        url('assets/fonts/roboto-v15-latin-700italic.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-700italic.woff') format('woff');
  }
  /* roboto-900 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    src: local('Roboto Black'), local('Roboto-Black'),
        url('assets/fonts/roboto-v15-latin-900.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-900.woff') format('woff');
  }
  /* roboto-900italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 900;
    src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
        url('assets/fonts/roboto-v15-latin-900italic.woff2') format('woff2'),
        url('assets/fonts/roboto-v15-latin-900italic.woff') format('woff');
  }
  `)
}
