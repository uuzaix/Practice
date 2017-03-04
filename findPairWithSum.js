// [1,2,3,9] sum=8  -> 'no pair which sum is equal to sum'
// [1,2,4,4] sum=8 - > [4, 4]

function findPairWithSum(arr, sum) {
  minIndex = 0;
  maxIndex = arr.length - 1;

  while (minIndex < maxIndex) {
    let tempSum = arr[minIndex] + arr[maxIndex];
    if (tempSum === sum) {
      return [arr[minIndex], arr[maxIndex]]
    } else if (tempSum > sum) {
      maxIndex--;
    } else {
      minIndex++;
    }
  }
  return 'no pair'
  }

console.log(findPairWithSum([1, 2, 3, 9], 8))
console.log(findPairWithSum([1, 2, 4, 4], 8))
console.log(findPairWithSum([1, 3, 4, 4, 5], 8))
console.log(findPairWithSum([], 8))