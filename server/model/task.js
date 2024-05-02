const mongoose=require('mongoose');

const taskschema=mongoose.Schema({
    // name:String,
    name:{
        //these below are validators
        type:String,
        // required:true,
        required:[true,"name must be provided"],
        trim:true,
        maxlength:[20,"name cannot be greater than 20 characters"]
    },
    // completed:Boolean
    completed:{
        type:Boolean,
        default:false
    }


    //only the properties that you set in this schema will be passed to the database and rest everything else will be ignored. 
});

module.exports=mongoose.model('task',taskschema);//task is the name of the collection and taskschema is the schema for that collection.

//A Mongoose model is a wrapper of the Mongoose schema. A Mongoose schema defines the document's properties, default values, types of data, validators, etc. In contrast, a Mongoose model provides an interface for the database to create, query, update, delete records, and so on.

//The model wraps around the schema to help you do things with it, like storing it in a database or fetching information from it.
//the model provides an interface to the database so using the model we will be able to create ,update, delete the documents with create ease.