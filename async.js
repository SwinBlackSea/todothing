/**
 * more infomation:https://es6.ruanyifeng.com/#docs/async
 * 
 * 申明一个函数执行是异步的
 * 为了在一个fun中等待一个异步函数执行需要用awit，awit必须放在async中才能起作用
 * awit 后面一般跟Promise，如果不是Promise，内部会包装一个立即执行的Promise
 */
function async2secends() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('result')
        }, 2000)
    })
}
async function callAsync() {
    console.log('start---')
    console.log(await async2secends())
    console.log('end---')
    return 'end'
}
//start-- result end--- end then在async函数之后完成之后执行
callAsync().then((value) => { console.log(value) }).catch((reason) => { console.log(reason) })
//catch
async function catchError() {
    throw new Error('catchError---')
}
catchError().catch((resp) => { console.log(resp) })

//关于继发问题
async function jifa() {
    //a执行完之后再执行b
    const a = await new Promise((r, s) => { setTimeout(() => r('1'), 1000) })
    const b = await new Promise((r, s) => { setTimeout(() => r('2'), 1000) })
    //a和b同时执行，最后等待a、b都被执行完毕
    const a = new Promise((r, s) => { setTimeout(() => r('1'), 1000) })
    const b = new Promise((r, s) => { setTimeout(() => r('2'), 1000) })
    await a
    await b
}

//异步转同步
async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });

    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}