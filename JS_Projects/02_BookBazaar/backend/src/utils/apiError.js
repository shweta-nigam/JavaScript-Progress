
class apiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],       
        stack = ""
    ){
  super(message)
  this.statusCode = statusCode
  this.errors = errors
  this.message = message // why again --> something may mishandle it without this 
  this.data = null;         // how are extra fields possible --> because of js class flexibility
  this.success = false   
  // does order matters ?  --> no
  if(stack){
    this.stack = stack
  } else {
    Error.captureStackTrace(this,this.constructor)    // why this ?  -> for clean stack report
  }
    }
}

export { apiError }