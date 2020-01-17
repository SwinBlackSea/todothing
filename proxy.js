/**
 * more infomation:https://es6.ruanyifeng.com/#docs/proxy
 * 
 * proxy:对目标对象架设了一层拦截，外界访问该目标对象之前要经过这层拦截，该拦截可以修改目标对象的默认行为，这种修改是在新生成的代理对象的基础上做的修改而不改变原目标对象
 * 
 */
//get，修改目标的get行为
function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    };

    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c

//validator：通过代理实现对象赋值强校验
let validator = {
    set: (obj, propKey, value) => {
        if (!Number.isInteger(value)) {
            throw new TypeError('the value should be a integer!')
        }
        if (value > 300) {
            throw new RangeError('the value should not extend 300!')
        }
        Reflect.set(obj, propKey, value)
        return true
    }
}
let person = new Proxy({}, validator)
person.age = ''//TypeError
person.age = 100//correct
person.age = 300//RangeError