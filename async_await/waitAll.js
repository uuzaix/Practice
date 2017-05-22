let a = "a";

function f1() {
  a += "b";
  a += "c";
}

function f2() {
  a += "d";
  a += "e";
}

function runAsync(f, cb) {
  setTimeout(() => {
    f();
    cb();
  }, 0)
}

function waitAll(computations, onFinished) {
  let counter = 0;
  computations.forEach(computation => {
    runAsync(computation, () => {
      counter++;
      if (counter === computations.length) {
        console.log("onFinished")
        onFinished();
      }
    });
  });
}

function check() {
  console.log(a);
}

function test(cb) {
  waitAll([f1, f2], cb);
}

// test(check);


let result = [];

function runSequentially(testFunc, times) {
  testFunc(() => {
    if (times === 0) {
      console.log(result);
    }
    if (times > 0) {
      result.push(a);
      a = "a";
      runSequentially(testFunc, times - 1);
    }
  })
}


function testStat() {
  runSequentially(test, 10);
}

testStat();
