

// 对象分类区分 函数、普通对象
;(document.ready = function(){
  var o1 = {}; 
  var o2 =new Object();
  var o3 = new f1();
  function f1(){}; 
  var f2 = function(){};
  var f3 = new Function('str','console.log(str)');
  console.log(typeof Object); //function 
  console.log(typeof Function); //function  
  console.log(typeof f1); //function 
  console.log(typeof f2); //function 
  console.log(typeof f3); //function   
  console.log(typeof o1); //object 
  console.log(typeof o2); //object 
  console.log(typeof o3); //object
});

// 构造函数
;(document.ready = function(){
    function Person(name, age, job) {
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = function() { alert(this.name) } 
    }
    var person1 = new Person('Zaxlct', 28, 'Software Engineer');
    var person2 = new Person('Mick', 23, 'Doctor');

    // 构造函数的prototype(原型对象)，该对象包含一个 constructor指针，指向构造函数
    console.log(Person.prototype.constructor == Person) // true
    // 实例都有一个指向原型对象的内部指针
    console.log(person1.__proto__ == Person.prototype); // true
    // 实例的constructor 属性指向构造函数
    console.log(person1.constructor == Person); // true

    console.log(person1.constructor == Person.prototype.constructor); // true

    // 区分原型对象隶属
     /*console.log(Person.prototype, JSON.stringify(Person.prototype)) //Person{}  {}
     console.log(typeof Person.prototype) //Object
     console.log(typeof Function.prototype) // Function，这个特殊
     console.log(typeof Object.prototype) // Object
     console.log(typeof Function.prototype.prototype) // undefined
     // Funtion.prototype 来源
     // var A  = new Function()
     // Function.prototype = A;
     // console.log(Function.prototype.constructor == Function) // */
 
});
// js 构造函数的原型对象
(document.ready = function() {
  console.log("null:", typeof(null));
  console.log("undefined:", typeof(undefined));
  console.log("string:", typeof(String), JSON.stringify(String.prototype))
  console.log("Number:", typeof(Number), JSON.stringify(Number.prototype));
  console.log("Boolean:", typeof(Boolean), JSON.stringify(Boolean.prototype));
  console.log("Object:", typeof(Object), JSON.stringify(Object.prototype));
  console.log("Function:", typeof(Function), JSON.stringify(Function.prototype));

  console.log("Number",Number.__proto__ === Function.prototype ) // true
  console.log("Number",Number.constructor == Function )//true

  console.log("Boolean",Boolean.__proto__ === Function.prototype )// true
  console.log("Boolean",Boolean.constructor == Function )//true

  console.log("String",String.__proto__ === Function.prototype ) // true
  console.log("String",String.constructor == Function )//true

// 所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身
  console.log("Object",Object.__proto__ === Function.prototype ) // true,
  console.log("Object",Object.constructor == Function )// true 
  console.log("Object",Object.prototype.__proto__)// null 

// 所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身
  console.log("Function.__proto__ === Function.prototype",Function.__proto__ === Function.prototype) // true
  console.log(Function.constructor == Function )//true
  console.log(Function.prototype.__proto__ === Object.prototype, JSON.stringify(Function.prototype.__proto__)) // true

  console.log(" Array.__proto__ === Function.prototype",Array.__proto__ === Function.prototype)   // true
  console.log("Array.constructor == Function",Array.constructor == Function )//true

  console.log("RegExp.__proto__ === Function.prototype",RegExp.__proto__ === Function.prototype)  // true
  console.log("RegExp.constructor == Function",RegExp.constructor == Function )//true

  console.log(Error.__proto__ === Function.prototype)   // true
  console.log(Error.constructor == Function )//true

  console.log(Date.__proto__ === Function.prototype)    // true
  console.log(Date.constructor == Function) //true

})();

