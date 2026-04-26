import { VideoIcon } from "lucide-react";
import { useState } from "react";

function CallButton({ handleVideoCall }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      <button
        onClick={handleVideoCall}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none",
          borderRadius: "8px",
          padding: "6px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 0.85 : 1,
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered ? "0 6px 20px rgba(124,58,237,0.5)" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <VideoIcon size={20} color="#fff" />
      </button>
    </div>
  );
}

export default CallButton;