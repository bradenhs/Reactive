import { cssRaw } from 'typestyle'

export function addBaseStyles() {
  cssRaw(`
    #app {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #eee;
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
  `)
}