// 构造对象的几种方式
;(document.ready = function() {
  // 自定函数
  var B = function(){};
  var c = new B();
  // 字面量
  var d = {};
  // 构造函数
  var e = new Object();
  // 原型式继承
  var f = Object.create(d);

  console.log("function：")
  console.log("B.prototype.__proto__ == Object.prototype:", B.prototype.__proto__ == Object.prototype )
  console.log("B.__proto__  == Function.prototype ", B.__proto__  == Function.prototype)
  console.log("B 的实例c：", c.constructor, c.constructor.prototype)
  console.log("c.__proto__ == B.prototype",c.__proto__ == B.prototype)

  console.log("========{}========")
  console.log("d.__proto__:", d.__proto__);
  console.log("d.__proto__ == Object.prototype:", d.__proto__ == Object.prototype);
  console.log("d.__proto__.__proto__ == ", d.__proto__.__proto__ );
  console.log("========{}========")

  console.log("=====new Object()=====")
  console.log("e.__proto__ == Object.prototype :", e.__proto__ == Object.prototype)
  console.log("e.__proto__.__proto__ :", e.__proto__.__proto__)
  console.log("e.prototype:", e.prototype)
  console.log("=====new Object()=====")

  console.log("=====Object.create()=====")
  console.log("f.__proto__ == d", f.__proto__ == d, f.__proto__, d.__proto__);
  console.log("f.__proto__.__proto__.__proto__ ", f.__proto__.__proto__.__proto__);
  console.log("=====Object.create()=====")

});

;(document.ready = function() {
  /*
    Object Function
  */
  var o1 = {}; 
  var o2 =new Object();
  var o3 = new f1();

  function f1(){}; 
  var f2 = function(){};
  var f3 = new Function('str','console.log(str)');

  console.log('"Object"', typeof Object)
  console.log('"Function"', typeof Function)
  console.log('"f1"', typeof f1, f1.prototype.__proto__ == Object.prototype, "函数对象f1：" , f1.__proto__ == Function.prototype); //function 
  console.log('"f2"', typeof f2); //function 
  console.log('"f3"', typeof f3); // functiono
  console.log('"o1"', typeof o1); //function 
  console.log('"o2"', typeof o2, "o2.constructor == Object:",o2.constructor == Object); //function 
  console.log('"o3"', typeof o3); // function
  /*
    凡是通过 new Function() 创建的对象都是函数对象，其他的都是普通对象。f1,f2,归根结底都是通过 new Function()的方式进行创建的。Function Object 也都是通过 New Function()创建的
  */

  function Person() {}
  var p1 = new Person()
  Person.prototype = {
    constructor: Person,
     name:  'Zaxlct',
     age: 28,
     job: 'Software Engineer',
     sayName: function() {
       alert(this.name);
     }
  }
    var p2 = new Person()
    p1.sayName();

  });

  // 自定义函数构造函数实例化对象
;(document.ready = function(){
  // Node
  var Obj = function(){}; 
  var o = new Obj(); 
  console.log(o.__proto__ === Obj.prototype, o.__proto__.__proto__.__proto__, Function.__proto__.__proto__)
  o.__proto__ === Obj.prototype;  //=> true 
  o.__proto__.constructor === Obj; //=> true
  console.log(Obj.__proto__ == Function.prototype)
   
  Obj.__proto__ === Function.prototype; //=> true 
  Obj.__proto__.constructor === Function; //=> true
   
  Function.__proto__ === Function.prototype; //=> true 
  Object.__proto__ === Object.prototype;     //=> false 
  Object.__proto__ === Function.prototype;   //=> true
   
  Function.__proto__.constructor === Function;//=> true 
  Function.__proto__.__proto__;               //=> {} 
  Function.__proto__.__proto__ === o.__proto__.__proto__; //=> true 
  o.__proto__.__proto__.__proto__ === null;   //=> true
});

