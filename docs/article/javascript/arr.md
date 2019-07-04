# 数组应用篇

## 取数组中的最大值和最小值
### 方法一：Math对象
 ```js
  //es5
  let numArr0=[9,0,22,-7,42,190];
  let min0=Math.min.apply(null,numArr);
  let max0=Math.max.apply(null,numArr);

  //es6
  let _numArr1=[9,0,22,-7,42,190];
  let min1=Math.min(numArr1);
  let max1=Math.max(numArr1);
 ```
### 方法二：for循环
  ```js
  let numArr2=[9,0,22,-7,42,190];
  let min2=numArr2[0];
  let max2=numArr2[0];
  let len=numArr2.length;
  for (let i = 1; i < len; i++){
    if (numArr2[i] < min2) {
      min2 = numArr2[i];
    }
    if (numArr2[i] >max2) {
      max2 = numArr2[i];
    }
  }
  ```

## 数组求和 数组求积
### 方法一：reduce方法
```js
  let numArr3 = [1, 2, 3, 4];
  let sum3 = numArr3.reduce((x,y)=>x+y)
  let mul3 = numArr3.reduce((x,y)=>x*y)
  console.log( sum3 ); //求和，10
  console.log( mul3 ); //求乘积，24
```
  ### 方法二：for循环
```js
  let numArr4 = [1, 2, 3, 4];
  let sum4=0;
  let mul4=1;
  let len=numArr4.length;
  for(let i=0;i<len:i++){
    sum4+=i;
    mul4*=i;
  }
```
## 数组排序
### 方法一：冒泡排序
```js
  let numArr5 = [6,33,15,24,51,31];
  let len=numArr5.length;
  for(let i=0;i<len:i++){
    for(let j=0;j<len-1,j++){
      if(numArr5[j]>numArr5[j+1]){
        let temp=numArr5[j];
        numArr5[j]=numArr5[j+1];
        numArr5[j+1]=temp;
      }
    }
  }
```
### 方法二：插入排序
```js
  let numArr5 = [6,33,15,24,51,31];
  let len = numArr5.length;
  let preIndex, current;
    for(let i = 1; i < len; i++){
      preIndex = i - 1;
      current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current){
          arr[preIndex + 1] = arr[preIndex];
          preIndex--;
        }
      arr[preIndex + 1] = current;
  }
```
## 数组去重
### 方法一：reduce
```js
  let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice','Tiff','Alice'];
  let newNames = names.reduce((pre,cur)=>{
      if(!pre.includes(cur)){
        return pre.concat(cur)
      }else{
        return pre
      }
  },[])
  console.log(newNames);//["Alice", "Bob", "Tiff", "Bruce"]
```
### 方法二：for循环
```js
  let names2 = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice','Tiff','Alice'];
  let newNames2=[];
  for (let i=0, len=names2.length; i<len; i++) {

      if(!newNames2.includes(names2[i])){
        newNames2.push(names2[i])
      }
  }
  console.log(newNames2);//["Alice", "Bob", "Tiff", "Bruce"]
```
### 方法三：ES6的Set方法
```js
  let names3 = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice','Tiff','Alice'];
  const set = new Set(names3);
  newNames3 =[...set]
  console.log(newNames3);//["Alice", "Bob", "Tiff", "Bruce"]
```

## 计算数组中每个元素出现的次数
```js
  let name4 = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice','Tiff','Alice'];
  let newNames4 = name4.reduce((pre,cur)=>{
    if(cur in pre){
      pre[cur]++
    }else{
      pre[cur] = 1
    }
    console.log(pre);
    return pre
  },{})
  console.log(newNames4); //{Alice: 3, Bob: 1, Tiff: 2, Bruce: 1}
```
