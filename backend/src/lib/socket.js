import {Server} from "socket.io";


const onlineUsers = {};


export const getOnlineUsers = ()=> Object.keys(onlineUsers);
export const getRecieverSocketId = (userId) => onlineUsers[userId]

export const initSocket = (httpServer) =>{
    const io = new Server(httpServer,{
        cors:{
            origin:'https://streamchat-chat-calls.vercel.app',
            credentials:true
        }

    });
    io.on("connection",(socket)=>{
        const userId = socket.handshake.query.userId;
        if(userId){
           
            onlineUsers[userId] = socket.id;
            console.log(`User connected: ${userId}`);
            io.emit("onlineUsers",Object.keys(onlineUsers))
        }
        socket.on("disconnect",()=>{
            if(userId){
                  delete onlineUsers[userId];
                    console.log(`User disconnected: ${userId}`);
                    io.emit("onlineUsers",Object.keys(onlineUsers))
            }
        })
    })
    return io
}