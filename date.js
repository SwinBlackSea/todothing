/**
 * date：表示时间，主要有两种表示方式：1.当地时间、2.国际标准时间
 * 注意事项：month范围0-11，如果超过范围会自动调整到你的期望时间，eg：month为15的时候，year会加1，月份为3
 */
let da = new Date()
 //########## localeTime ##########
da.getDate()
da.getMonth()
da.getHours()
//########## UTCTime ##########
da.getUTCDate()
da.getUTCMonth()
da.getUTCHours()

//local参数

//options参数

/**
 * 数据库如何存储时间的几点思考
 * 
 * 1.mysql数据库不支持自动存储offset
 * 2.如果存储本地之间很难国际化使用  eg：2020-01-17 10:10:10
 * 3.如果考虑后面的拓展性特别是国际化的时候 有两种方案可选：
 *  1).UTC时间，eg：2020-01-17 10:10:10 UTC  
 *     这种方案有个缺点就是，本地使用的时候要频繁和本地时间相互转换，如果你直接看DB就会产生混淆（难道在脑子里去转换这个时间？）
 *  2).DateTime+Offset，eg：2020-01-17 10:10:10 CST -04:00
 *     这种方案的优点就是直观明了，对于频繁的本地使用场景是不需要转换的，直接拿到DateTime的值即可，如果需要在国外使用，别人在拿到完整
 *     数据的时候也会很清晰明了，从而做一层转换
 * 
 * 综上所述，推荐使用DateTime+Offset的方式来存储时间
 * 
 */

 /**
  * 根据上面的几点思考，补充一些边缘知识
  * 1.CST:UTC+8hours
  * 2.new Date() =>Fri Jan 17 2020 13:41:23 GMT+0800 (中国标准时间)
  *   其实是带offset的，但不是CST而是GMT+0800，具体可以参考以下网站：https://blog.csdn.net/unetman/article/details/20910933
  */