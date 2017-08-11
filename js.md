###1.作用域是：
	狭义上来说作用域是一个对象（更确切的来说是集合）；
    广义上来说是一套用来存储变量，并且之后可以方便找到这些变量的规则
    js中最普遍的作用域就是函数作用域
###2.右查询：
	对等号非左边变量的查询，在整条作用域链中，如果没有找到变量的声明，直接抛ReferenceError错误；
 ###左查询：
	对等号左边变量的查询，在整条作用域链中，如果没有找到变量的声明，js引擎会自动在全局声明一个同名变量；
▲变量的查询走的是整条作用域链，一个对象属性的查询是原型链
###3.伪数组：具有length属性的对象都可以叫做伪数组，可以遍历
###4.严格模式：“use strict”，左右查询都会报错
###5.上下文环境：相当于作用域的子集，作用域是静态的，上下文环境是动态的，代码（全局代码，函数体，eval代码）执行前的准备工作：
        a.提升（变量 函数 函数表达式）
        b.确定this的指向
        c.与对应的作用域关联
        如果代码段是函数体，那么在此基础上需要附加：参数 赋值，arguments 赋值
###6.提升：函数与变量，函数优先，函数是整体的提升，变量式声明的提升
###7. 数据类型的分类：
	基本数据类型——string，number，Boolean，null，undefined
    引用数据类型——a.自定义对象 （不管什么定义形式）
                b.自定义函数
                c.内置对象：基本数据类型的包装类（要与数据类型相对应才会产生），Object，Function，Array，Date，RegExp，Error
▲值传递与引用传递：在JavaScript中都是值传递，基本数据类型存在栈空间里传递的是值（通过值复制的方式来完成赋值/传递），引用数据类型传递的是堆里面的地址值（通过引用复制来完成赋值/传递）；
▲包装类的基本数据类型是不可以修改的
###8.js中this关键字的解析：
        主要根据：函数调用位置上的调用形式
                a.独立调用：this的默认绑定规则，this给window；严格模式下，this给undefined；
                b.隐式调用（对象.的形式）：this的隐式绑定规则，this给离函数最近的对象；
                     ▲隐式丢失：将函数通过隐式调用的形式赋值给一个变量
                               将函数通过隐式调用的形式进行传参
                c.call apply调用：this的显示绑定规则，this给call apply bind指定对象
                      ▲硬绑定：包裹函数 有一个目标函数的显示调用（bind 返回值是一个函                                                            数）,可以通过硬绑定解决隐式丢失
                d.new 调用：new绑定（this给构造出来的对象）
    ▲绑定的例外：ES6中的箭头函数，被忽略的this（如果把null或undefined作为this的绑定对象传入call，apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则），柯里化（给函数预绑定参数）。
    ★解决隐式丢失：硬绑定，bind函数的作用是返回一个新的函数，并且指定该新函数的this指向
    ▲正常数组 ：优先
        var  a =Array.apply(null,{length:3});//伪数组，相当于传了3个参数，值为undefined
    ▲稀疏数组
        var  b=new  Array(3);//相当于var  b=[ ];   b[3]=?  ，没有默认值的数组
###9.==操作符
    解析1：
        将数据类型分成两组：
            a.String，Number，Boolean和Object（有）
            b.Undefined和Null（无）
            c.1与2之间的比较都为false
            d.Undefined和Null之间的比较为true
            e.NaN 不等于 NaN
    解析2：
        将其他数据类型转换为Number：
             parseInt（value）
             parseFloat（value）
               转换情况：字符串—>只要最高位是数字则会转换成数值；否则转换为NaN；其它—>NaN
            Number（）
                转换情况：把字符串两边的空白字符串去掉，然后把两边的引号去掉，看能否组成一个合法的数字。如果是，转化结果是这个数字；否则，结果是NaN。例外是空白字符串转换为数字的结果是0。
    解析3：
        一些内置对象（Object，Array，Date，Number等）在转换时需要toString（）和valueOf（）方法。
    解析4：
        undefined == null ；//true    它俩与所有其他值比较的结果都是false
        [" "] == false;//true
###10.属性描述符（是描述属性的属性，也叫元属性；writable：true  可读写 与value共存；configurable：true  可枚举；enumerable：true  可配置）
       ▲对象的创建方式
                属性描述符都是true：var n={age：“十岁” }；
                属性描述符都是false：var n={ }；Object.defineProperty（n，“age”，{ value：“十岁”}）
                获取对象的属性的属性描述符：Object.getOwnPropertyDescriptor(n,"age")
       ▲var a = 2；var a = 3；此模式第二次的var 没有任何意义
       ▲属性描述符的解析：
                    value："b"
                        writable:true ---->一个属性的读写权限；
                        configurable:false --->一个属性的可配置权限（重新定义，删除）；
                            重新定义：writable可以从true变为false，configurable和enumerable不可改变；
                        enumerable ：true---->能不能出现在for  in 循环中
    ▲enumerable的枚举：
            判断属性是否可枚举：obj.propertysEnumerable("属性名")
            获取可枚举的属性列表：Object.keys(obj)
            获取所有的属性列表：Object.getOwnPropertyNames（obj）
###11.对象的不变性：
        a.对象常量属性：将属性的writable和configurable设置为false
        b.禁止对象扩展：调用Object.preventExtensions（obj）
        c.密封对象：调用Object.seal（obj），在禁止对象扩展的基础上将configurable设为false。
        d.冻结对象：调用Object.freeze（obj），也可以在密封对象的基础上将writable设为false。
      ▲值得注意的是：在js中，所有方法的创建都是浅不变形的，只会影响目标对象和它的直接属性
###12.存在性检查：使用关键字 in；console.log("属性名"  in  obj)
###13.
	 访问描述符：带有set和get属性描述符的属性；
     数据描述符：带有value和writable属性描述符的属性
     属性描述符：描述属性的属性（元属性）
###14.原型链：
        a.对象有隐式原型_proto_,函数有显示原型prototype，也有隐式原型_proto_ ；
        b.函数的prototype一般情况下都是一个{ }：自定义函数都是{ }，内置函数都是自己对应的实例对象（例 String.prototype是String实例对象）。两者的共同点是他们的_proto_ 共同指向Object.prototype,所以从一定意义上说函数的prototype一般情况下是{ }；
        c.一个实例对象的_proto_  指向它对应的构造函数的prototype
        d.原型链的头是：Object.prototype._proto_为null；
        e.原型链：只有隐式原型链，和显示原型
###15.在JS中没有真正的数组，都是伪数组，将伪数组转换为真数组可用的方法是：Array.prototype.slice.call(伪数组)
###16.属性的设置与获取：
    基本的设置与获取：
 	属性的设置与获取:(该属性是一个数据描述符,而且writable为true)
            获取:先找对象的直接属性再找原型链
                    如果能找到就使用该找到的属性
                    如果找不到就返回undefined
            设置:不管对象的直接属性和原型链,操作的永远是对象的直接属性
                    如果直接属性中没有该属性,则新增一个
                    如果直接属性中有该属性,则修改
      在有访问描述符后的获取与设置：略
###17.闭包的最经典解释：一个函数，能够记住，并且访问自己所处的作用域
   

        








