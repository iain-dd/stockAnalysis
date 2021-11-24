// let size = 5;
// let string = "";
// let flag = false;

// for (let i = 0; i < size; i++) {
//   for (let j = 0; j < size; j++) {
//     if (flag == false) {
//       string = string + "#";
//     } else {
//       string = string + " ";
//     }
//     flag = !flag;
//   }
//   if (size % 2 == 0) {
//     flag = !flag;
//   }
//   string = string + "\n";
// }
// console.log(string);

// for (let i = 1; i <= 100; i++) {
//   if (i % 3 == 0 && i % 5 == 0) console.log("FizzBuzz");
//   else if (i % 3 == 0) console.log("Fizz");
//   else if (i % 5 == 0) console.log("Buzz");
//   else console.log(i);
// }

// function min(a, b) {
//   return a > b ? b : a;
// }
// console.log(min(6, 2));

// function isEven(n) {
//   n = Math.abs(n);
//   if (n == 0) console.log("is Even");
//   else if (n == 1) console.log("is Odd");
//   else isEven(n - 2);
// }
// isEven(-1);

function countChar(string, char) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] == char) count++;
  }
  return count;
}

console.log(countChar("tes", "t"));

let day1 = {
  test1: true,
  test2: [1, 2, 3],
  test3: "string",
};
console.log(day1.test2);
console.log(Object.keys(day1));

function range(start, end, increment) {
  if (increment == null) increment = 1;
  let range = [];
  for (let i = start; i <= end; i = i + increment) {
    range.push(i);
  }
  return range;
}
function sum(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i];
  }
  return sum;
}
console.log(range(2, 10, 3));

function reverseArray(list) {
  let reverseList = [];
  let length = list.length;
  for (let i = 0; i < length; i++) {
    reverseList.push(list.pop());
  }
  return reverseList;
}

function reverseArrayInPlave(list) {
  for (let i = 0; i < Math.floor(list.length / 2); i++) {
    let temp1 = list[i];
    let temp2 = list[list.length - i - 1];
    list[i] = temp2;
    list[list.length - i - 1] = temp1;
  }
}
let testArray = [1, 2, 3, 4, 5];
let testArray2 = reverseArray(testArray);

reverseArrayInPlave(testArray2);
console.log(testArray2);

function arrayToList(a) {
  let lastList = { value: a[a.length - 1], rest: null };
  for (let i = a.length - 2; i >= 0; i--) {
    let list = { value: a[i], rest: lastList };
    lastList = list;
  }
  return lastList;
}
let a = [1, 2, 3, 4, 5];
let list = arrayToList(a);

console.log(list);

function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

//console.log(listToArray(list));

function prepend(val, list) {
  let newList = { value: val, rest: list };
  return newList;
}

console.log(prepend(10, list));

let arrays = [[1, 2, 3], [4, 5], 6];

const flaten = arrays.reduce((a, b) => a.concat(b));
console.log(flaten);

var maxArea = function (height) {
  let max = 0;
  let min;
  let count = 1;
  for (let start = 0; start < height.length; start++) {
    for (let end = count; end < height.length; end++) {
      //console.log("value start:" + start + "  end:" + end)
      //console.log((height[start] > height[end] ?height[end] : height[start] )* (end - start))
      if (
        (height[start] > height[end] ? height[end] : height[start]) *
          (end - start) >
        max
      )
        max =
          (height[start] > height[end] ? height[end] : height[start]) *
          (end - start);
    }
    count++;
  }

  return max;
};
