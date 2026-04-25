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


// ============================================================
// ChatPage.jsx  — drop-in replacement for your existing file
// Works with: stream-chat-react, @tanstack/react-query
// ============================================================
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

      {/* Video call modal */}
      {showCall && (
        <VideoCallModal
          channel={channel}
          authUser={authUser}
          onClose={() => setShowCall(false)}
        />
      )}
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


// ============================================================
// VideoCallModal.jsx  — src/components/VideoCallModal.jsx
// ============================================================
export function VideoCallModal({ channel, authUser, onClose }) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = s =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const members = Object.values(channel?.state?.members || {});
  const other = members.find(m => m.user?.id !== authUser?._id);
  const otherUser = other?.user;
  const initials = otherUser?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="call-overlay">
      <div className="call-modal">
        {/* Video area */}
        <div className="call-video-area">
          <div className="call-avatar-ring">
            {otherUser?.image ? (
              <img src={otherUser.image} alt="" className="call-avatar-img" />
            ) : (
              <div className="call-avatar-letter">{initials}</div>
            )}
          </div>
          <div className="call-self-view">
            {authUser?.profilePic ? (
              <img src={authUser.profilePic} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div className="call-self-initials">{authUser?.fullName?.[0] || "Y"}</div>
            )}
          </div>
          <div className="call-timer">{fmt(seconds)}</div>
          <div className="call-name-label">
            <span className="call-online-dot" />
            {otherUser?.name || "User"}
          </div>
        </div>

        {/* Info */}
        <div className="call-modal-info">
          <div className="call-modal-title">Video Call with {otherUser?.name || "User"}</div>
          <div className="call-modal-sub">Connected · {fmt(seconds)}</div>
        </div>

        {/* Controls */}
        <div className="call-controls">
          <button
            className={`ctrl-btn ${micOn ? "active" : "inactive"}`}
            onClick={() => setMicOn(m => !m)}
            title={micOn ? "Mute" : "Unmute"}
          >
            {micOn ? <MicIcon /> : <MicOffIcon />}
          </button>
          <button
            className={`ctrl-btn ${camOn ? "active" : "inactive"}`}
            onClick={() => setCamOn(c => !c)}
            title={camOn ? "Stop Camera" : "Start Camera"}
          >
            <VideoIcon />
          </button>
          <button className="ctrl-btn" title="Share Screen">
            <ScreenIcon />
          </button>
          <button className="ctrl-btn" title="More">
            <MoreIcon />
          </button>
          <button className="ctrl-btn end" onClick={onClose} title="End Call">
            <PhoneOffIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3M8 22h8" />
  </svg>
);
const MicOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23M12 19v3M8 22h8" />
  </svg>
);
const ScreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);
