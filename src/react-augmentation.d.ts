import * as React from 'react';

declare module 'react' {
  interface DOMAttributes<T> {
    onTouchTap?: __MaterialUI.TouchTapEventHandler;
  }
}