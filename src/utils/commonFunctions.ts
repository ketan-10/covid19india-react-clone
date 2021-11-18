// retry Promise : https://github.com/ketan-10/Testing/blob/master/coroutine-async-await/retry-promise.js
export function retry<T>(
  fn: () => Promise<T>,
  retriesLeft = 5,
  interval = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}
