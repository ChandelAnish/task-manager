class customerror extends Error
{
    constructor(message,errorStatus)
    {
        super(message);
        this.errorStatus=errorStatus;
    }
}

const createCustomError=(message,errorStatus)=>{
    return new customerror(message,errorStatus);
}

module.exports={customerror,createCustomError};