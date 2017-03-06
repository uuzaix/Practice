function binarySearch(arr, val) {
  let [low, high] = [0, arr.length - 1]
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    // console.log("low ", low, "mid ", mid, "high ", high)
    if (arr[mid] < val) {
      low = mid + 1;
    } else if (arr[mid] > val) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}


function binarySearchRec(arr, val) {
  function bs(arr, val, low, high) {
    let mid = Math.floor((low + high) / 2);
    // console.log("low ", low, "mid ", mid, "high ", high)
    if (low > high) {
      return -1
    } else if (arr[mid] === val) {
      return mid
    } else if (arr[mid] > val) {
      return bs(arr, val, low, mid - 1)
    } else {
      return bs(arr, val, mid + 1, high)
    }
  }
  return bs(arr, val, 0, arr.length - 1)
}

console.log("binarySearch ", binarySearch([1, 3, 4, 5, 24, 56, 88, 89], 24))
console.log("recursive ", binarySearchRec([1, 3, 4, 5, 24, 56, 88, 89], 24))
console.log("binarySearch ", binarySearch([3, 4, 5, 24, 56, 88, 89], 23))
console.log("recursive ", binarySearchRec([3, 4, 5, 24, 56, 88, 89], 23))
console.log("binarySearch ", binarySearch([1], 23))
console.log("recursive ", binarySearchRec([1], 23))
console.log("binarySearch ", binarySearch([23], 23))
console.log("recursive ", binarySearchRec([23], 23))
console.log("binarySearch ", binarySearch([], 23))
console.log("recursive ", binarySearchRec([], 23))