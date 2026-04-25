import { useEffect,useState } from "react";
import {io} from "socket.io-client"
import useAuthUser from './useAuthUser'

let socket = null;

const useOnlineUsers = ()=>{
    const {authUser} = useAuthUser();
    const [onlineUsers,setOnlineUsers] = useState([])
    useEffect(()=>{
if(!authUser) return;

if((!socket || !socket.connected)){
    socket = io('https://streamchat-chat-calls.onrender.com'||"http://localhost:5001",
        {
query:{ userId:authUser._id },
    withCredentials:true,
});
   
}
socket.on("onlineUsers",(users) =>{
    setOnlineUsers(users);
});

return () =>{
    socket.off("onlineUsers")
}

 
},[authUser])

// Disconnect when user logs out
useEffect(()=>{
    if(!authUser && socket){
      socket.disconnect();
      socket = null;
      setOnlineUsers([])
    }
}, [authUser])


const isUserOnline = (userId) => onlineUsers.includes(userId);
return {onlineUsers,isUserOnline}
}


export {socket};
export default useOnlineUsers;