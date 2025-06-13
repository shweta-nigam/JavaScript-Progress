/* TODO     ----------------
-> A class method called constructor cannot be a getter, setter, async, or generator (search -done)
-> A class cannot have more than one constructor method. 
->  Difference between default constructor and derived class (search -done)
->  what does keyword instanceOf and super do? 
->  
*/

// -----------       constructor           ------------------------------
// constructor in js is a special method which has many restriction imposed on it unlike regular js method.
// restriction =>  A class method called constructor cannot be a getter, setter, async function, or generator.


//what is allowed
class Student{
    constructor(name,age){
    this.studentName = name
    this.studentAge = age
    }

    studentInfo(){
        return `${this.studentName} is ${this.studentAge} years old.`
    }
}
const student1 = new Student("Tinny", 17)  
const student2 = new Student("Pome", 15)
console.log(student1.studentInfo())    // Tinny is 17 years old.
console.log(student2.studentInfo())     // Pome is 15 years old.

// what is not allowed ❌  ---> 1. Getter constructor
class user {
  get constructor(){                   // Error: SyntaxError: Class constructor may not be an accessor
        return function (name){
            this.name = name
        }
    }                   
}

// 2. Setter constructor ❌
class User{
    set constructor(value){     // Error: SyntaxError: Class constructor may not be an accessor
 this.value = value
    }
}

// 3. Async constructor ❌  
class Person {
  async constructor(name) {     // Error: SyntaxError: Class constructor may not be an accessor
    this.name = name;
  }
}

//4. Generator constructor ❌
class Person {
  *constructor(name) {     // // Error: SyntaxError: Class constructor may not be an accessor
    this.name = name;
  }
}


/**
 You said:
what does this mean in js, explain with examples? A class method called constructor cannot be a getter, setter, async, or generator


ChatGPT said:
In JavaScript, constructor is a special method inside a class that's used to initialize an object when the class is instantiated. It is not like a regular method, so JavaScript places restrictions on how it can be defined.

🔒 Restriction:
A class method called constructor cannot be a getter, setter, async function, or generator.

✅ What is allowed:
javascript
Copy
Edit
class Person {
  constructor(name) {
    this.name = name;
  }
}
const p = new Person("Alice");
console.log(p.name); // Alice
This is a normal constructor.

It runs when you do new Person(...).

❌ What’s NOT allowed:
1. Getter constructor ❌
javascript
Copy
Edit
class Person {
  get constructor() {
    return function(name) {
      this.name = name;
    };
  }
}
Error: SyntaxError: Class constructor may not be an accessor

2. Setter constructor ❌
javascript
Copy
Edit
class Person {
  set constructor(value) {
    this.name = value;
  }
}
Error: SyntaxError: Class constructor may not be an accessor

3. Async constructor ❌
javascript
Copy
Edit
class Person {
  async constructor(name) {
    this.name = name;
  }
}
Error: SyntaxError: Class constructor may not be an async method

4. Generator constructor ❌
javascript
Copy
Edit
class Person {
  *constructor(name) {
    this.name = name;
  }
}
Error: SyntaxError: Class constructor may not be a generator

💡 Why These Are Disallowed
The constructor is a special internal method used for object creation.

Making it async, a getter, a setter, or a generator would break the expected behavior of how objects are created and initialized.

JavaScript wants constructors to be simple, synchronous, and direct.
 */


