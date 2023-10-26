class Response {
    static SuccessResponse(res,data,message){
        res.status(200).send({data:data,status:true,message:message});
    }
    static ErrorResponse(res,data,message){
        res.status(404).send({data:data,status:false,message:message});
    }
    static InvalidResponse(res){
        res.status(500).send({message:"Invalid request",status:false})
    }
}
module.exports = Response;