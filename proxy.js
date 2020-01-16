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