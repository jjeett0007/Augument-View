// src/types/global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      ar?: boolean;
      'ar-modes'?: string;
      'auto-rotate'?: boolean;
      'camera-controls'?: boolean;
      'ios-src'?: string;
      'shadow-intensity'?: string;
      exposure?: string;
      'environment-image'?: string;
      'interaction-prompt'?: string;
      slot?: string;
    };
  }
}
