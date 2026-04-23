
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, CheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { useState } from "react";

const AVATAR_COLORS = [
  "#7c3aed", "#db2777", "#0891b2", "#059669",
  "#d97706", "#e11d48", "#4f46e5", "#be185d",
];

function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const RequestCard = ({ request, onAccept, isPending }) => {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const color = getAvatarColor(request.sender.fullName);
  const initials = request.sender.fullName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: hovered ? `1px solid ${color}44` : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px", padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "16px", transition: "all 0.2s",
        boxShadow: hovered ? `0 4px 20px ${color}15` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {request.sender.profilePic ? (
            <img
              src={request.sender.profilePic}
              alt={request.sender.fullName}
              style={{
                width: "48px", height: "48px", borderRadius: "50%",
                objectFit: "cover", border: `2px solid ${color}44`,
              }}
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

        {/* Info */}
        <div style={{ minWidth: 0 }}>
          <p style={{
            margin: "0 0 6px", fontSize: "15px", fontWeight: "600",
            color: "#f1f0ff", fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {request.sender.fullName}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              background: `${color}22`, border: `1px solid ${color}33`,
              borderRadius: "20px", padding: "2px 10px", fontSize: "11px",
              color: "#e2e0ff", fontFamily: "'DM Sans', sans-serif",
            }}>
              <span style={{ color: "#a8a4ff" }}>Native:</span> {request.sender.nativeLanguage}
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px", padding: "2px 10px", fontSize: "11px",
              color: "#c4c2d4", fontFamily: "'DM Sans', sans-serif",
            }}>
              <span style={{ color: "#8b89a8" }}>Learning:</span> {request.sender.learningLanguage}
            </span>
          </div>
        </div>
      </div>

      {/* Accept Button */}
      <button
        onClick={() => onAccept(request._id)}
        disabled={isPending}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 18px", borderRadius: "10px",
          background: btnHovered
            ? `linear-gradient(135deg, #7c3aed, #a855f7)`
            : "rgba(124,58,237,0.15)",
          border: "1px solid rgba(124,58,237,0.4)",
          color: btnHovered ? "#fff" : "#a78bfa",
          fontSize: "13px", fontWeight: "600",
          cursor: isPending ? "not-allowed" : "pointer",
          transition: "all 0.2s", flexShrink: 0,
          fontFamily: "'DM Sans', sans-serif",
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <CheckIcon size={14} />
        Accept
      </button>
    </div>
  );
};

const ConnectionCard = ({ notification }) => {
  const [hovered, setHovered] = useState(false);
  const color = getAvatarColor(notification.recipient.fullName);
  const initials = notification.recipient.fullName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: "1px solid rgba(34,197,94,0.15)",
        borderRadius: "14px", padding: "16px 20px",
        display: "flex", alignItems: "center", gap: "14px",
        transition: "all 0.2s",
      }}
    >
      {/* Avatar */}
      <div style={{ flexShrink: 0 }}>
        {notification.recipient.profilePic ? (
          <img
            src={notification.recipient.profilePic}
            alt={notification.recipient.fullName}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              objectFit: "cover", border: `2px solid ${color}44`,
            }}
          />
        ) : (
          <div style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "600", color: "#fff",
          }}>
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <p style={{
          margin: "0 0 3px", fontSize: "14px", fontWeight: "600",
          color: "#f1f0ff", fontFamily: "'DM Sans', sans-serif",
        }}>
          {notification.recipient.fullName}
        </p>
        <p style={{
          margin: "0 0 4px", fontSize: "13px",
          color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif",
        }}>
          {notification.recipient.fullName} accepted your friend request
        </p>
        <p style={{
          margin: 0, fontSize: "11px",
          color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          <ClockIcon size={11} />
          Recently
        </p>
      </div>

      {/* Badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "5px",
        background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
        borderRadius: "20px", padding: "4px 12px",
        fontSize: "11px", fontWeight: "600", color: "#4ade80",
        fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
      }}>
        <MessageSquareIcon size={11} />
        New Friend
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d1a",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{
            margin: "0 0 4px", fontSize: "11px", color: "rgba(255,255,255,0.3)",
            letterSpacing: "2px", textTransform: "uppercase",
          }}>
            Activity
          </p>
          <h1 style={{
            margin: 0, fontSize: "26px", fontWeight: "800",
            color: "#f1f0ff", fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.5px",
          }}>
            Notifications
          </h1>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "64px 0" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              border: "3px solid rgba(124,58,237,0.3)",
              borderTop: "3px solid #7c3aed",
              animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

            {/* Friend Requests */}
            {incomingRequests.length > 0 && (
              <section>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  marginBottom: "14px",
                }}>
                  <UserCheckIcon size={17} color="#a78bfa" />
                  <h2 style={{
                    margin: 0, fontSize: "15px", fontWeight: "700",
                    color: "#f1f0ff", fontFamily: "'Syne', sans-serif",
                  }}>
                    Friend Requests
                  </h2>
                  <div style={{
                    background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)",
                    borderRadius: "20px", padding: "1px 10px",
                    fontSize: "12px", fontWeight: "600", color: "#a78bfa",
                  }}>
                    {incomingRequests.length}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {incomingRequests.map(request => (
                    <RequestCard
                      key={request._id}
                      request={request}
                      onAccept={acceptRequestMutation}
                      isPending={isPending}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* New Connections */}
            {acceptedRequests.length > 0 && (
              <section>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  marginBottom: "14px",
                }}>
                  <BellIcon size={17} color="#4ade80" />
                  <h2 style={{
                    margin: 0, fontSize: "15px", fontWeight: "700",
                    color: "#f1f0ff", fontFamily: "'Syne', sans-serif",
                  }}>
                    New Connections
                  </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {acceptedRequests.map(notification => (
                    <ConnectionCard key={notification._id} notification={notification} />
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

