/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

interface ModelViewerJSX {
  src: string;
  alt: string;
  'auto-rotate'?: boolean;
  'camera-controls'?: boolean;
  'disable-zoom'?: boolean;
}