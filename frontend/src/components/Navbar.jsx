import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
   const {theme} = useThemeStore()
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
 

              
   



         <div className="mb-1 flex items-center justify-start gap-2">

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
          )}





{!isChatPage && (
   <div className="pl-1 lg:hidden">
              <Link to="/" className="flex items-center gap-2.5" >
 

              
   



         <div className="mb-1 flex items-center justify-start gap-2">

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
