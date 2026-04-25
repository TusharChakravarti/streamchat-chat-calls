import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      <button
        onClick={handleVideoCall}
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none",
          borderRadius: "8px",
          padding: "6px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VideoIcon size={20} color="#fff" />
      </button>
    </div>
  );
}

export default CallButton;
