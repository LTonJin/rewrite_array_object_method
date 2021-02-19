// 数组常用方法 forEach map filter every some reduce



const arr = [
  {
    name: 'zs',
    age: 11
  },
  {
    name: 'ks',
    age: 22
  },
  {
    name: 'uzi',
    age:23
  },
  {
    name: 'thesky',
    age: 23,
    fauter: ['eat', {a: 1}]
  }
]

const obj = {
  name: 'ltj',
  age: '28',
  skill: ["JS", "CSS", "HTML"],
  students: {
    name: 'xs',
    age: 18
  }
}

// arr.myForEach(function(item, index, arr) {
//   console.log(this, '--------');
//   console.log(item, index, arr);
// },obj)

// const newArr = arr.myMap(function (item, i, arr) {
//   console.log(item, i, arr);
//   console.log(this, '=========');
//   item.age = item.age * 10;
//   return item;
// },obj)
// arr[3].fauter[1].a = 123;
// console.log(newArr, 'newArr');

// const myFilter = arr.myFilter(function (item, i, arr) {
//   console.log(item, i, arr);
//   return item.age > 20;
// })
// arr[3].fauter[1].a = 123;
// console.log(myFilter, 'myFilter');

// const myEvery = arr.myEvery(function (item, i, arr) {
//   console.log(item, i, arr);
//   return item.age > 10;
// })
// console.log(myEvery, 'myEvery');

// const mySome = arr.mySome(function (item, i, arr) {
//   console.log(item, i, arr);
//   return item.age === 11;
// })
// console.log(mySome, 'mySome');

// const myreduce = arr.myReduce(function (total, item, i, arr) {
//   console.log(item);
//   return [...total, item];
// },[]);
// arr[3].fauter[1].a = 123;
// console.log(myreduce, "myReduce");


// const myCreate = Object.myCreate(
//   { name: "zs" },
//   {
//     a: {
//       value: 1,
//       configurable: true,
//     },
//     b: {
//       value: 2,
//       enumerable: true,
//       writable: true,
//     },
//   }
// );
// console.log(myCreate, "myCreate");

// for (const k in myCreate) {
//   console.log(k);
// }



// var o1 = {
//   a: 1,
//   get b() {
//     return 2;
//   }
// }
// console.log(Object.myAssign({}, o1));