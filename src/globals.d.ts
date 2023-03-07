import { ComponentType } from 'react';

declare global {
  interface Window {
    CMS: {
      registerWidget(
        name: string,
        control: ComponentType<any>,
        preview?: ComponentType<any>,
        schema?: Record<string, any>
      ): void;
    };
  }
}
