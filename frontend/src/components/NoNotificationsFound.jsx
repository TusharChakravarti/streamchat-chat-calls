import { BellIcon } from "lucide-react";

const NoNotificationsFound = () => {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "64px 24px", textAlign: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Bell icon circle */}
      <div style={{
        width: "64px", height: "64px", borderRadius: "50%",
        background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "20px",
        position: "relative",
      }}>
        <BellIcon size={26} color="rgba(167,139,250,0.7)" />
        {/* Subtle ping ring */}
        <div style={{
          position: "absolute", inset: "-6px", borderRadius: "50%",
          border: "1px solid rgba(124,58,237,0.12)",
        }} />
      </div>

      <h3 style={{
        margin: "0 0 8px", fontSize: "16px", fontWeight: "600", color: "#f1f0ff",
      }}>
        No notifications yet
      </h3>
      <p style={{
        margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.38)",
        maxWidth: "300px", lineHeight: "1.65",
      }}>
        When you receive friend requests or connections, they'll appear here.
      </p>
    </div>
  );
};

export default NoNotificationsFound;