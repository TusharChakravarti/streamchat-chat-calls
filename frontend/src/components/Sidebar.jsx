import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/notifications", icon: BellIcon, label: "Notifications" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        .sidebar {
          width: 64px;
          min-width: 64px;
          background: #0a0a14;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
            position: sticky;
          top: 64px;
           height: calc(100vh - 64px);
           font-family: 'DM Sans', sans-serif;
          z-index: 20;
          flex-shrink: 0;
        
          
        }

        /* On desktop expand to full width with labels */
        @media (min-width: 1024px) {
          .sidebar {
            width: 220px;
            min-width: 220px;
          }
          .sidebar-label { display: block !important; }
          .sidebar-logo-text { display: block !important; }
          .sidebar-user-info { display: block !important; }
        }

        .sidebar-label { display: none; }
        .sidebar-logo-text { display: none; }
        .sidebar-user-info { display: none; }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 10px;
          border-radius: 10px;
          text-decoration: none;
          border-left: 2px solid transparent;
          transition: all 0.2s;
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          font-weight: 400;
        }

        @media (min-width: 1024px) {
          .sidebar-nav-item {
            justify-content: flex-start;
            padding: 10px 14px;
          }
        }

        .sidebar-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
        }

        .sidebar-nav-item.active {
          background: rgba(124,58,237,0.2);
          border-left: 2px solid #7c3aed;
          color: #a78bfa;
          font-weight: 600;
        }
      `}</style>

      <aside className="sidebar">

      

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: "4px"}} >
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = currentPath === to;
            return (
              <Link
                key={to}
                to={to}
                className={`sidebar-nav-item${isActive ? " active" : ""}`}
                title={label}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span className="sidebar-label">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div style={{
           position: "sticky",
            bottom: 0,
          padding: "12px 8px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: "10px",
          justifyContent: "center",
        }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={authUser?.profilePic}
              alt="User Avatar"
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(124,58,237,0.4)",
              }}
            />
            <div style={{
              position: "absolute", bottom: "0px", right: "0px",
              width: "9px", height: "9px", borderRadius: "50%",
              background: "#22c55e", border: "2px solid #0a0a14",
            }} />
          </div>
          <div className="sidebar-user-info" style={{ minWidth: 0 }}>
            <p style={{
              margin: 0, fontSize: "13px", fontWeight: "600",
              color: "#f1f0ff", whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {authUser?.fullName}
            </p>
            <p style={{
              margin: 0, fontSize: "11px", color: "#22c55e",
              display: "flex", alignItems: "center", gap: "4px",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Online
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;