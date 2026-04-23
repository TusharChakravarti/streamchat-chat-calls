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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
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