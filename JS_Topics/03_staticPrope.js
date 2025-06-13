class User{
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`Username is ${this.username}`);
        
    }

  static  createId(){     // static keyword will stop the access of a particular method or functionality     
        console.log('123456');
        
    }
}

const user = new User("john")
// user.createId()                // wont be accessed because of static keyword  


class Teacher extends User{
    constructor(email,username){
        super(username)
        this.Email = email
    }

    getId(){
        console.log(`Email is ${this.Email} and name is ${this.username}`);
        
    }
}

const user2 = new Teacher("larry@gmail.com","larry")

user2.logMe()        // Username is larry

user2.getId()        //  Email is larry@gmail.com and name is larry

user2.createId()      // error  : means even child wouldn't be able have access of static methods