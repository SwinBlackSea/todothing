/**
 * 反射：根据给定的对象获取这个对象的属性和属性值
 */
//获取对象的所有属性
function getAllFields(obj) {
    if (typeof obj === 'object') {
        return Reflect.ownKeys(obj)
    }
}
//为对象的每个已有的属性重新赋值
function reDefineVal(obj) {
    let fields = getAllFields(obj)
    for (var i in fields) {
        let val = fields[i]
        Reflect.set(obj, val, 'rename_' + Reflect.get(obj, val))
    }
    console.log('obj:', obj)
}

reDefineVal({ name: 'lunjiawang', age: 26 })

//apply
Reflect.apply((arg)=>{console.log('arg:',arg)},undefined,['this is a args'])