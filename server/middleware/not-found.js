const notfound=(req,res)=>{
    res.status(404).send("<h1>router not found</h1>")
}
module.exports=notfound;