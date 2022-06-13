import { logData, logMetric } from '../data/log';
import { cls, lcp, rt, tbt } from '../data/metrics';
import { perfObservers } from './observeInstances';
import { poDisconnect } from './performanceObserver';
import { PerformanceEventTiming } from '../typings/types';

export const initFirstInputDelay = (
  performanceEntries: PerformanceEventTiming[]
) => {
  //取最后的一位即为我们希望所获取的时间点
  const lastEntry = performanceEntries.pop();
 

  if (lastEntry) {
    // Core Web Vitals FID logic
    // 测量输入事件的延迟操作
    logMetric(lastEntry.processingStart - lastEntry.startTime, 'fidVitals', {
      performanceEntry: lastEntry,
    });
    // 传统的FID逻辑
    // Measure the duration of processing the first input event
    logMetric(lastEntry.duration, 'fid', {
      performanceEntry: lastEntry,
    });
  }
  // 销毁对FID的注册回调 避免过多的观察者造成内存泄露
  poDisconnect(1);
  //初始化lcp
  logMetric(lcp.value, 'lcp');
  if (perfObservers[3] && typeof perfObservers[3].takeRecords === 'function') {
    perfObservers[3].takeRecords();
  }
  logMetric(cls.value, 'cls');
  logMetric(tbt.value, 'tbt');
  // TBT with 5 second delay after FID
  setTimeout(() => {
    logMetric(tbt.value, `tbt5S`);
  }, 5000);
  // TBT with 10 second delay after FID
  setTimeout(() => {
    logMetric(tbt.value, `tbt10S`);
    //FID被激活以后10S的整体数据消耗
    logData('dataConsumption', rt.value);
  }, 10000);
};
