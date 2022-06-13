import { cls } from '../data/metrics';
import { IPerformanceEntry } from '../typings/types';

/**
 * Detects new layout shift occurrences and updates the
 * `cumulativeLayoutShiftScore` variable.
 */
export const initLayoutShift = (performanceEntries: IPerformanceEntry[]) => {
  const lastEntry = performanceEntries.pop();
  // Only count layout shifts without recent user input.
  if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
    cls.value += lastEntry.value;
  }
};
