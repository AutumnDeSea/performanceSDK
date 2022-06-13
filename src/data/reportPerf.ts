import { config } from '../config';
import { getNavigatorInfo } from '../helpers/getNavigatorInfo';
import { visibility } from '../helpers/onVisibilityChange';
import { pushTask } from '../helpers/utils';
import { getVitalsScore } from '../helpers/vitalsScore';

/**
 * Sends the User timing measure to analyticsTracker
 */
export const reportPerf = function (
  measureName: string,
  data: any,
  customProperties?: object
): void {
  pushTask(() => {
    //console.log('[ measureName ]', measureName);
    // 当页面被隐藏的时候不报告具体数据
    if (
      (visibility.isHidden && measureName.indexOf('Final') < 0) ||
      !config.analyticsTracker
    ) {
      return;
    }
    // Send metric to custom Analytics service
    config.analyticsTracker({
      metricName: measureName,
      data,
      eventProperties: customProperties || {},
      navigatorInformation: getNavigatorInfo(),
      vitalsScore: getVitalsScore(measureName, data),
    });
  });
};
