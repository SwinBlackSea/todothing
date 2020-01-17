/**
 * thenable对象：类中有then方法的对象，then方法其实是一个Promise
 */
class Sleep {
    constructor(timeout) {
      this.timeout = timeout;
    }
    then(resolve, reject) {
      const startTime = Date.now();
      setTimeout(
        () => resolve(Date.now() - startTime),
        this.timeout
      );
    }
  }
  
  (async () => {
    const sleepTime = await new Sleep(1000);
    console.log(sleepTime);
  })();