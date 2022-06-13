interface Navigator {
  estimate: any;
  storage: any;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connection?: string;
  effectiveType?: string;
  serviceWorker?: {
    controller?: string;
  };
  sendBeacon?: any;
}
export const W = window;
export const C = W.console;
export const D = document;
export const WN = (W.navigator as unknown) as Navigator;
export const WP = W.performance;

//内存
export const getDM = () => WN.deviceMemory ?? 0;
//cpu核数
export const getHC = () => WN.hardwareConcurrency ?? 0;
