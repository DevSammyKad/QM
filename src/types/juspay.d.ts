declare module '@juspay-tech/hyper-js' {
  export function loadHyper(key: string, options: any): Promise<any>;
}

declare module '@juspay-tech/react-hyper-js' {
  export const HyperElements: any;
  export function useHyper(): any;
  export function useWidgets(): any;
  export const UnifiedCheckout: React.FC<any>;
}
