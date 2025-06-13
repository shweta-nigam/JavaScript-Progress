class apiResponse{
    constructor(statusCode,data,message = "Success" ){
this.statusCode = statusCode
this.data = data   // why here data and null in apiError
this.message =message
this.success = statusCode < 400
    }
}

export { apiResponse }