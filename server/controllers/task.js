const task = require('../model/task')
const Task = require('../model/task')//here Task is the model

const asyncwrapper = require('../middleware/async');

const { createCustomError } = require('../errors/custom-error');


// const allTask=async(req,res)=>{
//     //query are not promise but they .then() function and also can be used with async and await
//     try {
//         const alltasks=await Task.find({})//if you pass empty object then all the tasks will be fetched.
//         // res.status(201).json(alltasks)
//         res.status(201).json({numOFTasks:alltasks.length,alltasks})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }

//now there is redundancy since in every router we have to set the try and catch block so inorder to remove this repetation we use asyncwrapper and wrap our controller inside it.

const allTask = asyncwrapper(async (req, res) => {
    const alltasks = await Task.find({})
    res.status(201).json({ numOFTasks: alltasks.length, alltasks })
})



// const addTask=async(req,res)=>{
//     try {
//         const task=await Task.create(req.body);//create function returns a object with the properties of the req.body.
//         //you must use await
//         res.status(201).json({ task });
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// }
const addTask = asyncwrapper(async (req, res) => {
    // console.log(req.body);
    const task = await Task.create(req.body);//create function returns a object with the properties of the req.body.
    //you must use await
    res.status(201).json({...task});
})



// const getTask=async(req,res)=>{
//     try {
//         const {id:taskid}=req.params;//taskid is the alias i.e false name it contains the value of id in it.
//         const onetask=await Task.findOne({_id:taskid})//this function finds the task with matching id

//         if(!onetask)//if you provide wrong id but the syntex of the id is correct then we will have to deal with it on our own. eg if number of characters in the id is same but it's wrong then we need to handel it by our self catch block won't detect it.
//         {
//             return res.status(404).json({msg:`no task with id : ${taskid}`})
//         }

//         res.status(201).json(onetask)
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// }
const getTask = asyncwrapper(async (req, res, next) => {
    const { id: taskid } = req.params;
    const onetask = await Task.findOne({ _id: taskid })
    if (!onetask) {
        // return res.status(404).json({msg:`no task with id : ${taskid}`})

        //OR

        // const error=new Error('not found');
        // error.status=404;
        // return next(error)

        //OR

        return next(createCustomError(`no task with id : ${taskid}`,404))
    }
    res.status(201).json(onetask)
})




// const deleteTask=async(req,res)=>{
//     try {
//         const {id:taskid}=req.params;
//         const deleteonetask=await Task.findOneAndDelete({_id:taskid})
//         if(!deleteonetask)
//         {
//             return res.status(404).json({msg:`no task with id : ${taskid}`})
//         }
//         res.status(201).json(deleteonetask)
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// }
const deleteTask = asyncwrapper(async (req, res,next) => {
    const { id: taskid } = req.params;
    const deleteonetask = await Task.findOneAndDelete({ _id: taskid })
    if (!deleteonetask) {
        // return res.status(404).json({msg:`no task with id : ${taskid}`})
        return next(createCustomError(`no task with id : ${taskid}`,404))
    }
    res.status(201).json(deleteonetask)
})




//PUT --> is used to "replace" the existing resources i.e only the provided properties will be updated and rest all will be removed but mongoose doesn't do that it will only update the given properties and the rest will remain same , if you don't want this default behaviour of the mongoose then in the options argument set --> overwrite:true

//PATCH --> is used for "partial updates"

// const updateTask=async(req,res)=>{
//     try {
//         const {id:taskid}=req.params;
//         //const updateonetask=await Task.findOneAndUpdate({_id:taskid},req.body)//this will update the task but updateonetask will return the old value by default and also there will be no validators. Inorder to correct these things we use options argument in the Task.findOneAndUpdate() functions.
//         const updateonetask=await Task.findOneAndUpdate({_id:taskid},req.body,{new:true,runValidators:true})
//         if(!updateonetask)
//         {
//             return res.status(404).json({msg:`no task with id : ${taskid}`})
//         }
//         res.status(201).json(updateonetask)
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// }
const updateTask = asyncwrapper(async (req, res,next) => {
    const { id: taskid } = req.params;
    const updateonetask = await Task.findOneAndUpdate({ _id: taskid }, req.body, { new: true, runValidators: true })
    if (!updateonetask) {
        // return res.status(404).json({msg:`no task with id : ${taskid}`})
        return next(createCustomError(`no task with id : ${taskid}`, 404))
    }
    res.status(201).json(updateonetask)
})

module.exports = { allTask, addTask, getTask, updateTask, deleteTask };