import {Server} from "socket.io";


const onlineUsers = {};
const disconnectTimers = {};

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
              if (disconnectTimers[userId]) {
        clearTimeout(disconnectTimers[userId]);
        delete disconnectTimers[userId];
      }
            onlineUsers[userId] = socket.id;
            console.log(`User connected: ${userId}`);
            io.emit("onlineUsers",Object.keys(onlineUsers))
        }
        socket.on("disconnect",()=>{
            if(userId){
                   console.log(`User disconnecting: ${userId} — waiting 5s before marking offline`);
                     disconnectTimers[userId] = setTimeout(() => {
                  delete onlineUsers[userId];
                     delete disconnectTimers[userId];
                console.log(`User marked offline: ${userId}`);
                  io.emit("onlineUsers",Object.keys(onlineUsers))

                     },5000)
            }
        })
    })
    return io
}