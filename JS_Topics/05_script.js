// 🧩 1. Default Constructor
// A default constructor is an automatically provided constructor by JavaScript when you don’t define any constructor in your class.

class User {
  // No constructor defined here, so JavaScript adds a default one:
  // constructor() {}

  isLoggedIn() {
    return `User si logged in`;
  }
}

const user1 = new User();
console.log(user1.isLoggedIn());
// So, if you don’t define a constructor, JavaScript will create one automatically that does nothing.


// 🧩 2. Derived Class
// A derived class is a class that uses extends to inherit from another class.

class Animal{
    constructor(name){
        this.name = name
    }
    
    animalName(){
        return `This animal is ${this.name}`
    }
}

class Sound extends Animal{
    constructor(name, sound){
        super(name)
        this.sound = sound
    }
    animalSound(){
        return `${this.name} makes sound of : ${this.sound}`
    }
}

const cat = new Sound("cat", "meow meow")
const dog = new Sound("dog", "bow bow")
console.log(cat.animalSound());       // cat makes sound of : meow meow
console.log(dog.animalSound());       // dog makes sound of : bow bow
