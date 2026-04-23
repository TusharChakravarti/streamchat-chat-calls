
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d1a",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Navbar always on top */}
      <Navbar />

      <div style={{ display: "flex", flex: 1 }}>
   
        {showSidebar && <Sidebar />}

        <main style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;