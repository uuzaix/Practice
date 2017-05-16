let a = "a"

function f1() {
  a += "b"
  a += "c"
}

function f2() {
  a += "d"
  a += "e"
}

function runAsync(f) {
  setTimeout(f, 0);
}

function waitAll(computations, onBothFinished) {
  let counter = 0;
  computations.forEach(computation => {
    runAsync(() => {
      computation();
      counter++;
      if (counter === computations.length) {
        onBothFinished();
      }
    });
  });
}

function assertThat(condition) {
  if (condition) {
    console.log("pass");
  } else {
    console.log("fail")
  }
}

function any(...conditions) {
  return conditions.some(condition => condition)
}

function check() {
  assertThat(any(a === "abcde", a === "adebc"))
}

function test() {
  waitAll([f1, f2], check)
}

test();









