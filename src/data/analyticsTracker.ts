import { IAnalyticsTrackerOptions } from '../typings/types';
const analyticsTracker = (options: IAnalyticsTrackerOptions): void => {
  //   console.log(Math.random());
  //   console.log('-------');
  const {
    metricName,
    eventProperties,
    data,
    navigatorInformation,
    vitalsScore,
  } = options;
  console.log(options);
};
export default analyticsTracker;
