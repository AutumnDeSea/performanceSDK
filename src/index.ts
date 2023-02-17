/**
 * 一款免费的开源性能监控SDK
 *
 * @remarks
 * 目前能够完成监控的指标包含FCP等
 *
 * @packageDocumentation
 */
import { config } from './config';
import { D, W, WN, WP } from './data/constants';
import { logData } from './data/log';
import { getNavigationTiming } from './performance/getNavigationTiming';
import {
  disconnectPerfObserversHidden,
  initPerformanceObserver,
} from './performance/observe';
import { isPerformanceSupported } from './tools/isSupported';
import { IReportData, IDaliOptions } from './typings/types';
import ErrorTrace from './error';
import analyticsTracker from './data/analyticsTracker';
import ReportData from './data/ReportData';
import { didVisibilityChange } from './helpers/onVisibilityChange';
import { getNetworkInformation } from './helpers/getNetworkInformation';
import { reportStorageEstimate } from './data/storageEstimate';

export default class Dali {
  private v = '1.0.0';
  private reportData: IReportData;
  constructor(options: IDaliOptions = {}) {
    // 扩展基础配置
    const logUrl = options.logUrl;
    if (!logUrl) {
      throw new Error(`xxx系统监控平台${this.v}提示未传递logUrl`);
    }
    //向后台输送数据
    const insReportData = new ReportData({
      logUrl,
    });
    config.reportData = insReportData;
    //对外暴露上传接口
    this.reportData = insReportData;
    //集合数据汇总
    const _analyticsTracker = options.analyticsTracker;
    if (_analyticsTracker) {
      config.analyticsTracker = _analyticsTracker;
    } else {
      config.analyticsTracker = analyticsTracker;
    }
    config.isResourceTiming = !!options.resourceTiming;
    config.isElementTiming = !!options.elementTiming;
    config.maxTime = options.maxMeasureTime || config.maxTime;

    if (options.captureError) {
      //开启错误跟踪
      const errorTtace = new ErrorTrace();
      errorTtace.run();
    }

    //如果浏览器不支持性能指标只能放弃
    if (!isPerformanceSupported()) {
      return;
    }
    //浏览器支持的起FRP这样的Observer统计性能
    if ('PerformanceObserver' in W) {
      initPerformanceObserver();
    }
    //初始化
    if (typeof D.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      D.addEventListener(
        'visibilitychange',
        didVisibilityChange.bind(this, disconnectPerfObserversHidden)
      );
    }
    //记录系统DNS请求+白屏时间等
    logData('navigationTiming', getNavigationTiming());
    //记录用户的网速 H5+多普勒测速
    logData('networkInformation', getNetworkInformation());
    //管理离线缓存数据
    if (WN && WN.storage && typeof WN.storage.estimate === 'function') {
      WN.storage.estimate().then(reportStorageEstimate);
    }
  }
}
