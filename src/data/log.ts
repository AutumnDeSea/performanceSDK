import { config } from '../config';
import { reportPerf } from '../data/reportPerf';
import { roundByTwo } from '../helpers/utils';

export const logData = (
  measureName: string,
  metric: any,
  customProperties?: object
): void => {
  Object.keys(metric).forEach((key) => {
    if (typeof metric[key] === 'number') {
      metric[key] = roundByTwo(metric[key]);
    }
  });
  // Sends the metric to an external tracking service
  reportPerf(measureName, metric, customProperties);
};

/**
 * Dispatches the metric duration into internal logs
 * and the external time tracking service.
 */
export const logMetric = (
  duration: number,
  measureName: string,
  customProperties?: object
): void => {
  const duration2Decimal = roundByTwo(duration);
  if (duration2Decimal <= config.maxTime && duration2Decimal >= 0) {
    // 从内部或者外部的报告工具报告指标数据
    reportPerf(measureName, duration2Decimal, customProperties);
  }
};
