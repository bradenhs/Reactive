import { cssRaw } from 'typestyle'

export function addBaseStyles() {
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
  }`)
}
