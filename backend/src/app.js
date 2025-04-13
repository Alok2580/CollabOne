const express= require('express');
const app =express();
const connectDB=require("./config/database.js");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket.js");

// require("./utils/cronJob.js");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

const server= http.createServer(app);

initializeSocket(server);



// app.use(cors());

app.use(express.json()); // middleware

app.use(cookieParser());


const authRouter = require("./routes/auth.js");
const feedRouter = require("./routes/feed.js");
const profileRouter = require("./routes/profile.js");
const requestRouter= require("./routes/requests.js");
const userRouter =   require("./routes/user.js");
const chatRouter = require("./routes/chat.js");
// const initializeSocket = require('./utils/socket.js');


app.use("/",authRouter,feedRouter,profileRouter,requestRouter,userRouter,chatRouter);

// app.use("/",authRouter);
// app.use("/",feedRouter);
// app.use("/",profileRouter)
// app.use("/",requestRouter)
// app.use("/",userRouter);


connectDB().then(()=>{

    

    console.log("database connected successfully");

    server.listen(8086,()=>{

        console.log("server is successfully running at port 8086")
    
    });


    }).catch((err)=>{

    console.log("not connected to the database"+ err.message);

    })
