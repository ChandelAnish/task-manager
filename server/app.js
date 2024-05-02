const express =require('express')
const app=express()
const cors=require('cors');
app.use(cors());
const task=require('./routers/task')
// require('./db/connectiondb')
//   OR
const connectdb=require('./db/connectiondb')
const notfound=require('./middleware/not-found')
const errorhandler=require('./middleware/errorhandler')

require('dotenv').config();


//middleware
app.use(express.json());

//routers
app.get('/',(req,res)=>{
    res.send("task manager")
})

app.use('/api/v1/task',task)



app.get('/api/v1/task',(req,res)=>{//it is convention to write like this : /api/v1/task 

})

app.use(notfound);
//In Express, middleware functions are executed sequentially in the order they are declared. When a request comes in, Express goes through each middleware and route handler in the order they are defined until it finds one that matches the request's path and HTTP method.

//If none of the routes before app.use(notfound) match the incoming request (i.e., if the requested path doesn't match any of the defined routes), Express will execute the notfound middleware function, which typically sends a 404 error response to the client, indicating that the requested resource was not found

app.use(errorhandler);


// app.listen(5000,()=>{
//     console.log("app is listening to port 5000")
// })

// OR
const port=process.env.PORT||5000;

const start=async()=>{
    try {
        await connectdb(process.env.MONGO_URI);
        app.listen(port,console.log('app is listening at port --> '+port));
    } catch (error) {
        console.log(error)
    }
}
start();