const mongoose=require('mongoose')


// const connectionstring='mongodb+srv://anish8427singhchandel:842799@testingcluster1.bitidug.mongodb.net/';
//in the connection string replace <password> with actual password
//testingcluster1 --> name of database(cluster) if such database doesn't exist then it will be created




// mongoose.connect(connectionstring)//this function returns promis
// .then(()=>console.log('server connected to DB'))
// .catch((err)=>console.log(err))

//no need to export since we just want to execute mongoose.connect() function ,so we will just require it in app.js since when we require a module it gets executed.


//   OR

const connectdb =(url)=>{
    return mongoose.connect(url);
    // return mongoose.connect(connectionstring);//The await keyword can only be used a function that returns a promise
}
module.exports=connectdb;

//in this setup our server and database are not in sync since first server is live then it is connected to database which will couse tons of errors, so we will invoke mongoose.connect() function in app.js