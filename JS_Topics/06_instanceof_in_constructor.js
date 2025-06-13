
class User{
    constructor(name){
     this.name = name
    }
  
    logMe(){
        return `user is logged in as ${this.name}`
    }
}

class Student extends User{
    constructor(name,division){
        super(name)
        this.division = division
    }

    studyIn(){
        return `${this.name} study in ${this.division} division`
    }
}

const s1 = new Student("lara", "10th")
const s2 = new Student("Sofia", "8th")
console.log(s1.studyIn());       // lara study in 10th division
console.log(s2.logMe());        // user is logged in as Sofia

// syntax  -- object instanceof Constructor
console.log(Student instanceof User);     // false  - not right way
console.log(User instanceof Student);    // // false  - not right way
console.log(s1 instanceof Student);        // true
console.log(s1 instanceof User);        // true
console.log(s1 instanceof Object);        // true


//  It checks if the prototype chain of object contains the Constructor.prototype.

