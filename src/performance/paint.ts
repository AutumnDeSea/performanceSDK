import { IPerformanceEntry } from '../typings/types';
import { fcp, fcpEntryName, lcp } from '../data/metrics';
import { po, poDisconnect } from './performanceObserver';
import { perfObservers } from './observeInstances';
import { initTotalBlockingTime } from './totalBlockingTime';
import { logMetric } from '../data/log';
export const initFirstPaint = (performanceEntries: IPerformanceEntry[]) => {
  performanceEntries.forEach((entry) => {
    if (entry.name === 'first-paint') {
      logMetric(entry.startTime, 'fp');
    } else if (entry.name === fcpEntryName) {
      fcp.value = entry.startTime;
      logMetric(fcp.value, 'fcp');
      perfObservers[4] = po('longtask', initTotalBlockingTime);
      poDisconnect(0);
    }
  });
};
export const initLargestContentfulPaint = (
  performanceEntries: IPerformanceEntry[]
) => {
  const lastEntry = performanceEntries.pop();
  if (lastEntry) {
    lcp.value = lastEntry.renderTime || lastEntry.loadTime;
  }
};
export const initElementTiming = (performanceEntries: IPerformanceEntry[]) => {
  performanceEntries.forEach((entry) => {
    if (entry.identifier) {
      logMetric(entry.startTime, entry.identifier);
    }
  });
};
