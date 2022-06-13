import { C } from '../data/constants';
import { perfObservers } from './observeInstances';
import { IPerformanceObserverType } from '../typings/types';

/**
 * PerformanceObserver 异步订阅封装
 */
export const po = (
  eventType: IPerformanceObserverType,
  cb: (performanceEntries: any[]) => void
): PerformanceObserver | null => {
  try {
    const perfObserver = new PerformanceObserver((entryList) => {
      console.log('🍌--》〉', entryList.getEntries())
      cb(entryList.getEntries());
    });
    // 订阅时间或者开始计时 buffered不立即执行在内存中留下PerformanceObserver实例
    perfObserver.observe({ type: eventType, buffered: true });
    return perfObserver;
  } catch (e) {
    C.warn('Dali.js:', e);
  }
  return null;
};
//断开测试通道
export const poDisconnect = (observer: any) => {
  if (perfObservers[observer]) {
    perfObservers[observer].disconnect();
  }
  delete perfObservers[observer];
};
