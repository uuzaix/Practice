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
        onFinished();
      }
    });
  });
}

function check() {
  console.log(a);
}

function test() {
  waitAll([f1, f2], check);
}

test();
