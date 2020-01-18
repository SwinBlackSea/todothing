/**
 * 生成对象的几种方法
 */
//######### 1.ES5通过构造函数 #########
function Student5(name, age) {
    this.name = name;
    this.age = age;
}
Student5.prototype.toString = function () {
    return '(' + this.name + ',' + this.age + ')'
}
let stu = new Student5('lunjiawang', 26)
//######### 2.ES6通过class方式 #########
class Student6 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    //在类中定义方法的时候不需要加function关键字
    toString() {
        return '(' + this.name + ',' + this.age + ')'
    }
}
let stu = new Student6('lunjiawang', 26)
typeof Student6 //=>function  类的本身就是函数
Student6 === Student6.prototype.constructor //=>true 类本身就是指向构造函数

//########### prototype ############
class Student7 {
    constructor() {

    }
    do() {
        console.log('do')
    }
    go() {
        console.log('go')
    }
}
    //上面等同于
    Student7.prototype = {
    constructor() {
},
    do () {
},
    go() {
},
}

//可以通过prototype直接为类添加方法
Object.assign(Student7.prototype, {
    toString() { },
    goHome() { },
})

/**
 * 以上两种方法的却别；ES5定义的类中的方法 [class].prototype 都是可枚举的(不是对象)，ES6类中定义的方法都是不可枚举的
 */
Object.keys(Student5.prototype) //=>['toString']
Object.getOwnPropertyNames(Student5.prototype)//=>['toString']
Object.keys(Student6.prototype) //[]
Object.getOwnPropertyNames(Student6.prototype)//=>['toString']

/**
 * class中的属性和方法除非显示地定义在this上才会被定义在对象上，否则都是被定义在该对象的原型链上
 */
//定义类
class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

/**
 * getter && setter
 * 这两个方法设置在
 */
class MyClass {
    constructor() {
        // ...
    }
    //只是重写prop属性的getter方法
    get prop() {
        return 'getter';
    }
    //只是重写prop属性的setter方法
    set prop(value) {
        console.log('setter: ' + value);
    }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
//这两个函数设置在descritor中的每个属性上，因为getter&&setter是对每个属性的操作
Object.getOwnPropertyNames(Object.getOwnPropertyDescriptor(MyClass.prototype, 'html'))//=>["get", "set", "enumerable", "configurable"]

/**
 * 类的方法名可以是动态的，采取表达式的方式
 */
let methodName = 'methodName'
class Method {
    constructor() { }
    [methodName](value) {
        console.log(value)
    }
}
let mt = new Method()
mt.methodName('method---name')//=>method---name


//############# 3.通过class定义 ################
let MyClass = class Me {
    constructor() { }
    doSt(value) {
        console.log(value)
    }
}
//Me只会在class的block内部有用，外部只能用MyClass，所以也可以写成下面形式
let person = new class {
    constructor(name) { this.name = name }
    doSt(value) {
        console.log(value)
    }
}('lunjiawang')
person.name//=>'lunjiawang'

/**
 * 注意点：
 * 1.ES6都是严格模式，主要是因为class和模块中都是默认执行严格模式，而ES6后面都会使用模块
 * 2.ES6不会有class的hoist(类型提升)，主要是因为class的extend，如果有类型提升就会导致问题
 * 3.
 */
let Parent = new class { }
class Childer extends Parent {

}
//如果对class进行了类型提升就会使得Parent还没有定义就被继承导致ReferenceError

/**
 * 静态方法,只能被类调用不能被对象调用
 * 父类的静态方法可以被子类继承
 */
class StaticMethod {
    static eat(food) {
        console.log(food)
    }
}

/**
 * 关于单独使用类中方法的几点问题，找不到this
 */
class This {
    constructor() {
        //method1
        //this.doSt = this.doSt.bind(this)

    }
    doSt() {
        this.doTh('doTh')
    }
    doTh(value) {
        console.log('doTh---', value)
    }
}
let t = new This()
const { doSt } = t
doSt()//=>Uncaught TypeError: Cannot read property 'doTh' of undefined
//怎么办？使用bind，见上

/**
 * 实例属性新写法，直接放在类中，不需要在construtor中使用this.的方式
 */
class Food {
    __name__ = 'apple'
    constructor() { }
    doSt(value) { console.log(value) }
}
/**
 * 静态属性
 */
class Cub {
    static def_name = 'cub'
    constructor() { }
    doSt(value) { console.log(value) }
}

/**
 * new.target 一般在constructor中调用，返回一个constructor
 */
function CL(name, age) {
    if (new.target === CL) {
        this.name = name
        this.age = age
    } else {
        throw new Error('obj must be created by new keyword!')
    }
}
//or
class CL {
    constructor(name, age) {
        if (new.target === CL) {
            this.name = name
            this.age = age
        } else {
            throw new Error('obj must be created by new keyword!')
        }
    }
}
//test
let cl = new CL('lunjiawang', 12)
CL.call(cl, 'sw', 12)