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

//MongoDB对mapreduce的实现，MongoDB是一种NoSQL数据库
//需求：统计observations表中每个月鲨鱼的数量
//map函数将每一行记录映射成{“2020-1”,12},{“2020-1”,10}数据结构
//reduce函数将map映射的结果中所有相同的key对应的value相加得到{“2020-1”,22}的数据结果
db.observations.mapReduce(function map() {
        var year = this.observationTimestamp.getFullYear();
        var month = this.observationTimestamp.getMonth() + 1;
        emit(year + "-" + month, this.numAnimals);
    },
    function reduce(key, values) {
        return Array.sum(values);
    },
    {
        query: {
          family: "Sharks"
        },
        out: "monthlySharkReport"
    });
