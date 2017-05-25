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
        // console.log("onFinished")
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

function runSequentially(testFunc, times, intermediateCall, lastCall) {
  testFunc(() => {
    if (times === 0) {
      lastCall();
    }
    if (times > 0) {
      intermediateCall();
      runSequentially(testFunc, times - 1, intermediateCall, lastCall);
    }
  })
}


let stat = { total: 0 };
function testStat(times) {
  runSequentially(
    test,
    times,
    () => {
      stat.total = stat.total + 1;
      if (stat[a]) {
        stat[a] = stat[a] + 1;
      } else {
        stat[a] = 1;
      }
      a = "a";
    },
    () => {
      console.log(stat);
    }
  );
}

testStat(1000);
