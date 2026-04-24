import { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../lib/axios";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div style={{
      width: "36px", height: "36px", borderRadius: "10px",
      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#bg3)" />
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
    }}>StreamChat</span>
  </div>
);

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsPending(true);
    try {
      await axiosInstance.post("/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };  

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0d0d1a", padding: "24px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        .sc-input {
          width: 100%; padding: 11px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #f1f0ff;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
        }
        .sc-input:focus { border-color: rgba(124,58,237,0.6); background: rgba(255,255,255,0.07); }
        .sc-input::placeholder { color: rgba(255,255,255,0.25); }
        .sc-btn-primary {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 10px;
          color: #fff; font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: opacity 0.2s;
        }
        .sc-btn-primary:hover { opacity: 0.88; }
        .sc-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        @keyframes sc-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        width: "100%", maxWidth: "440px",
        background: "#0a0a14", borderRadius: "20px", padding: "48px 40px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ marginBottom: "36px" }}><Logo /></div>

        {sent ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.2))",
              border: "1px solid rgba(124,58,237,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="26" height="26" fill="none" stroke="#a78bfa" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 8l9 6 9-6" /><rect x="3" y="6" width="18" height="13" rx="2" />
              </svg>
            </div>
            <div>
              <h2 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
                Reset link sent!
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
                We sent a password reset link to<br />
                <span style={{ color: "#a78bfa", fontWeight: "600" }}>{email}</span>
              </p>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.25)", lineHeight: "1.6" }}>
              Link expires in 1 hour. Didn't get it?{" "}
              <span
                onClick={() => setSent(false)}
                style={{ color: "#a78bfa", cursor: "pointer", textDecoration: "underline" }}
              >
                Try again
              </span>
            </p>
            <Link to="/login" style={{
              marginTop: "4px", padding: "5px 28px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", fontSize: "13px", fontWeight: "600", textDecoration: "none",
            }}>
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
       

        <h2 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
              Forgot Password?
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>
              No worries! Enter your email and we'll send you a reset link.
            </p>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px", padding: "12px 14px", marginBottom: "20px",
                color: "#f87171", fontSize: "13px",
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)", marginBottom: "7px" }}>
                  Email Address
                </label>
                <input
                  type="email" placeholder="hello@example.com"
                  className="sc-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="sc-btn-primary" disabled={isPending}>
                {isPending ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", animation: "sc-spin 0.75s linear infinite", display: "inline-block" }} />
                    Sending reset link...
                  </span>
                ) : "Send Reset Link"}
              </button>

                   {/* Back arrow */}
                   
            <Link to="/login" style={{
              display: "inline-flex", alignItems: "center", justifyContent:"center", gap: "6px",
              color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none",
              marginBottom: "24px", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Sign In
            </Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;