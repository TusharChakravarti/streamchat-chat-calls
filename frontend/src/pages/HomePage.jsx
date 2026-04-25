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

const AVATAR_COLORS = [
  "#7c3aed", "#db2777", "#0891b2", "#059669",
  "#d97706", "#e11d48", "#4f46e5", "#be185d",
];

function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const SuggestedUserCard = ({ user, hasRequestBeenSent, isPending, onSendRequest }) => {
  const [hovered, setHovered] = useState(false);
  const color = getAvatarColor(user.fullName);
  const initials = user.fullName
    ?.split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt={user.fullName}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${color}44`,
              }}
            />
          ) : (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                fontWeight: "600",
                color: "#fff",
                border: `2px solid ${color}44`,
              }}
            >
              {initials}
            </div>
          )}
        </div>

        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: "600",
              color: "#f1f0ff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.fullName}
          </p>

          {user.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
              <MapPinIcon size={11} color="#6b7280" />
              <p style={{ margin: 0, fontSize: "11px", color: "#6b7280" }}>
                {user.location}
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: `${color}22`,
            border: `1px solid ${color}44`,
            borderRadius: "20px",
            padding: "3px 10px",
            fontSize: "11px",
            color: "#e2e0ff",
            width: "fit-content",
          }}
        >
          {getLanguageFlag(user.nativeLanguage)}
          <span style={{ color: "#a8a4ff" }}>Native:</span>
          {capitialize(user.nativeLanguage)}
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "3px 10px",
            fontSize: "11px",
            color: "#c4c2d4",
            width: "fit-content",
          }}
        >
          {getLanguageFlag(user.learningLanguage)}
          <span style={{ color: "#8b89a8" }}>Learning:</span>
          {capitialize(user.learningLanguage)}
        </span>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "12px",
          color: "rgba(255,255,255,0.4)",
          lineHeight: "1.5",
          minHeight: "36px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {user.bio || ""}
      </p>

      <div style={{ marginTop: "auto" }}>
        <button
          onClick={() => onSendRequest(user._id)}
          disabled={hasRequestBeenSent || isPending}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "9px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            border: "none",
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
            <>
              <CheckCircleIcon size={14} /> Request Sent
            </>
          ) : (
            <>
              <UserPlusIcon size={14} /> Add Friend
            </>
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs?.length) {
      outgoingFriendReqs.forEach(req =>
        outgoingIds.add(req.recipient._id)
      );
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const filteredFriends = friends.filter(f =>
    f.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const onlineFriends = friends.filter(f => isUserOnline(f._id));

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d1a" }}>
     
    </div>
  );
};

export default HomePage;