function test() {
  console.log(index);
}
document.getElementById('js-btn-error').addEventListener('click', () => {
  //故意输出未赋值的变量
  test();
});
