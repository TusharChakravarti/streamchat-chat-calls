import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon } from "lucide-react";

import useLogout from "../hooks/useLogout";
import { useState } from "react";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [bellHovered, setBellHovered] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
      `}</style>

      <nav style={{
        background: "rgba(10,10,20,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "sticky", top: 0, zIndex: 30,
        height: "64px",
        display: "flex", alignItems: "center",
        backdropFilter: "blur(12px)",
        fontFamily: "'DM Sans', sans-serif",
        width: "100%",
      }}>
        <div style={{
          width: "100%", padding: "0 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo + Name — always visible in navbar */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
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
              fontSize: "18px", fontWeight: "800",
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.3px",
            }}>
              StreamChat
            </span>
          </Link>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
     

            <Link to="/notifications" style={{ textDecoration: "none" }}>
              <button
                onMouseEnter={() => setBellHovered(true)}
                onMouseLeave={() => setBellHovered(false)}
                style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: bellHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <BellIcon size={17} color="rgba(255,255,255,0.55)" />
              </button>
            </Link>

            <div
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
              style={{
                width: "38px", height: "38px", borderRadius: "50%",
                overflow: "hidden",
                border: avatarHovered ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.1)",
                transition: "border 0.2s", cursor: "pointer", flexShrink: 0,
              }}
            >
              <img src={authUser?.profilePic} alt="User Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <button
              onClick={logoutMutation}
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
              title="Logout"
              style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: logoutHovered ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)",
                border: logoutHovered ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <LogOutIcon size={17} color={logoutHovered ? "#f87171" : "rgba(255,255,255,0.45)"} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;