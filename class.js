/**
 * 生成对象的几种方法
 */
//######### 通过构造函数 #########
function Student5(name, age) {
    this.name = name;
    this.age = age;
}
Student5.prototype.toString = function () {
    return '(' + this.name + ',' + this.age + ')'
}
let stu = new Student5('lunjiawang', 26)
//######### ES6通过class方式 #########
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
let stu = new Student(6'lunjiawang', 26)
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

