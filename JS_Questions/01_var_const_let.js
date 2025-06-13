//May13,2025
function fun1(){
    if(true){
        var x = 10;
        let y = 20
    }
    console.log(x)          // 10
    // console.log(y)          // reference error: y is not defined

    console.log(typeof x)          // number
    console.log(typeof y)          //undefined
}
fun1()

function test() {
  if (true) {
    var x = 10;
    let y = 20;
  }
  console.log(typeof x); // ?        // number
  console.log(typeof y); // ?         // undefined
}

test();

function test() {
  if (true) {
    let y = 20;
  }
  console.log(typeof y); // Throws ReferenceError
}
test();

(function test() {
  if (true) {
    let y = 20;
  }
  console.log(typeof y); // ReferenceError
})();


var a = 5;
let a = 10;
console.log(a);

// 3.    Concept of hoisting 
console.log(foo); // ✅ undefined
var foo = 42;

// behind the scene  ----
var foo;
console.log(foo)       // undefined
foo = 42

//4.    
var a = 1;
(function fun2 (){
    console.log(a)    // undefined
    var a = 2
})()
//📌 Key Principle:
// A var declared inside a function creates a new local variable, even if it's declared after you use it. Because its declaration is hoisted, but its assignment is not.


//5.
let x = 10
{
    let x = x +1
    console.log(x)        // reference error   // ReferenceError: Cannot access 'x' before initialization
}
console.log(x)    // 10

// If I want the code to work 
let x1 = 10
{
    let y = x1 + 1
    console.log(y)        // 11
}
console.log(x1)  // 10
// able to access x1 because of JavaScript’s lexical scoping. Inside scope {}


//6.
console.log(typeof doesNotExists)      // undefined
console.log(doesNotExists)               // reference error     // ReferenceError: doesNotExists is not defined

// typeof doesNotExist is safe — it returns the string "undefined" even if doesNotExist was never declared.

// This is a special behavior of typeof that makes it safe to use on undeclared variables.

// But console.log(doesNotExist) throws a ReferenceError, because you're trying to directly access a variable that doesn’t exist in any scope.



//7. 
// 🗣️ “An IIFE has its own local scope, but it can still access outer scope variables unless it redeclares them.”

var a = 1;
let b = 2;
const c = 3;

(function () {
  console.log(a); // ✅ 1
  console.log(b); // ✅ 2
  console.log(c); // ✅ 3
})();

// ✅ Lexical Scoping:
// JavaScript functions can access variables from outer scopes (also called "closure" behavior).

// The IIFE does not declare its own variables — it’s reading from its parent (global) scope, where a, b, and c are defined.

// 🧠 The IIFE does not shadow or redefine these variables unless it explicitly declares them inside.



//8.