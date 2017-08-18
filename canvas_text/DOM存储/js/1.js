/**
一个很耗时的JS：
复杂的算法：天量的枚举和遍历、嵌套、递归
例如：大数的质数判定
**/

var num = 92929138418911121;
console.time('质数判定计时');
var result = isPrime(num);
console.timeEnd('质数判定计时');
console.log(num+'是质数吗：'+result);


function isPrime(num){
  console.log('开始进行质数判定...');
  var result = false;

  //让CPU疯狂的执行5s的死循环
  var start = new Date().getTime();
  do{
    var now = new Date().getTime();
  }while( now-start<5000 );

  for(var i=2; i<num; i++){
    if(num%i===0){
      break;
    } 
  }
  if(i===num){
    result = true;
  }else {  
    result = false;
  }

  console.log('质数判定执行结束...');
  return result;
}