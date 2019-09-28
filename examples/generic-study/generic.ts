// function identify<T>(arg: T):T {
//   return arg
// }
// interface Genertic<T> {
//   (arg: T):T
// }
// let myGenertic: Genertic<number> =identify


// 敲黑板，范型类只适用于类的实例部分。范型类
// class Genertic <T> {
//   defaultV: T
//   add:(x:T, y:T) => T
// }
// let myGenertic = new Genertic<number>()
// myGenertic.defaultV = 0
// myGenertic.add = function(x, y) {
//   return x+y
// }
// myGenertic.add(1,2)

/* 范型约束1
interface IdentifyLength {
  length: number
}

function identify<T extends IdentifyLength>(arg: T):T {
  console.log(arg.length)
  return arg
}
identify([1,2,3])
*/

/* 范型约束2

function getProperty<T, K extends keyof T>(obj: T,key: K) {
  return obj[key]
}
let X = {a:1,b:2,c:3}
getProperty(X, 'e') // error,因为e不在X的key中
getProperty(X, 'a')
*/

/* 范型约束3 范型中使用类类型
在这里T就是类的实例类型，c是工厂函数的构造器
function create<T>(c: {new(): T }): T {
    return new c();
}
*/
/* 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
*/


