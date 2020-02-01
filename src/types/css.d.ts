import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--x'?: string;
    '--y'?: string;
  }
}