/**
 * The Int8Array typed array represents an array of twos-complement 8-bit signed integers. 
 * The contents are initialized to 0. Once established, you can reference elements in the array using the object's methods, 
 * or using standard array index syntax (that is, using bracket notation).
 */

/**
 * Int8Array just include integer which is twos-complement 8-bit signed:只能存储二进制8bit的整数
 * capacity is initialized and cannot change after the array is inited:容量在初始化之后不能发生更改
 */

//how to convert string to byte?
function str2by(str) {
    let r = ''
    if (!window.TextEncoder) {
        console.log('this is is not have TextEncoder')
    } else {
        let enc = new TextEncoder()
        let r = enc.encode(str)
    }
    return r
}
//how to convert byte to string?
function ty2str(byte) {
    let r = ''
    if (!window.TextDecoder) {
        console.log('this is is not have TextDecoder')
    } else {
        let enc = new TextDecoder()
        let r = enc.decode(byte)
    }
    return r
}
//how to convert str to arrayBuffer
function str2ab(str) {
    let buf = new ArrayBuffer(str.length * 2)
    let u16 = new Uint16Array(buf)
    let strLen = str.length;
    for (var i = 0; i < strLen; i++) {
        u16[i] = str.charCodeAt(i)
    }
    return buf
}
//how to convert arrayBuffer to str 
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}