import { Link } from "react-router";
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

        .nav-logo-text {
          font-size: 18px;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.3px;
        }
        /* Hide logo text on very small screens to prevent squeezing */
        @media (max-width: 360px) {
          .nav-logo-text { display: none; }
        }

        .nav-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
      `}</style>

      <nav style={{
        background: "rgba(10,10,20,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "sticky", top: 0, zIndex: 30,
        height: "60px",
        display: "flex", alignItems: "center",
        backdropFilter: "blur(12px)",
        fontFamily: "'DM Sans', sans-serif",
        width: "100%",
      }}>
        <div style={{
          width: "100%",
          padding: "0 16px",          
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",                 
        }}>

          {/* Logo */}
          <Link to="/" style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,            
            minWidth: 0,              
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
                <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
                <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
                <polygon points="25,25 27,30 20,25" fill="white" />
              </svg>
            </div>

            {/* Hidden on very small screens */}
            <span className="nav-logo-text">StreamChat</span>
          </Link>

          {/* Right Actions */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",              
            flexShrink: 0,
          }}>

            {/* Bell */}
            <Link to="/notifications" style={{ textDecoration: "none" }}>
              <button
                className="nav-icon-btn"
                onMouseEnter={() => setBellHovered(true)}
                onMouseLeave={() => setBellHovered(false)}
                style={{
                  background: bellHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <BellIcon size={16} color="rgba(255,255,255,0.55)" />
              </button>
            </Link>

            {/* Avatar */}
            <div
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                overflow: "hidden", flexShrink: 0,
                border: avatarHovered ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.1)",
                transition: "border 0.2s", cursor: "pointer",
              }}
            >
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Logout */}
            <button
              onClick={() => logoutMutation()}
              className="nav-icon-btn"
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
              title="Logout"
              style={{
                background: logoutHovered ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)",
                border: logoutHovered ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <LogOutIcon size={16} color={logoutHovered ? "#f87171" : "rgba(255,255,255,0.45)"} />
            </button>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;