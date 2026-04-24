import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div style={{
      width: "36px", height: "36px", borderRadius: "10px",
      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
        <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
        <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
        <polygon points="25,25 27,30 20,25" fill="white" />
      </svg>
    </div>
    <span style={{
      fontSize: "20px", fontWeight: "800", fontFamily: "'Syne', sans-serif",
      background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      letterSpacing: "-0.3px",
    }}>
      StreamChat
    </span>
  </div>
);

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("No verification token found in this link.");
      return;
    }

    const verify = async () => {
      try {
        await axiosInstance.get(`/auth/verify-email?token=${token}`, {
          withCredentials: true,
        });
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err.response?.data?.message ||
            "Verification failed. This link may have expired."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0d0d1a",
      padding: "24px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes sc-spin { to { transform: rotate(360deg); } }
        @keyframes sc-fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .sc-card { animation: sc-fade-in 0.4s ease forwards; }
      `}</style>

      <div
        className="sc-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#0a0a14",
          borderRadius: "20px",
          padding: "48px 40px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <Logo />

        {/* LOADING */}
        {status === "loading" && (
          <>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%",
              border: "3px solid rgba(124,58,237,0.2)",
              borderTop: "3px solid #a78bfa",
              animation: "sc-spin 0.8s linear infinite",
              marginTop: "8px",
            }} />
            <div>
              <h2 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
                Verifying your email...
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                This will only take a moment.
              </p>
            </div>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <div style={{
              width: "64px", height: "64px", borderRadius: "18px",
              background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(74,222,128,0.1))",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "8px",
            }}>
              <svg width="30" height="30" fill="none" stroke="#4ade80" strokeWidth="2.2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h2 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
                Email Verified! 🎉
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
                Your account is now active. Welcome to StreamChat — you're all set to connect with language partners worldwide.
              </p>
            </div>
            <button
              onClick={async () => {
                // Force auth query to re-fetch so App.jsx sees the new cookie
                await queryClient.invalidateQueries({ queryKey: ["authUser"] });
                navigate("/");
              }}
              style={{
                marginTop: "4px",
                padding: "12px 32px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                width: "100%",
                display: "block",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Go to StreamChat →
            </button>
          </>
        )}

        {/* ERROR */}
        {status === "error" && (
          <>
            <div style={{
              width: "64px", height: "64px", borderRadius: "18px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "8px",
            }}>
              <svg width="28" height="28" fill="none" stroke="#f87171" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h2 style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
                Verification Failed
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
                {errorMsg}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
              <Link
                to="/signup"
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Request a new verification link
              </Link>
              <Link
                to="/login"
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "13px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;