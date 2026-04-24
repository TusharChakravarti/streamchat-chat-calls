import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div style={{
      width: "36px", height: "36px", borderRadius: "10px",
      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#bg)" />
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

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
);

const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", userSelect: "none" }}>or</span>
    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
  </div>
);

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
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
        .sc-btn-google {
          width: 100%; padding: 11px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; color: #f1f0ff;
          font-size: 14px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          text-decoration: none;
        }
        .sc-btn-google:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
        @keyframes sc-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        width: "100%", maxWidth: "900px",
        display: "flex", borderRadius: "20px", overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
      }}>

        {/* Left — Form */}
        <div style={{
          flex: 1, background: "#0a0a14", padding: "48px 40px",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ marginBottom: "36px" }}><Logo /></div>

          <h2 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
            Welcome Back
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            Sign in to continue your language journey
          </p>

          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "10px", padding: "12px 14px", marginBottom: "20px",
              color: "#f87171", fontSize: "13px",
            }}>
              {error.response?.data?.message || "Login failed. Please try again."}
            </div>
          )}

          {/* Google OAuth Button */}
          <a href="https://streamchat-chat-calls.onrender.com/api/auth/google" className="sc-btn-google" style={{ marginBottom: "20px" }}>
            <GoogleIcon />
            Continue with Google
          </a>



          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)", marginBottom: "7px" }}>
                Email
              </label>
              <input
                type="email" placeholder="hello@example.com"
                className="sc-input"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                <label style={{ fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)" }}>
                  Password
                </label>
                
              </div>
              <input
                type="password" placeholder="••••••••"
                className="sc-input"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <div style={{ textAlign: "right" }}>
    <Link
      to="/forgot-password"
      style={{
        fontSize: "12px",
        color: "#a78bfa",
        textDecoration: "none",
        fontWeight: "500",
      }}
    >
      Forgot password?
    </Link>
  </div>

            <button type="submit" className="sc-btn-primary" disabled={isPending}>
              {isPending ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", animation: "sc-spin 0.75s linear infinite", display: "inline-block" }} />
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>

            <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: "600" }}>
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* Right — Illustration */}
        <div style={{
          flex: 1, background: "linear-gradient(135deg, #0f0a1e, #1a0f2e)",
          display: "none", alignItems: "center", justifyContent: "center",
          padding: "48px", flexDirection: "column", gap: "24px",
          borderLeft: "1px solid rgba(255,255,255,0.06)", position: "relative",
        }} className="sc-right-panel">
          <style>{`.sc-right-panel { display: flex !important; } @media (max-width: 768px) { .sc-right-panel { display: none !important; } }`}</style>

          <div style={{ width: "100%", maxWidth: "280px", borderRadius: "16px", overflow: "hidden" }}>
            <img src="/i.png" alt="Language connection" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: "18px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
              Connect with language partners worldwide
            </h3>
            <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>
              Practice conversations, make friends, and improve your language skills together
            </p>
          </div>

          <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(124,58,237,0.08)", filter: "blur(40px)", top: "10%", right: "5%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(168,85,247,0.06)", filter: "blur(30px)", bottom: "15%", right: "20%", pointerEvents: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;