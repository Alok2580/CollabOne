const socket = require("socket.io");
const crypto = require("crypto");
const { send } = require("express-cookie/lib/response");
const {Chat} = require("../models/chat");


const initializeSocket = (server)=>{


    const getSecretRoomId = (userId,targetUserId)=>{

         return crypto
         .createHash("sha256")
         .update([userId,targetUserId].sort().join("_"))
         .digest("hex");



    }

const io = socket(server,{
    cors:{
        origin:"http://localhost:5173",
    },
});



io.on("connection",(socket)=>{
  

    socket.on("joinChat",({firstName,userId,targetUserId})=>{

        const roomId = getSecretRoomId(userId,targetUserId);

        console.log(firstName+"is joining the room with id " + roomId);
        socket.join(roomId);

    })


    socket.on("sendMessage", async ({firstName,lastName,userId,targetUserId,text})=>{
        
        const roomId = getSecretRoomId(userId,targetUserId);


        console.log(firstName +" "+  text);

        let chat = await Chat.findOne({
            participants:{$all: [userId,targetUserId]},

        });

        if(!chat){
            chat = new Chat({
                participants : [userId,targetUserId],
                messages: [],
            })
        }

        chat.messages.push({
            senderId :userId,
            text,
        });

        await chat.save();


        io.to(roomId).emit("messageRecieved",{firstName,lastName,text});

    })


    socket.on("disconnected",()=>{

    })
    
})

}

module.exports = initializeSocket;