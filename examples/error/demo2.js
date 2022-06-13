Promise.reject('promise error1');
new Promise((resolve, reject) => {
  reject('promise error2');
});
new Promise((resolve) => {
  resolve();
}).then(() => {
  throw 'promise error3';
});
