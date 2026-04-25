// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";

// import {
//   Channel,
//   ChannelHeader,
//   Chat,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat";
// import toast from "react-hot-toast";

// import ChatLoader from "../components/ChatLoader";
// import CallButton from "../components/CallButton.jsx";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const ChatPage = () => {
//   const { id: targetUserId } = useParams();

//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { authUser } = useAuthUser();

//   const { data: tokenData } = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser, // this will run only when authUser is available
//   });

//   useEffect(() => {
//     const initChat = async () => {
//       if (!tokenData?.token || !authUser) return;

//       try {
//         console.log("Initializing stream chat client...");

//         const client = StreamChat.getInstance(STREAM_API_KEY);

//         await client.connectUser(
//           {
//             id: authUser._id,
//             name: authUser.fullName,
//             image: authUser.profilePic,
//           },
//           tokenData.token
//         );

//         //
//         const channelId = [authUser._id, targetUserId].sort().join("-");

//         // you and me
//         // if i start the chat => channelId: [myId, yourId]
//         // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

//         const currChannel = client.channel("messaging", channelId, {
//           members: [authUser._id, targetUserId],
//         });

//         await currChannel.watch();

//         setChatClient(client);
//         setChannel(currChannel);
//       } catch (error) {
//         console.error("Error initializing chat:", error);
//         toast.error("Could not connect to chat. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initChat();
//   }, [tokenData, authUser, targetUserId]);

//   const handleVideoCall = () => {
//     if (channel) {
//       const callUrl = `${window.location.origin}/call/${channel.id}`;

//       channel.sendMessage({
//         text: `I've started a video call. Join me here: ${callUrl}`,
//       });

//       toast.success("Video call link sent successfully!");
//          window.open(callUrl, '_blank');

//     }
//   };

//   if (loading || !chatClient || !channel) return <ChatLoader />;

//   return (
//     <div className="h-[93vh]">
//       <Chat client={chatClient}>
//         <Channel channel={channel}>
//           <div className="w-full relative">
//             <CallButton handleVideoCall={handleVideoCall} />
//             <Window>
//               <ChannelHeader />
//               <MessageList />
//               <MessageInput focus />
//             </Window>
//           </div>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };
// export default ChatPage;



import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import VideoCallModal from "../components/VideoCallModal";

import "stream-chat-react/dist/css/v2/index.css";
import "./ChatPage.css"; // custom overrides — see below

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCall, setShowCall] = useState(false);

  const { authUser } = useAuthUser();
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;
      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser(
          { id: authUser._id, name: authUser.fullName, image: authUser.profilePic },
          tokenData.token
        );
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);
      } catch (err) {
        console.error("Error initializing chat:", err);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({ text: `I've started a video call. Join me here: ${callUrl}` });
      toast.success("Video call link sent!");
      setShowCall(true);
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="chat-page-root">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="chat-window-wrapper">
            {/* Custom header with video/voice call buttons */}
            <CustomChannelHeader
              channel={channel}
              onVideoCall={handleVideoCall}
              onVoiceCall={() => toast("Voice call coming soon!")}
            />
            <Window>
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>

   
    </div>
  );
};

// ── Custom Channel Header ─────────────────────────────────────
function CustomChannelHeader({ channel, onVideoCall, onVoiceCall }) {
  const members = Object.values(channel.state.members || {});
  const other = members.find(m => m.user?.id !== channel._client?.userID);
  const user = other?.user;
  const isOnline = user?.online;
  const initials = user?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="custom-header">
      <div className="custom-header__avatar">
        {user?.image ? (
          <img src={user.image} alt={user.name} />
        ) : (
          <span>{initials}</span>
        )}
        <div className={`custom-header__status-dot ${isOnline ? "online" : "offline"}`} />
      </div>
      <div className="custom-header__info">
        <div className="custom-header__name">{user?.name || "Unknown"}</div>
        <div className={`custom-header__status ${isOnline ? "online" : ""}`}>
          {isOnline ? "● Online" : "● Offline"}
        </div>
      </div>
      <div className="custom-header__actions">
        <button className="call-btn" onClick={onVideoCall} title="Video Call">
          <VideoIcon />
        </button>
        <button className="call-btn" onClick={onVoiceCall} title="Voice Call">
          <PhoneIcon />
        </button>
      </div>
    </div>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────
const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export default ChatPage;


