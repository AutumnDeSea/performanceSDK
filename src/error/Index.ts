import { config } from '../config';
import { W } from '../data/constants';
//rrweb引入到了这里
import { AskPriority } from '../typings/types';
type ErrorInfo = {};
class ErrorTrace {
  private errordefo: ErrorInfo;
  constructor() {
    this.errordefo = {};
  }
  //全局捕获同步+异步错误
  private globalError() {
    console.log('上报sdk');
    console.log('[ ❌全局捕获错误 ]');
    W.onerror = (
      eventOrMessage: Event | string,
      scriptURI?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ): boolean => {
      console.log('[ 我知道错误了 ]', eventOrMessage);
      const errorInfo = JSON.stringify({
        scriptURI,
        lineno,
        colno,
        error,
      });
      //通过错误信息还原sourcemap源文件地址
      console.log(errorInfo);
      config.reportData.sendToAnalytics(AskPriority.IDLE, errorInfo);
      return true;
    };
  }
  //资源挂载失败 如404png
  private networkError() {
    W.addEventListener(
      'error',
      function (e: ErrorEvent) {
        if (e.target !== W) {
          console.log('🖼网络错误', e.target);
        }
      },
      true
    );
  }
  //异步Promise错误
  private promiseError() {
    W.addEventListener('unhandledrejection', function (e) {
      e.preventDefault();
      console.log('我知道 promise 的错误了', e.reason);
      return true;
    });
  }
  private iframeError() {
    const frames = W.frames;
    for (let i = 0; i < frames.length; i++) {
      frames[i].addEventListener(
        'error',
        (e) => {
          console.log('addEventListener');
          console.log(e);
        },
        true
      );

      frames[i].addEventListener(
        'unhandledrejection',
        function (e) {
          console.log('unhandledrejection');
        },
        true
      );
    }
  }
  // private consoleReflect() {
  //   const console_error = W.console.error;
  //   W.console.error = function () {
  //     config.reportData.sendToAnalytics(AskPriority.IDLE, errorInfo);
  //     console_error.apply(window, arguments);
  //   };
  // }
  public run() {
    this.networkError();
    //触发全体数据监听错误
    this.globalError();
    //触发promise的错误
    this.promiseError();
  }
}
export default ErrorTrace;
