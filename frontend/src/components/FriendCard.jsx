import { useState } from "react";
import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import useOnlineUsers from '../hooks/useOnlineUsers'
const AVATAR_COLORS = [
  "#7c3aed", "#db2777", "#0891b2", "#059669",
  "#d97706", "#e11d48", "#4f46e5", "#be185d",
];

function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const FriendCard = ({ friend }) => {
  const [hovered, setHovered] = useState(false);
  const color = getAvatarColor(friend.fullName);
  const initials = friend.fullName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

 
const {isUserOnline} = useOnlineUsers();
const isOnline = isUserOnline(friend._id)

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
      }}
    >
      {/* Avatar + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          {friend.profilePic ? (
            <img
              src={friend.profilePic}
              alt={friend.fullName}
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

          {/* ✅ Green = online, Gray = offline — driven by isOnline */}
          <div style={{
            position: "absolute", bottom: "1px", right: "1px",
            width: "11px", height: "11px", borderRadius: "50%",
            background: isOnline ? "#22c55e" : "#6b7280",
            border: "2px solid #0d0d1a",
          }} />
        </div>

        <div>
          <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#f1f0ff" }}>
            {friend.fullName}
          </p>
          {/* ✅ Text also reflects real status */}
          <p style={{ margin: 0, fontSize: "11px", color: isOnline ? "#22c55e" : "#6b7280" }}>
            {isOnline ? "Online" : "Offline"}
          </p>
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
          {getLanguageFlag(friend.nativeLanguage)}
          <span style={{ color: "#a8a4ff" }}>Native:</span> {friend.nativeLanguage}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px", padding: "3px 10px", fontSize: "11px",
          color: "#c4c2d4", width: "fit-content",
        }}>
          {getLanguageFlag(friend.learningLanguage)}
          <span style={{ color: "#8b89a8" }}>Learning:</span> {friend.learningLanguage}
        </span>
      </div>

      {/* Message + Video Call Buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Link
          to={`/chat/${friend._id}`}
          style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "9px", borderRadius: "10px", fontSize: "13px",
            fontWeight: "600", textDecoration: "none",
            background: `linear-gradient(135deg, ${color}, ${color}aa)`,
            color: "#fff", transition: "opacity 0.2s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;
  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        style={{ height: "12px", display: "inline-block" }}
      />
    );
  }
  return null;
}