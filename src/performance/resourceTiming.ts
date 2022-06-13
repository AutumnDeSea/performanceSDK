import { config } from '../config';
import { logData } from '../data/log';
import { rt } from '../data/metrics';
import { IPerformanceEntry } from '../typings/types';

export const initResourceTiming = (performanceEntries: IPerformanceEntry[]) => {
  //console.log('🐶', performanceEntries);
  performanceEntries.forEach((entry) => {
    //console.log('🐶', 1);
    if (config.isResourceTiming) {
      logData('resourceTiming', entry);
    }
    logData('resourceTiming', entry);
    if (entry.decodedBodySize && entry.initiatorType) {
      const bodySize = entry.decodedBodySize / 1000;
      rt.value[entry.initiatorType] += bodySize;
      rt.value.total += bodySize;
    }
  });
};
