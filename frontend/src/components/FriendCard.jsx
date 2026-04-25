import { useState } from "react";
import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";


const AVATAR_COLORS = [
  "#7c3aed", "#db2777", "#0891b2", "#059669",
  "#d97706", "#e11d48", "#4f46e5", "#be185d",
];

function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

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

// ─── Friend Card (used on Friends page) ──────────────────────────────────────
export const FriendCard = ({ friend, isOnline }) => {
  const [hovered, setHovered] = useState(false);
  const color = getAvatarColor(friend.fullName);
  const initials = friend.fullName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();


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
        height: "100%",             // ← fills grid cell height
        boxSizing: "border-box",
      }}
    >
      {/* Avatar + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          {friend.profilePic ? (
            <img src={friend.profilePic} alt={friend.fullName}
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
          {/* Online dot */}
          <div style={{
            position: "absolute", bottom: "1px", right: "1px",
            width: "11px", height: "11px", borderRadius: "50%",
            background: isOnline ? "#22c55e" : "#6b7280",
            border: "2px solid #0d0d1a",
          }} />
        </div>

        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#f1f0ff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {friend.fullName}
          </p>
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

      {/* Message Button — pushed to bottom */}
      <div style={{ marginTop: "auto" }}>
        <Link
          to={`/chat/${friend._id}`}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
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

// ─── Recommended / Add Friend Card (used on Home/Discover page) ───────────────
export const RecommendedCard = ({ user, onAddFriend, requestSent }) => {
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
        gap: "12px",
        fontFamily: "'DM Sans', sans-serif",
        height: "100%",             // ← fills grid cell height
        boxSizing: "border-box",
      }}
    >
      {/* Avatar + Name + Location */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ flexShrink: 0 }}>
          {user.profilePic ? (
            <img src={user.profilePic} alt={user.fullName}
              style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${color}44` }}
            />
          ) : (
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: "600", color: "#fff",
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
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: "3px" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {user.location}
            </p>
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
          <span style={{ color: "#a8a4ff" }}>Native:</span> {user.nativeLanguage}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px", padding: "3px 10px", fontSize: "11px",
          color: "#c4c2d4", width: "fit-content",
        }}>
          {getLanguageFlag(user.learningLanguage)}
          <span style={{ color: "#8b89a8" }}>Learning:</span> {user.learningLanguage}
        </span>
      </div>

      {/* Bio — fixed 2 lines max so all cards stay same height */}
      {user.bio && (
        <p style={{
          margin: 0, fontSize: "12px",
          color: "rgba(255,255,255,0.4)", lineHeight: "1.5",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
          minHeight: "36px",         // ← reserves space even if no bio
        }}>
          {user.bio}
        </p>
      )}

      {/* Empty bio spacer — keeps height consistent */}
      {!user.bio && <div style={{ minHeight: "36px" }} />}

      {/* Add Friend / Request Sent — always at bottom */}
      <div style={{ marginTop: "auto" }}>
        <button
          onClick={() => !requestSent && onAddFriend(user._id)}
          disabled={requestSent}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "10px", borderRadius: "10px", fontSize: "13px", fontWeight: "600",
            border: "none", cursor: requestSent ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
            background: requestSent
              ? "rgba(255,255,255,0.06)"
              : `linear-gradient(135deg, ${color}, ${color}aa)`,
            color: requestSent ? "rgba(255,255,255,0.35)" : "#fff",
            opacity: hovered && !requestSent ? 0.88 : 1,
          }}
        >
          {requestSent ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Request Sent
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Friend
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FriendCard;