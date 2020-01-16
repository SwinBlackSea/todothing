//############# defination ###############
/**
 * A Promise is an object representing the eventual completion or failure of an asynchronous operation. 
 * 能够表达一个异步操作完全执行成功或失败的对象，resolve：完全成功；reject：完全失败
 */
//############# basic use ###############
function promise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //######## successfule ########
            // resolve('successfule!')

            //######## failed ########
            try {
                throw new Error('reject error!')
            } catch (e) {
                reject(e)
            }

        }, 3000)
    })
}

promise().then((value) => {
    console.log('promise.then:', value)
}).catch((reason) => {
    console.log('promise.catch:', reason)
})

//async
console.log('promise.end')

//############# chain ###############
new Promise((resolve, reject) => { console.log('start'); resolve('abc') })
    .then((value) => { throw new Error('throw new Error:' + value) })
    .catch((reason) => { console.log('catch.reason:', reason) })
    .then((value) => { console.log('then 2:' + value) })
    .then((value) => { console.log('then 3:' + value) })