/**
 * object
 * 
 * more infomation :https://es6.ruanyifeng.com/#docs/object-methods
 */
/**
 * object.is 
 * ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
 * 和(===)唯一的区别在于以下两个特殊的比较 +0===-0、NaN===NaN
 */
Object.is({}, {})//=>false
//ES5如何使用这个方法？
Object.defineProperty(Object, 'is', {
    value: function (x, y) {
        if (x === y) {
            // 针对+0 不等于 -0的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
});

/**
 * Object.assign(target,source1,source2)
 * 浅拷贝源对象所有可枚举属性，且如果是包装对象，该对象的属性如果是私有属性([[PrimitiveValue]])也不可拷贝
 */
Object.assign({}, true, 10, 'abc')//=>{0: "a", 1: "b", 2: "c"} 这是因为10和true的包装对象的属性都是PrimitiveValue的，字符串的包装对象属性是可枚举的
//包装对象
Object('abc')//=>{0: "a", 1: "b", 2: "c"}

//浅拷贝:如果源对象中的某一个可枚举属性是一个对象，那么这个属性被拷贝的是一个引用而不是对象
let a = { id: { name: 'lunjiawang' } }
let b = {}
Object.assign(b, a)
a.id.name = 'SwinBlackSea'
console.log(b.id.name)

//会将被拷贝的枚举值全部覆盖目标值
let ba = Object.assign({ a: { name: 'lunjiawang', age: 12 } }, { a: { name: 'swinblacksea' } })//ba会丢失age属性
//对数组的处理
Object.assign([4, 3, 5, 9], [1, 3, 10])//=>[1,3,10,9]   将数组[4,3,5,9]视为{0:4,1:3,2:5,3:9}  即数组的包装类型，和字符串类似
//assign只会进行值复制而不会进行函数复制，如何将函数也可以复制呢？其中getOwnPropertyDescriptors在ES6中存在，foo是一个赋值属性
const copyFun = (target, source) => {
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
}
//对象clone,但是这种clone是浅拷贝的
const cloneFun = (obj) => {
    return Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    )
}


//原型链
let protype = Object.getPrototypeOf({ name: 'lunjiawang' })//获取原型链
let newObj = Object.create(protype)//根据原型链创建新的对象，这个对象的继承关系和原对象保持一致

/**
 * Object.getOwnPropertyDescriptor
 * 描述属性：writable(可写),enmurable(可枚举),configurable(可配置)
 */
//ES5
Object.getOwnPropertyDescriptor(obj, 'name')//回去对象的某个属性的描述属性
//ES6
Object.getOwnPropertyDescriptors(obj)//获取该对象的所有属性对应的描述属性
//ES5如何使用getOwnPropertyDescriptors？
Object.defineProperty(Object, 'getOwnPropertyDescriptors', {
    value: function (obj) {
        let resultSet = []
        for (let key of Reflect.ownKeys(obj)) {
            resultSet[key] = Object.getOwnPropertyDescriptor(obj, key)
        }
    }
})
