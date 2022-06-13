import ReportData from '../data/ReportData';
import { IDaliConfig, IReportData } from '../typings/types';

export const config: IDaliConfig = {
  // Metrics
  reportData: new ReportData({ logUrl: 'hole' }),
  isResourceTiming: false,
  isElementTiming: false,
  // Logging
  maxTime: 15000,
};
