import { useState } from "react";
import { Link } from "react-router";
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
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>

 
  <rect width="32" height="32" rx="8" fill="url(#bg)"/>

  
  <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fill-opacity="0.45"/>
  <polygon points="7,17 5,22 12,17" fill="white" fill-opacity="0.45"/>

  
  <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white"/>
  <polygon points="25,25 27,30 20,25" fill="white"/>
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

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "" });
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
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

        {/* Left — Form */}
        <div style={{
          flex: 1, background: "#0a0a14", padding: "40px",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ marginBottom: "28px" }}><Logo /></div>

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

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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