;(document.ready = function(){
  // 原型继承

  // 父类构造函数
  function Person(name) {
    this.name= name;
    this.friends = [];
  }
  Person.prototype.getName = function(){
    return this.name;
  }
  // 子类构造函数
  /* 原型链*/
  /*
    function Chineseperson(skin) {
        this.skin = skin;
    }
    Chineseperson.prototype = new Person(); // 字面量定义原型，原型链被强行断开
    Chineseperson.prototype.constructor = Chineseperson; //  构造函数属性 指回Chinaperson 构造完整的原型链
  
    var p1 = new Chineseperson('yellow');
    var p2 = new Chineseperson('white');
    p1.friends.push('lilei');
    p2.friends.push('Tom');
    console.log("p1:", p1.name, "p2:", p2.name); // p1: undefined p2: undefined
    console.log('p1', p1.friends) // ["lilei", "Tom"]
    console.log('p2', p2.friends) // ["lilei", "Tom"]
    console.log('p1', p1.getName() , p2.getName())
    console.log('p1', p1.getName() ==  p2.getName()) // true
  */
  // 借构造函数
  /*
    借构造函数
  */
  /*function Chineseperson(skin, name) {
    Person.call(this, name)
    this.skin = skin;
  }
  Chineseperson.prototype.getSkin = function(){
    return this.skin;
  }
  var p1 = new Chineseperson('yellow','limei');
  var p2 = new Chineseperson('white', 'lily');
  p1.friends.push('lilei');
  p2.friends.push('Tom');
  console.log("p1:", p1.name, "p2:", p2.name); // p1: limei p2: lily
  console.log('p1', p1.friends) // ["lilei"]
  console.log('p2', p2.friends) // [ "Tom"]
  console.log('p1', p1.getSkin() , p2.getSkin())  
  console.log('p1', p1.getName() , p2.getName()) // Error */
  /*
    组合继承
  */ 
  function Chineseperson(skin, name) {
    Person.call(this, name)
    this.skin = skin;
  }
  /*
  Chineseperson.prototype = new Person();
  Chineseperson.prototype.constructor = Chineseperson;
  */
  inheritPrototype(Chineseperson, Person);
  Chineseperson.prototype.getSkin = function(){
    return this.skin;
  }
  var p1 = new Chineseperson('yellow','limei');
  var p2 = new Chineseperson('white', 'lily');
  p1.friends.push('lilei');
  p2.friends.push('Tom');
  console.log("p1:", p1.name, "p2:", p2.name); // p1: limei p2: lily
  console.log('p1', p1.friends) // ["lilei"]
  console.log('p2', p2.friends) // [ "Tom"]
  console.log('p1.skin:', p1.getSkin() , "p2.skin:",p2.getSkin())  
  console.log('p1.name:', p1.getName() ,"p2.name:" ,p2.getName())
  // console.log("p1.constructor == Person =", p1.constructor == Person)

  /*寄生组合式*/
  function inheritPrototype(Chineseperson, Person) {
    var prototype = Object.create(Person.prototype);
    prototype.constructor = Chineseperson;
    Chineseperson.prototype = prototype;
  }
console.log(p1 instanceof Chineseperson, p1 instanceof Person)
});
;(document.ready =function(){
  // 原型式继承
  function object(o){
    var F = new Function();
    F.prototype = o;
    return new F();
  }
  var person = {
      name: 'lilei',
      friends: ['limei']
  }

  var anotherP =  Object.create(person);//object(person);
  anotherP.name = 'wangqiang';
  anotherP.friends.push('wanggang')

  var anotherP2 = Object.create(person); //object(person);
  anotherP2.name = 'wangqiang1';
  anotherP2.friends.push('wanggang1')

  console.log(person.friends, person.name);
  console.log(anotherP2.__proto__ == person, person.__proto__ == Object.prototype)
})

;(document.ready =function(){
  // 寄生式继承
  function object(o){
    var F = new Function();
    F.prototype = o;
    return new F();
  }
  function createAObj(original){
    var clone = object(original); // 父类original， 实例化子类 clone
    clone.sayHi = function() {
      console.log("hi, limei!")
    }
    return clone;
  }
  var person = {
      name: 'lilei',
      friends: ['limei']
  }

  var anotherP =  createAObj(person);//object(person);
  anotherP.name = 'wangqiang';
  anotherP.friends.push('wanggang')

  var anotherP2 = createAObj(person); //object(person);
  anotherP2.name = 'wangqiang1';
  anotherP2.friends.push('wanggang1')

  console.log(person.friends, person.name);
  console.log(anotherP2.sayHi());
})