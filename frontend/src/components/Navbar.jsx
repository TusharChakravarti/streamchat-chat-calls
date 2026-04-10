import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const theme = localStorage.getItem("theme")
  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5" >
               
    <div className="mb-4 flex items-center justify-start gap-2" data-theme={theme}>
        

<div data-theme={theme} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect x="6" y="8" width="16" height="11" rx="4" fill="#4ade80" fillOpacity="0.4" />
    <polygon points="8,19 6,25 14,19" fill="#4ade80" fillOpacity="0.4" />
    <rect x="14" y="17" width="16" height="11" rx="4" fill="#4ade80" />
    <polygon points="28,28 30,34 22,28" fill="#4ade80" />
  </svg>

  <span style={{ fontSize: "26px", fontWeight: "700", letterSpacing: "-0.4px", lineHeight: 1 }}>
    <span style={{ color: "#4ade80" }}>Stream</span>
    <span style={{ color: "oklch(var(--bc))" }}>Chat</span>
  </span>
</div>

    


          </div>









          
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
