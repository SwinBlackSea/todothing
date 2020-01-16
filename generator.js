/**
 * more infomation:https://es6.ruanyifeng.com/#docs/generator
 * 
 * generator函数返回的是一个迭代器，该迭代器中的方法在初始化的时候是不会加载的，只有触发next函数才会执行并且每次遇到
 * yield时就会中断执行并返回yield之后的值，等下次触发next方法后继续从上一次中断的地方往下执行，
 * 
 * 可以传值到next函数，该参数表示的是上一次yield之后一整个表达式的值，而不是其中的某一个变量
 * 
 * 如果generator中没有yield则和普通的函数没有区别，唯一的区别是延迟执行，也就是只有触发next方法之后才会执行
 * 
 * 优点：
 * 1.每一个yield只会执行一次，执行之后就不会被读取到值
 * 2.执行需要触发next函数，按需加载，不会在初始化的时候将所有的对象全部写入到内存
 * 3.动态传值更新generator函数的行为并动态获取值-可以在generator函数中通过if/else或者while做逻辑判断
 * 
 */
let index = 0
function* generator() {
    while (true) {
        yield ++index
    }
}

for (let index = 0; index < 10; index++) {
    let gt = generator()
    console.log(gt.next())
}

let i1 = 0
function* ge1() {
    if (i1 < 10) {
        while (true) {
            yield ++i1
        }
    }

}
let g1 = ge1()
for (let index = 0; index < 20; index++) {
    console.log(g1.next())
}
