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
        },
            transports: ["websocket", "polling"],

    });
    io.on("connection",(socket)=>{
        const userId = socket.handshake.query.userId;
        if(userId){
           
            if(disconnectTimers[userId]){
                clearTimeout(disconnectTimers[userId]);
                delete disconnectTimers[userId]
                  console.log(`Reconnection detected for ${userId} — cancelled offline timer`);
            }
            onlineUsers[userId] = socket.id;
            console.log(`User connected: ${userId}`);
            socket.emit("onlineUsers", Object.keys(onlineUsers));
            io.emit("onlineUsers",Object.keys(onlineUsers))
        }


socket.on("getOnlineUsers", () => {
  socket.emit("onlineUsers", Object.keys(onlineUsers));
});

        socket.on("disconnect",()=>{
            if(userId){

              disconnectTimers[userId] = setTimeout(()=>{
             delete onlineUsers[userId];
             delete disconnectTimers[userId];
              console.log(`User marked offline: ${userId}`);
                    io.emit("onlineUsers",Object.keys(onlineUsers))
              },10000)



                 
            }
        })
    })
    return io
}