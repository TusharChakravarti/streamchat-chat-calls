import { LoaderIcon } from "lucide-react";




const ChatLoader = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0d0d1a",
    }}>
      <style>{`
        @keyframes sc-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sc-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {/* Logo icon */}
        <div style={{
          width: "48px", height: "48px", borderRadius: "14px",
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "sc-pulse 1.5s ease-in-out infinite",
        }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
                <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
                <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
                <polygon points="25,25 27,30 20,25" fill="white" />
              </svg>
        </div>

        {/* Spinner ring */}
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          border: "3px solid rgba(124,58,237,0.2)",
          borderTop: "3px solid #7c3aed",
          animation: "sc-spin 0.75s linear infinite",
        }} />
      </div>
    </div>
  );
};

export default ChatLoader;