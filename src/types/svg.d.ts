/// <reference types="react" />

declare module '*.svg?react' {
  import * as React from 'react';
  export default React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
