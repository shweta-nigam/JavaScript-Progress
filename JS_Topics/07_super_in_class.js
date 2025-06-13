//  ------------------ super keyword in class construction  ------------------

// The super keyword in ES6 classes is syntactic sugar. Under the hood, JavaScript is using its prototype chain and constructor functions to handle inheritance.
// super() in a constructor class call the parent constructor
// super.method() in a method looks up the method on the parent class's prototype.
// JavaScript builds a prototype chain using Object.setPrototypeOf() and [[Prototype]].



// class Employee {
//     constructor(id, name){
//         this.id = id
//         this.name = name
//     }

//     info(){
//         return `ID:${this.id}, Employee name:${this.name}`
//     }
// }

// class Tax extends Employee {
//     constructor(id ,name ,taxRate){
//         super(id,name)
//         this.taxRate = taxRate
//     }
//     calTax(){
//         return(`tax rate is 18% for employee ${this.name}`)
//     }
//    info(){
//    return super.info()
//    }
// }

// const emp1 = new Tax(12,"Jay","28%")
// console.log(emp1.calTax());                // tax rate is 18% for employee Jay
// console.log(emp1.info());




// ------------- Behind the scene            ---------------------------------

function Employee(id,name){
 this.id = id
 this.name = name
}

Employee.prototype.employeeInfo = function(){
 return `ID:${this.id}, Employee name:${this.name}`
}

const emp2 = new Employee(2, "Donny") 
// same as =>
// emp2 = {
//   id: 2,
//   name: "Donny",
//   __proto__: Employee.prototype
// }



// derived constructor
function PayTax(id, name, rate){
    Employee.call(this,id,name)
    this.rate = rate
}

 // inherit the prototype of Employee
 PayTax.prototype = Object.create(Employee.prototype)
 // same as : =>
    // PayTax.prototype.__proto__ === Employee.prototype


// Fix the constructor reference
 PayTax.prototype.constructor = PayTax

 // Add a method to PayTax
 PayTax.prototype.taxRate = function(){
    return `Tax rate is ${this.rate} for ${this.name}`  
 }

 const emp3  = new PayTax(34,"Lara", "15%")
//  same as
// emp3 = {
//   id: 34,
//   name: "Lara",
//   rate: "15%",
//   __proto__: PayTax.prototype
// }




 console.log(emp3.taxRate())            // Tax rate is 15% for Lara
 console.log(emp3.employeeInfo())       // ID:34, Employee name:Lara
