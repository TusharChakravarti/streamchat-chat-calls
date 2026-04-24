import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios.js"

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

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setIsPending(true);
    try {
      await axiosInstance.post(
        "/auth/reset-password",
        { token, newPassword },
        { withCredentials: true }
      );
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsPending(false);
    }
  };

  const EyeIcon = ({ open }) => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
        </>
      )}
    </svg>
  );

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
        .sc-input {
          width: 100%; padding: 11px 40px 11px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #f1f0ff;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
        }
        .sc-input:focus { border-color: rgba(124,58,237,0.6); background: rgba(255,255,255,0.07); }
        .sc-input::placeholder { color: rgba(255,255,255,0.25); }
        .sc-btn {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 10px;
          color: #fff; font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: opacity 0.2s;
        }
        .sc-btn:hover { opacity: 0.88; }
        .sc-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .sc-eye {
          position: absolute; right: 13px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); padding: 0;
          display: flex; align-items: center;
        }
        .sc-eye:hover { color: rgba(255,255,255,0.6); }
      `}</style>

      <div
        className="sc-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#0a0a14",
          borderRadius: "20px",
          padding: "48px 40px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "32px" }}><Logo /></div>

        {/* No token in URL */}
        {!token && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="24" height="24" fill="none" stroke="#f87171" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
              Invalid Reset Link
            </h2>
            <p style={{ margin: "0 0 24px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
              This link is missing a reset token.
            </p>
            <Link to="/forgot-password" style={{
              display: "block", padding: "12px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", borderRadius: "10px",
              fontSize: "13px", fontWeight: "600", textDecoration: "none",
            }}>
              Request a new reset link
            </Link>
          </div>
        )}

        {/* Success state */}
        {token && success && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "18px",
              background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(74,222,128,0.1))",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="30" height="30" fill="none" stroke="#4ade80" strokeWidth="2.2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h2 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
                Password Updated!
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
                Your password has been reset successfully.<br />
                Redirecting you to sign in...
              </p>
            </div>
            <Link to="/login" style={{
              padding: "12px 32px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", fontSize: "13px", fontWeight: "600", textDecoration: "none",
              width: "100%", textAlign: "center",
            }}>
              Go to Sign In
            </Link>
          </div>
        )}

        {/* Reset form */}
        {token && !success && (
          <>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.15))",
              border: "1px solid rgba(124,58,237,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "20px",
            }}>
              <svg width="24" height="24" fill="none" stroke="#a78bfa" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
              </svg>
            </div>

            <h2 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
              Set New Password
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>
              Choose a strong password for your account.
            </p>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px", padding: "12px 14px",
                marginBottom: "20px", color: "#f87171", fontSize: "13px",
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* New Password */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)", marginBottom: "7px" }}>
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="••••••••"
                    className="sc-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="sc-eye" onClick={() => setShowNew(!showNew)}>
                    <EyeIcon open={showNew} />
                  </button>
                </div>
                <p style={{ margin: "6px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)", marginBottom: "7px" }}>
                  Confirm New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="sc-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="sc-eye" onClick={() => setShowConfirm(!showConfirm)}>
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>

                {/* Password match indicator */}
                {confirmPassword && (
                  <p style={{
                    margin: "6px 0 0", fontSize: "11px",
                    color: newPassword === confirmPassword ? "#4ade80" : "#f87171",
                  }}>
                    {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              <button type="submit" className="sc-btn" disabled={isPending} style={{ marginTop: "4px" }}>
                {isPending ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span style={{
                      width: "14px", height: "14px", borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid #fff",
                      animation: "sc-spin 0.75s linear infinite",
                      display: "inline-block",
                    }} />
                    Resetting...
                  </span>
                ) : "Reset Password"}
              </button>

              <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                <Link to="/login" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: "600" }}>
                  ← Back to Sign In
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;