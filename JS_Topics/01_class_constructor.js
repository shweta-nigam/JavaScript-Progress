// class keyword is the part of ES6 JS before this class keyword prototypes was used for the same behavior.
// --> name should be capitalized

class User{
constructor(name,email,age,password){
 this.name = name               // This is called property assignment or initializing  instance property (attaching data to the object)
 this.email = email
 this.age = age
 this.password = password
}

greet(){
    return (`I am ${this.name}, ${this.age} years old!`)
}
}

const user1 = new User("lilly", "xxxx@gmail.com", "25", "1234567889")
console.log(user1.greet())

/*Explanation of the syntax :-

this refers to the current object (the new User being created).

name (on the right) is a parameter passed into the constructor.

this.name (on the left) is a property you're attaching to the object.

*/


//-------------------          behind the scene                    --------------------------------

function User(name,email,age,password){
    this.Name = name
    this.Email = email
    this.Age = age
    this.Password = password 
}


User.prototype.info = function(){
    return `Hii, I am ${this.Name} and my email is ${this.Email.toLowerCase()}`
}

const user01 = new User("Stella", "Stella@gamil.com",30, "5687908")
console.log(user01.info())



// -----------  Conclusion      --------------------------------------
// class keyword are nothing but syntactic sugar  over prototype inheritance 
// class User { ... }

// is nothing but

// function User() { ... }
// User.prototype.greet = function() { ... }




// ----------- inheritance ----------------

 class User {
    constructor(username){
        this.username= username
    }

    logMe(){
        console.log(`username is ${this.username}`)
    }
 }

 class Teacher extends User {
    constructor(username,email,password){
        super(username)                 // ?
        this.email =email
        this.password = password
    }

    addCourse(){
        console.log(`course added by ${this.username}`);
        
    }
 }

 const user2 = new Teacher("Nanny","nanny@hamul.com","793982-09")
user2.addCourse()

const user3 = new User("rocky")
user3.logMe()

// que --- does user3 has access of addCourse method  --> no
// user3.addCourse()              

//que  ---  is logMe available to user2        ---> yes - prototypal  inheritance
user2.logMe()

// is user2 ===  user3         --> no
console.log(user2=== user3);      // false
console.log(user2 === Teacher);    // false


console.log(user2 instanceof Teacher);    // true
console.log(user2 instanceof User);        // true





