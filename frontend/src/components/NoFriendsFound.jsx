import { Link } from "react-router";

const NoFriendsFound = () => {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "48px 24px", textAlign: "center",
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Icon */}
      <div style={{
        width: "60px", height: "60px", borderRadius: "50%",
        background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "16px",
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="rgba(167,139,250,0.8)" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <h3 style={{
        margin: "0 0 8px", fontSize: "16px", fontWeight: "600", color: "#f1f0ff",
      }}>
        No friends yet
      </h3>
      <p style={{
        margin: "0 0 20px", fontSize: "13px", color: "rgba(255,255,255,0.4)",
        maxWidth: "280px", lineHeight: "1.6",
      }}>
        Connect with language partners below to start practicing together!
      </p>

      <Link to="/notifications" style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "9px 20px", borderRadius: "10px", fontSize: "13px",
        fontWeight: "600", textDecoration: "none",
        background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)",
        color: "#a78bfa", transition: "all 0.2s",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Find Language Partners
      </Link>
    </div>
  );
};

export default NoFriendsFound;