const express=require('express')
const router=express.Router();

const {allTask,addTask,getTask,updateTask,deleteTask}=require('../controllers/task')

// router.get('/',allAllTask);
// router.post('/',addTask);
// router.get('/:id',getTask);
// router.patch('/:id',updateTask);
// router.delete('/:id',deleteTask);

// OR

router.route('/').get(allTask).post(addTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);


module.exports=router;