import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import useOnlineUsers from "../hooks/useOnlineUsers";
import useAuthUser from "../hooks/useAuthUser";

const AVATAR_COLORS = [
  "#7c3aed", "#db2777", "#0891b2", "#059669",
  "#d97706", "#e11d48", "#4f46e5", "#be185d",
];
 

function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const SuggestedUserCard = ({ user, hasRequestBeenSent, isPending, onSendRequest }) => {
  const [hovered, setHovered] = useState(false);
  const color = getAvatarColor(user.fullName);
  const initials = user.fullName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
 

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: hovered ? `1px solid ${color}55` : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "20px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 30px ${color}22` : "none",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        fontFamily: "'DM Sans', sans-serif",
        height: "100%",         
        boxSizing: "border-box",
      }}
    >
      {/* Avatar + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          {user.profilePic ? (
            <img src={user.profilePic} alt={user.fullName}
              style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${color}44` }}
            />
          ) : (
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", fontWeight: "600", color: "#fff",
              border: `2px solid ${color}44`,
            }}>
              {initials}
            </div>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{
            margin: 0, fontSize: "15px", fontWeight: "600", color: "#f1f0ff",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {user.fullName}
          </p>
          {user.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
              <MapPinIcon size={11} color="#6b7280" />
              <p style={{ margin: 0, fontSize: "11px", color: "#6b7280" }}>{user.location}</p>
            </div>
          )}
        </div>
      </div>

      {/* Language Tags */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: `${color}22`, border: `1px solid ${color}44`,
          borderRadius: "20px", padding: "3px 10px", fontSize: "11px",
          color: "#e2e0ff", width: "fit-content",
        }}>
          {getLanguageFlag(user.nativeLanguage)}
          <span style={{ color: "#a8a4ff" }}>Native:</span> {capitialize(user.nativeLanguage)}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px", padding: "3px 10px", fontSize: "11px",
          color: "#c4c2d4", width: "fit-content",
        }}>
          {getLanguageFlag(user.learningLanguage)}
          <span style={{ color: "#8b89a8" }}>Learning:</span> {capitialize(user.learningLanguage)}
        </span>
      </div>

      <p style={{
        margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: "1.5",
        minHeight: "36px",                    
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {user.bio || ""}
      </p>

      <div style={{ marginTop: "auto" }}>
        <button
          onClick={() => onSendRequest(user._id)}
          disabled={hasRequestBeenSent || isPending}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "9px", borderRadius: "10px", fontSize: "13px",
            fontWeight: "600", border: "none",
            cursor: hasRequestBeenSent ? "default" : "pointer",
            background: hasRequestBeenSent
              ? "rgba(255,255,255,0.07)"
              : `linear-gradient(135deg, ${color}, ${color}aa)`,
            color: hasRequestBeenSent ? "rgba(255,255,255,0.4)" : "#fff",
            transition: "opacity 0.2s",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {hasRequestBeenSent ? (
            <><CheckCircleIcon size={14} /> Request Sent</>
          ) : (
            <><UserPlusIcon size={14} /> Add Friend</>
          )}
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [search, setSearch] = useState("");
   const { authUser } = useAuthUser();  


  const { isUserOnline } = useOnlineUsers();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => outgoingIds.add(req.recipient._id));
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const filteredFriends = friends.filter(f =>
    f.fullName?.toLowerCase().includes(search.toLowerCase())
  );


  const onlineFriends = friends.filter(f => isUserOnline(f._id));

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d1a", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        input::placeholder { color: rgba(255,255,255,0.25); }

        @media (max-width: 480px) {
          .fr-btn-text { display: none; }
          .fr-btn { padding: 9px 12px !important; }
          .home-pad { padding: 20px 16px !important; }
          .home-title { font-size: 22px !important; }
        }
      `}</style>

      <div className="home-pad" style={{ padding: "28px 32px", maxWidth: "1400px", margin: "0 auto" }}>

        {/* Top Bar */}
        {/* Top Bar */}
<div style={{
  display: "flex",
  flexDirection: "column",   // ← stack title and search vertically
  gap: "16px",
  marginBottom: "28px",
}}>
  {/* Title row */}
  <div>
    <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>
      Dashboard
    </p>
    <h1 className="home-title" style={{
      margin: 0, fontSize: "26px", fontWeight: "800",
      color: "#f1f0ff", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px",
    }}>
      Your Friends
      <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.25)", fontWeight: "400", marginLeft: "10px", fontFamily: "'DM Sans', sans-serif" }}>
        ({friends.length})
      </span>
    </h1>
  </div>

  {/* Search + Friend Requests — full width row */}
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",           // ← takes full width
  }}>
    <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
      <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="rgba(255,255,255,0.3)" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search friends..."
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px", padding: "9px 14px 9px 34px",
          color: "#f1f0ff", fontSize: "13px", outline: "none",
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
    </div>

    <Link
      to="/notifications"
      className="fr-btn"
      style={{
        flexShrink: 0,
        display: "flex", alignItems: "center", gap: "7px",
        background: "rgba(124,58,237,0.15)",
        border: "1px solid rgba(124,58,237,0.35)",
        borderRadius: "10px", padding: "9px 16px",
        color: "#a78bfa", fontSize: "13px", fontWeight: "600",
        textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.2s", whiteSpace: "nowrap",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
      <span className="fr-btn-text">Friend Requests</span>
    </Link>
  </div>
</div>

            {/* Friend Requests Button */}
            <Link
              to="/notifications"
              className="fr-btn"
              style={{
                flexShrink: 0,
                display: "flex", alignItems: "center", gap: "7px",
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.35)",
                borderRadius: "10px", padding: "9px 16px",
                color: "#a78bfa", fontSize: "13px", fontWeight: "600",
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="fr-btn-text">Friend Requests</span>
            </Link>
          </div>
        </div>

     {/* Online Friends Banner */}
{onlineFriends.length > 0 && (
  <div style={{
    background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.06))",
    border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: "16px", padding: "18px 24px", marginBottom: "28px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: "12px",
  }}>
    <div>
      <h2 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "600", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
        👋 Hey {authUser?.fullName?.split(" ")[0]}!
      </h2>
      <p style={{ margin: "0 0 4px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
        {onlineFriends.length === 1
          ? <><span style={{ color: "#a78bfa", fontWeight: "600" }}>{onlineFriends[0].fullName}</span> is online right now 🟢</>
          : onlineFriends.length === 2
          ? <><span style={{ color: "#a78bfa", fontWeight: "600" }}>{onlineFriends[0].fullName}</span> and <span style={{ color: "#a78bfa", fontWeight: "600" }}>{onlineFriends[1].fullName}</span> are online 🟢</>
          : <><span style={{ color: "#a78bfa", fontWeight: "600" }}>{onlineFriends[0].fullName}</span>, <span style={{ color: "#a78bfa", fontWeight: "600" }}>{onlineFriends[1].fullName}</span> and <span style={{ color: "#a78bfa", fontWeight: "600" }}>{onlineFriends.length - 2} more</span> are online 🟢</>
        }
      </p>
      <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
        Start a conversation or jump on a video call!
      </p>
    </div>

    {/* Stacked avatars */}
    <div style={{ display: "flex" }}>
      {onlineFriends.slice(0, 5).map((f, i) => {
        const c = getAvatarColor(f.fullName);
        const ini = f.fullName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
        return f.profilePic ? (
          <img key={f._id} src={f.profilePic} alt={f.fullName}
            style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0d0d1a", marginLeft: i > 0 ? "-8px" : "0" }}
          />
        ) : (
          <div key={f._id} style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${c}cc, ${c}66)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: "600", color: "#fff",
            border: "2px solid #0d0d1a", marginLeft: i > 0 ? "-8px" : "0",
          }}>{ini}</div>
        );
      })}
    </div>
  </div>
)}

        {/* Friends Grid */}
        <p style={{ margin: "0 0 14px", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.35)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Your Friends
        </p>

        {loadingFriends ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "48px 0" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "3px solid rgba(124,58,237,0.3)", borderTop: "3px solid #7c3aed", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredFriends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "14px",
            alignItems: "stretch",    
            marginBottom: "40px",
          }}>
            {filteredFriends.map(friend => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Meet New Learners */}
        <div style={{ marginTop: "40px", marginBottom: "14px" }}>
          <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.35)", letterSpacing: "2px", textTransform: "uppercase" }}>
            Meet New Learners
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
            Discover language exchange partners based on your profile
          </p>
        </div>

        {loadingUsers ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "48px 0" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "3px solid rgba(124,58,237,0.3)", borderTop: "3px solid #7c3aed", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : recommendedUsers.length === 0 ? (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "15px", color: "rgba(255,255,255,0.4)" }}>
              No recommendations available right now. Check back later!
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "14px",
            alignItems: "stretch",  
          }}>
            {recommendedUsers.map(user => (
              <SuggestedUserCard
                key={user._id}
                user={user}
                hasRequestBeenSent={outgoingRequestsIds.has(user._id)}
                isPending={isPending}
                onSendRequest={sendRequestMutation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;