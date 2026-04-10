import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
        

          {/* Logo */}
      <div className="mb-4 flex items-center justify-start gap-2">

  <svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="oklch(var(--p))" />
        <stop offset="100%" stopColor="oklch(var(--s))" />
      </linearGradient>
    </defs>


    <rect width="36" height="36" rx="9" fill="url(#bubbleGrad)" fillOpacity="0.1" />


    <rect x="6" y="8" width="16" height="11" rx="4" fill="url(#bubbleGrad)" fillOpacity="0.4" />
    <polygon points="8,19 6,25 14,19" fill="url(#bubbleGrad)" fillOpacity="0.4" />

 
    <rect x="14" y="17" width="16" height="11" rx="4" fill="url(#bubbleGrad)" />
    <polygon points="28,28 30,34 22,28" fill="url(#bubbleGrad)" />
  </svg>

  <span
    style={{
      fontSize: 36 * 0.72,
      fontWeight: "700",
      letterSpacing: "-0.4px",
      lineHeight: 1,
    }}
    className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
  >
    Stream
    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Chat</span>
  </span>

</div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        {/* <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link> */}

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;