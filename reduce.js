/**
 * map_2_reduce
 * map:映射
 * reduce:合并，不断减少元素的个数到1个
 */
//map
[1, 2, 'a'].map((v) => v + 'b')//=>["1b", "2b", "ab"]
//reduce
'abcadjahfbajbdavksvkos'.split('').reduce((preResult, currItem) => {
    preResult[currItem] = preResult[currItem] ? preResult[currItem] + 1 : preResult[currItem] = 1
    return preResult
}, {})//=>{a: 5, b: 3, c: 1, d: 2, j: 2, …}
