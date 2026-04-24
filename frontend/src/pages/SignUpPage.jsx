import { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../lib/axios.js";
import useSignUp from "../hooks/useSignUp";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div style={{
      width: "36px", height: "36px", borderRadius: "10px",
      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#bg2)" />
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

// Shown after successful signup — prompts user to check email
const EmailSentScreen = ({ email }) => {
  const [resendStatus, setResendStatus] = useState("idle"); // "idle" | "sending" | "sent" | "error"

  const handleResend = async () => {
    setResendStatus("sending");
    try {
      await axiosInstance.post("/auth/resend-verification", { email });
      setResendStatus("sent");
     
      setTimeout(() => setResendStatus("idle"), 4000);
    } catch {
      setResendStatus("error");
      setTimeout(() => setResendStatus("idle"), 4000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", gap: "16px" }}>
      <div style={{
        width: "64px", height: "64px", borderRadius: "16px",
        background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.2))",
        border: "1px solid rgba(124,58,237,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M3 8l9 6 9-6" /><rect x="3" y="6" width="18" height="13" rx="2" />
        </svg>
      </div>
      <div>
        <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
          Check your inbox
        </h3>
        <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>
          We sent a verification link to<br />
          <span style={{ color: "#a78bfa", fontWeight: "600" }}>{email}</span>
        </p>
      </div>

      {/* Resend row */}
      <p style={{ margin: "4px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.25)", lineHeight: "1.6" }}>
        Didn't receive it? Check your spam folder or{" "}
        {resendStatus === "sending" ? (
          <span style={{ color: "rgba(167,139,250,0.5)" }}>Sending...</span>
        ) : resendStatus === "sent" ? (
          <span style={{ color: "#4ade80" }}>✓ Sent! Check your inbox</span>
        ) : resendStatus === "error" ? (
          <span style={{ color: "#f87171" }}>Failed. Try again.</span>
        ) : (
          <span
            onClick={handleResend}
            style={{ color: "#a78bfa", cursor: "pointer", textDecoration: "underline" }}
          >
            resend the email
          </span>
        )}
      </p>

      <Link to="/login" style={{
        marginTop: "8px", padding: "10px 24px", borderRadius: "10px",
        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
        color: "#fff", fontSize: "13px", fontWeight: "600", textDecoration: "none",
      }}>
        Back to Sign In
      </Link>
    </div>
  );
};

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "" });
  const [emailSent, setEmailSent] = useState(false);
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData, {
      onSuccess: () => setEmailSent(true),
    });
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
        .sc-checkbox {
          width: 16px; height: 16px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          accent-color: #7c3aed; cursor: pointer;
        }
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
        .sc-right { display: flex; }
        @media (max-width: 768px) { .sc-right { display: none !important; } }
      `}</style>

      <div style={{
        width: "100%", maxWidth: "900px",
        display: "flex", borderRadius: "20px", overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
      }}>
        {/* Left — Form or Email Sent */}
        <div style={{
          flex: 1, background: "#0a0a14", padding: "40px",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ marginBottom: "28px" }}><Logo /></div>

          {emailSent ? (
            <EmailSentScreen email={signupData.email} />
          ) : (
            <>
              <h2 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
                Create an Account
              </h2>
              <p style={{ margin: "0 0 24px", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                Join StreamChat and start your language learning adventure!
              </p>

              {error && (
                <div style={{
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "10px", padding: "12px 14px", marginBottom: "18px",
                  color: "#f87171", fontSize: "13px",
                }}>
                  {error.response?.data?.message || "Signup failed. Please try again."}
                </div>
              )}

              {/* Google OAuth */}
              <a href="/auth/google" className="sc-btn-google" style={{ marginBottom: "20px" }}>
                <GoogleIcon />
                Continue with Google
              </a>

              <Divider />

              <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)", marginBottom: "7px" }}>Full Name</label>
                  <input type="text" placeholder="John Doe" className="sc-input"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)", marginBottom: "7px" }}>Email</label>
                  <input type="email" placeholder="john@gmail.com" className="sc-input"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)", marginBottom: "7px" }}>Password</label>
                  <input type="password" placeholder="••••••••" className="sc-input"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                  <p style={{ margin: "6px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.28)" }}>
                    Must be at least 6 characters
                  </p>
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                  <input type="checkbox" className="sc-checkbox" required style={{ marginTop: "2px" }} />
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5" }}>
                    I agree to the{" "}
                    <span style={{ color: "#a78bfa", cursor: "pointer" }}>terms of service</span> and{" "}
                    <span style={{ color: "#a78bfa", cursor: "pointer" }}>privacy policy</span>
                  </span>
                </label>

                <button type="submit" className="sc-btn-primary" disabled={isPending}>
                  {isPending ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", animation: "sc-spin 0.75s linear infinite", display: "inline-block" }} />
                      Creating account...
                    </span>
                  ) : "Create Account"}
                </button>

                <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: "600" }}>
                    Sign in
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>

        {/* Right — Illustration */}
        <div className="sc-right" style={{
          flex: 1, background: "linear-gradient(135deg, #0f0a1e, #1a0f2e)",
          alignItems: "center", justifyContent: "center", padding: "48px",
          flexDirection: "column", gap: "24px",
          borderLeft: "1px solid rgba(255,255,255,0.06)", position: "relative",
        }}>
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

export default SignUpPage;