function test() {
  console.log(index);
}
document.getElementById('js-btn-error').addEventListener('click', () => {
  //故意输出未赋值的变量
  test();
});

document.getElementById('js-img').setAttribute('src', '404.png');
