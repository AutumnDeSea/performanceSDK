import PerformanceSdk  from '../../src';

const pfmSDK = new PerformanceSdk({
  elementTiming: true,
  logUrl: 'http://123.com/test',
  isResourceTiming: true
});

console.log('🐻', pfmSDK);
// 模拟一个长任务
const start = Date.now();
while (Date.now() - start < 2000) {}
