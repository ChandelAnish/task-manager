const { customerror } = require("../errors/custom-error");



const errorhandler=(err,req,res,next)=>{
    // res.status(404).json({msg:err});
    if(err instanceof customerror)
    {
        return res.status(err.errorStatus).json({msg:err.message});
    }
    res.status(500).json({msg:'something went wrong',err});
}

module.exports=errorhandler;