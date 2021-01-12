// simple compose
const add = (x, y) => x + y;
const square = (x) => x * x;

// const compose = (...[first, ...others]) => (...args) => {
//   let result = first(...args);
//   others.forEach((fn) => {
//     result = fn(result);
//   });
//   return result;
// };

// const fn = compose(add, square, square);

// console.log(fn(1, 2));

// async
// onion model

const compose = (middlewares) => () => {
  function dispatch(index) {
    const fn = middlewares[index];
    if (!fn) {
      // Resolve empty since all middlewares functions are Promises
      return Promise.resolve();
    }

    // Each function has a `next` passed in and need to wait for that `next` function ends and continue execution
    return Promise.resolve(fn(() => dispatch(index + 1)));
  }

  return dispatch(0);
};

async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}

async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}

function fn3(next) {
  console.log("fn3");
  next();
  console.log("end fn3");
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
const middlewares = [fn1, fn2, fn3];

const finalFn = compose(middlewares);
finalFn();
