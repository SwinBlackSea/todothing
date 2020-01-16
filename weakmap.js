/**
 * A map API could be implemented in JavaScript with two arrays (one for keys, one for values) shared by the four API methods. Setting elements on this map would involve pushing a key and value onto the end of each of those arrays simultaneously. As a result, the indices of the key and value would correspond to both arrays. Getting values from the map would involve iterating through all keys to find a match, then using the index of this match to retrieve the corresponding value from the array of values. 

Such an implementation would have two main inconveniences. The first one is an O(n) set and search (n being the number of keys in the map) since both operations must iterate through the list of keys to find a matching value. The second inconvenience is a memory leak because the arrays ensure that references to each key and each value are maintained indefinitely. These references prevent the keys from being garbage collected, even if there are no other references to the object. This would also prevent the corresponding values from being garbage collected.

By contrast, native WeakMaps hold "weak" references to key objects, which means that they do not prevent garbage collection in case there would be no other reference to the key object. This also avoids preventing garbage collection of values in the map. Native WeakMaps can be particularly useful constructs when mapping keys to information about the key that is valuable only if the key has not been garbage collected.

Because of references being weak, WeakMap keys are not enumerable (i.e. there is no method giving you a list of the keys). If they were, the list would depend on the state of garbage collection, introducing non-determinism. If you want to have a list of keys, you should use a Map.
 */
/**
 * map有两个缺点：
 * 1.k-v永久存在，导致search、push的时候会遍历k数组和v数组，时间复杂度O(n)比较高；
 * 2.k-v永久存在，即使runtime的时候该k-v没有被任何其他对象引用也不会被gc回收，导致无效k-v造成内存泄漏
 * 
 * weakmap解决的就是：对无效的k-v不阻止gc，从而提升map的效率，weak的含义是对k-v的维护性是weak的
 * 
 * weakmap问题也就显而易见：获取不到所有k集合
 * 
 */