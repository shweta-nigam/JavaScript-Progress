
class Car{
    constructor(name, color){
        this.name = name
        this.color = color
    }
    //method
   start(){
     console.log("car starts.....");
     
    }
}

const car1 = new Car("Royal race", "purple")
car1.start();

const car2 = Car()
car2()