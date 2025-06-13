//16th May 2025                       -------- loops   ----------------------

import { log } from "console";


//1.  some weird syntax
let myList = {
    *[Symbol.iterator](){
        yield "🍉" ;
        yield "🍇";
        yield "🍏";
    }
}

for (const fruit of myList) {
   console.log(fruit) 
}
// explanation:
/*
-->   [Symbol.iterator]  =  It’s a built-in special key in JavaScript. which tells js ->  “Here’s how to loop over this object using for...of.”
-->   *   =  This means you are writing a generator function.   A generator function can pause and yield one value at a time.
-->    yield = Each yield gives out a value one at a time during the loop.
*/


// practice questions
//1.
for (let i = 1; i < 5; i++) {
  console.log(i);
}
// answer : 1,2,3,4

//2.
for(let i = 10; i > 7;i--){
    console.log(i)
}
// ans :  8,9,10 ❌  10,9,8 ✔️

//3. 
for (let i = 0; i < 3; i++) {
  console.log(i);
}
// ans : 0 , 1, 2

//4. 
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// answer : 1,2,3,4,5

//5. convert it in while loop
for (let i = 0; i < 3; i++) {
  console.log(i);
}

let i = 0;
while(i<3){
console.log(i)
i++
}
//ans: 0,1,2

//6. 
for (let i = 0; i < 5; i++) {
  if (i === 2) break;
  console.log(i);
}
//ans : 0, 1 

//7. print even numbers
for(let i = 0; i <= 10 ; i++){
    if(i % 2 === 0 ){
        console.log(i)
    }
}
// ans :  0,2,4,6,8,10

//8. 
const fruits = [ "apple", "banana", "papaya"]
for(const fruit of fruits){
    console.log("Printing" , fruit , "of" , fruits)
}
// Printing apple of [ 'apple', 'banana', 'papaya' ]   , Printing banana of [ 'apple', 'banana', 'papaya' ,Printing papaya of [ 'apple', 'banana', 'papaya' ]

// 9.
for( let i=0; i < 5 ; i++){
   if(i ===3 ) continue;      // skips at 3
   console.log(i)
}
// ans : 0, 1,2,4

// 10. 
const veggies = {
  "🥕":10,
  "🍆": 34,
  "🥒" :90,
   "🥔" : 67
}

for(const veg in veggies){
    console.log(`${veggies[veg]} ${veg} available`)
}
// ans :  
// 10 🥕 available
// 34 🍆 available
// 90 🥒 available
// 67 🥔 available



// mini challenge 1 :  Write a function that takes a number n and prints a triangle of *.
// Write a function called printTriangle(n) that prints this triangle using a loop.

function printTriangle(n){

    let print = ""
    for(let i = 1 ; i <= n ; i++){
       print += "*" 
       console.log(print)
    //    process.stdout.write(print);
    }
}
printTriangle(4)




const obj = {a:1, b:2, c:3}
for(const [key,value] of Object.entries(obj)){
console.log(`key is: ${key}, value is: ${value}`)
} 

