// import { useState } from "react";
// import { Link } from "react-router";

// const FEATURES = [
//   {
//     icon: (
//       <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//         <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
//       </svg>
//     ),
//     title: "Real-Time Chat",
//     desc: "Instant messaging powered by Stream.io. Send messages and react with emojis — all in real time with zero lag.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//         <polygon points="23 7 16 12 23 17 23 7" />
//         <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
//       </svg>
//     ),
//     title: "HD Video Calls",
//     desc: "Crystal-clear video calling built right into the chat. No downloads — just click and connect.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="10" />
//         <line x1="2" y1="12" x2="22" y2="12" />
//         <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
//       </svg>
//     ),
//     title: "Language Exchange",
//     desc: "Find partners who speak your target language natively. Matched by language goals.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//         <circle cx="12" cy="8" r="4" />
//         <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
//       </svg>
//     ),
//     title: "Friend System",
//     desc: "Send friend requests, manage your network, and get notified instantly when requests arrive.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="3" />
//         <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
//       </svg>
//     ),
//     title: "Online Presence",
//     desc: "See who's online in real time. Socket.io powers instant status updates across all devices.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//         <rect x="3" y="11" width="18" height="11" rx="2" />
//         <path d="M7 11V7a5 5 0 0110 0v4" />
//       </svg>
//     ),
//     title: "Secure Auth",
//     desc: "Email verification, Google OAuth, and JWT sessions. Your account is always protected.",
//   },
// ];

// const FAQS = [
//   { q: "Is StreamChat free to use?", a: "Yes — StreamChat is completely free. Create an account, find language partners, and start chatting with no hidden fees or subscriptions." },
//   { q: "How does the language matching work?", a: "During onboarding you select your native language and the language you're learning. StreamChat recommends users whose native language is what you're learning — a perfect exchange setup." },
//   { q: "Do I need to download anything for video calls?", a: "No downloads required. Video calls run directly in your browser using WebRTC technology. Just click the call button and you're connected instantly." },
//   { q: "How do I add friends?", a: "Browse the 'Meet New Learners' section on your dashboard, send a friend request, and once they accept you can start chatting and calling immediately." },
//   { q: "Can I sign in with Google?", a: "Yes. You can create an account with your email or sign in instantly with your Google account — no password needed for Google sign-in." },
//   { q: "Is my data private?", a: "Your messages are handled through Stream.io's secure infrastructure. We never sell your data. You can delete your account at any time." },
//   { q: "What languages are supported?", a: "StreamChat supports 50+ languages — from Spanish and Mandarin to Arabic, Japanese, Hindi, and many more." },
//   { q: "How does online status work?", a: "Online status is powered by Socket.io and updates in real time. As soon as a friend opens the app they appear online — no manual status setting needed." },
// ];

// const STEPS = [
//   { num: "01", title: "Create your account", desc: "Sign up with email or Google in under 30 seconds." },
//   { num: "02", title: "Set up your profile", desc: "Tell us your native language and what you're learning." },
//   { num: "03", title: "Find your partners", desc: "Browse recommended learners matched to your language goals." },
//   { num: "04", title: "Start learning", desc: "Chat, call, and practice with real people every day." },
// ];

// const FAQItem = ({ q, a }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div onClick={() => setOpen(!open)} style={{
//       background: open ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)",
//       border: open ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.08)",
//       borderRadius: "14px", padding: "18px 20px", cursor: "pointer", transition: "all 0.2s",
//     }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
//         <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#f1f0ff", fontFamily: "'Syne', sans-serif", lineHeight: "1.4" }}>
//           {q}
//         </p>
//         <div style={{
//           width: "26px", height: "26px", borderRadius: "8px", flexShrink: 0,
//           background: open ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
//           display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
//         }}>
//           <svg width="12" height="12" fill="none" stroke={open ? "#a78bfa" : "rgba(255,255,255,0.4)"} strokeWidth="2.5" viewBox="0 0 24 24"
//             style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
//             <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
//           </svg>
//         </div>
//       </div>
//       {open && (
//         <p style={{ margin: "12px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
//           {a}
//         </p>
//       )}
//     </div>
//   );
// };

// const LandingPage = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div style={{ minHeight: "100vh", background: "#0a0a14", fontFamily: "'DM Sans', sans-serif", color: "#f1f0ff", overflowX: "hidden" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 4px; }

//         @keyframes pulse-ring {
//           0% { transform: scale(0.95); opacity: 1; }
//           100% { transform: scale(1.5); opacity: 0; }
//         }
//         @keyframes fade-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .fade-up-1 { animation: fade-up 0.6s 0.05s ease both; }
//         .fade-up-2 { animation: fade-up 0.6s 0.15s ease both; }
//         .fade-up-3 { animation: fade-up 0.6s 0.25s ease both; }
//         .fade-up-4 { animation: fade-up 0.6s 0.35s ease both; }

//         .feature-card { transition: all 0.25s ease; }
//         .feature-card:hover { background: rgba(124,58,237,0.1) !important; border-color: rgba(124,58,237,0.3) !important; transform: translateY(-3px); }
//         .cta-primary:hover { opacity: 0.88; transform: translateY(-2px); }
//         .cta-secondary:hover { background: rgba(255,255,255,0.08) !important; }
//         .nav-link:hover { color: #a78bfa !important; }
//         .footer-link:hover { color: #a78bfa !important; }

//         /* ── Responsive ── */
//         @media (max-width: 900px) {
//           .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .step-connector { display: none !important; }
//         }
//         @media (max-width: 600px) {
//           .hero-section { padding: 64px 20px 80px !important; }
//           .hero-title { font-size: 34px !important; letter-spacing: -1px !important; }
//           .hero-sub { font-size: 15px !important; }
//           .hero-btns { flex-direction: column !important; }
//           .hero-btns a { width: 100% !important; justify-content: center !important; }
//           .stats-row { gap: 20px !important; }
//           .section-pad { padding: 64px 20px !important; }
//           .section-title { font-size: 30px !important; }
//           .features-grid { grid-template-columns: 1fr !important; }
//           .steps-grid { grid-template-columns: 1fr !important; }
//           .cta-banner { padding: 40px 24px !important; }
//           .cta-banner h2 { font-size: 28px !important; }
//           .cta-banner-btns { flex-direction: column !important; align-items: stretch !important; }
//           .cta-banner-btns a:first-child { text-align: center !important; }
//           .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 20px !important; }
//           .nav-desktop { display: none !important; }
//           .nav-auth { display: none !important; }
//           .nav-hamburger { display: flex !important; }
//         }
//         @media (min-width: 601px) {
//           .nav-hamburger { display: none !important; }
//           .mobile-menu { display: none !important; }
//         }
//       `}</style>

//       {/* ── Navbar ── */}
//       <nav style={{
//         position: "sticky", top: 0, zIndex: 50,
//         background: "rgba(10,10,20,0.9)", backdropFilter: "blur(16px)",
//         borderBottom: "1px solid rgba(255,255,255,0.06)",
//       }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           {/* Logo */}
//           <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px" }}>
//             <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//               <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
//                 <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
//                 <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
//                 <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
//                 <polygon points="25,25 27,30 20,25" fill="white" />
//               </svg>
//             </div>
//             <span style={{ fontSize: "17px", fontWeight: "800", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//               StreamChat
//             </span>
//           </Link>

//           {/* Desktop nav */}
//           <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
//             {["Features", "How it Works", "FAQ"].map(item => (
//               <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="nav-link"
//                 style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }}>
//                 {item}
//               </a>
//             ))}
//           </div>

//           {/* Desktop auth */}
//           <div className="nav-auth" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <Link to="/login" className="cta-secondary" style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>
//               Sign In
//             </Link>
//             <Link to="/signup" className="cta-primary" style={{ fontSize: "13px", fontWeight: "600", color: "#fff", textDecoration: "none", padding: "7px 16px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", transition: "all 0.2s" }}>
//               Get Started
//             </Link>
//           </div>

//           {/* Mobile hamburger */}
//           <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
//             style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: "4px", display: "flex", alignItems: "center" }}>
//             <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               {menuOpen
//                 ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
//                 : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
//               }
//             </svg>
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {menuOpen && (
//           <div className="mobile-menu" style={{
//             background: "#0e0e1f", borderTop: "1px solid rgba(255,255,255,0.06)",
//             padding: "16px 20px", display: "flex", flexDirection: "column", gap: "4px",
//           }}>
//             {["Features", "How it Works", "FAQ"].map(item => (
//               <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
//                 onClick={() => setMenuOpen(false)}
//                 style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: "500" }}>
//                 {item}
//               </a>
//             ))}
//             <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
//               <Link to="/login" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
//                 Sign In
//               </Link>
//               <Link to="/signup" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
//                 Get Started
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* ── Hero ── */}
//       <section className="hero-section" style={{ position: "relative", overflow: "hidden", padding: "90px 24px 110px", textAlign: "center" }}>
//         <div style={{ position: "absolute", top: "10%", left: "10%", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(124,58,237,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
//         <div style={{ position: "absolute", bottom: "0", right: "5%", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(168,85,247,0.08)", filter: "blur(60px)", pointerEvents: "none" }} />

//         <div style={{ position: "relative", maxWidth: "760px", margin: "0 auto" }}>
//           {/* Badge */}
//           <div className="fade-up-1" style={{
//             display: "inline-flex", alignItems: "center", gap: "8px",
//             background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
//             borderRadius: "100px", padding: "5px 14px", marginBottom: "28px",
//             fontSize: "12px", color: "#a78bfa", fontWeight: "500",
//           }}>
//             <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse-ring 1.5s ease infinite" }} />
//             Now live — connect with learners worldwide
//           </div>

//           <h1 className="hero-title fade-up-2" style={{
//             fontSize: "58px", fontWeight: "900", lineHeight: "1.05",
//             fontFamily: "'Syne', sans-serif", letterSpacing: "-2px", marginBottom: "20px",
//             background: "linear-gradient(135deg, #ffffff 40%, #a78bfa 100%)",
//             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//           }}>
//             Learn languages through real conversations
//           </h1>

//           <p className="hero-sub fade-up-3" style={{
//             fontSize: "17px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7",
//             marginBottom: "40px", maxWidth: "560px", margin: "0 auto 40px",
//           }}>
//             StreamChat connects you with native speakers worldwide. Chat, video call, and build friendships while becoming fluent — faster than any app or textbook.
//           </p>

//           <div className="hero-btns fade-up-4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
//             <Link to="/signup" className="cta-primary" style={{
//               display: "inline-flex", alignItems: "center", gap: "8px",
//               padding: "13px 28px", borderRadius: "11px",
//               background: "linear-gradient(135deg, #7c3aed, #a855f7)",
//               color: "#fff", fontSize: "15px", fontWeight: "700",
//               textDecoration: "none", transition: "all 0.2s",
//               boxShadow: "0 8px 28px rgba(124,58,237,0.4)",
//             }}>
//               Start for free
//               <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </Link>
//             <Link to="/login" className="cta-secondary" style={{
//               display: "inline-flex", alignItems: "center", gap: "8px",
//               padding: "13px 24px", borderRadius: "11px",
//               background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
//               color: "rgba(255,255,255,0.7)", fontSize: "15px", fontWeight: "600",
//               textDecoration: "none", transition: "all 0.2s",
//             }}>
//               Sign in
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="stats-row" style={{ marginTop: "52px", display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
//             {[{ val: "50+", label: "Languages" }, { val: "Real-time", label: "Video & Chat" }, { val: "Free", label: "Forever" }].map(({ val, label }) => (
//               <div key={label} style={{ textAlign: "center" }}>
//                 <p style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>{val}</p>
//                 <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Features ── */}
//       <section id="features" className="section-pad" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "48px" }}>
//           <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Everything you need</p>
//           <h2 className="section-title" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px", marginBottom: "12px" }}>
//             Built for language learners
//           </h2>
//           <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "440px", margin: "0 auto", lineHeight: "1.7" }}>
//             Every feature is designed to make language exchange natural, fun, and effective.
//           </p>
//         </div>

//         <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
//           {FEATURES.map((f, i) => (
//             <div key={i} className="feature-card" style={{
//               background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
//               borderRadius: "14px", padding: "24px",
//             }}>
//               <div style={{
//                 width: "44px", height: "44px", borderRadius: "11px",
//                 background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))",
//                 border: "1px solid rgba(124,58,237,0.2)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 color: "#a78bfa", marginBottom: "16px",
//               }}>
//                 {f.icon}
//               </div>
//               <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{f.title}</h3>
//               <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── How it Works ── */}
//       <section id="how-it-works" className="section-pad" style={{
//         padding: "80px 24px",
//         background: "linear-gradient(135deg, rgba(124,58,237,0.05), rgba(10,10,20,0))",
//         borderTop: "1px solid rgba(255,255,255,0.04)",
//         borderBottom: "1px solid rgba(255,255,255,0.04)",
//       }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "48px" }}>
//             <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Simple process</p>
//             <h2 className="section-title" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px" }}>
//               Up and running in minutes
//             </h2>
//           </div>

//           <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
//             {STEPS.map((step, i) => (
//               <div key={i} style={{ position: "relative" }}>
//                 <div className="step-connector" style={{
//                   position: "absolute", top: "22px", left: "calc(50% + 26px)",
//                   width: "calc(100% - 16px)", height: "1px",
//                   background: "linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.05))",
//                   display: i < STEPS.length - 1 ? "block" : "none",
//                 }} />
//                 <div style={{ textAlign: "center" }}>
//                   <div style={{
//                     width: "44px", height: "44px", borderRadius: "12px",
//                     background: "linear-gradient(135deg, #7c3aed, #a855f7)",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     margin: "0 auto 14px",
//                     fontSize: "13px", fontWeight: "800", color: "#fff", fontFamily: "'Syne', sans-serif",
//                     boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
//                   }}>
//                     {step.num}
//                   </div>
//                   <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{step.title}</h3>
//                   <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>{step.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FAQ ── */}
//       <section id="faq" className="section-pad" style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "48px" }}>
//           <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Got questions?</p>
//           <h2 className="section-title" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px", marginBottom: "12px" }}>
//             Frequently asked
//           </h2>
//           <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
//             Everything you need to know about StreamChat.
//           </p>
//         </div>
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//           {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
//         </div>
//       </section>

//       {/* ── CTA Banner ── */}
//       <section style={{ padding: "60px 20px 80px", maxWidth: "860px", margin: "0 auto" }}>
//         <div className="cta-banner" style={{
//           background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(168,85,247,0.08))",
//           border: "1px solid rgba(124,58,237,0.25)",
//           borderRadius: "20px", padding: "56px 40px",
//           textAlign: "center", position: "relative", overflow: "hidden",
//         }}>
//           <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(124,58,237,0.15)", filter: "blur(40px)", pointerEvents: "none" }} />
//           <div style={{ position: "relative" }}>
//             <h2 style={{ fontSize: "36px", fontWeight: "900", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px", marginBottom: "14px" }}>
//               Ready to start speaking?
//             </h2>
//             <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", marginBottom: "32px", lineHeight: "1.7", maxWidth: "460px", margin: "0 auto 32px" }}>
//               Join thousands of language learners having real conversations every day. Free, instant, and it actually works.
//             </p>
//             <div className="cta-banner-btns" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
//               <Link to="/signup" className="cta-primary" style={{
//                 display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
//                 padding: "13px 32px", borderRadius: "11px",
//                 background: "linear-gradient(135deg, #7c3aed, #a855f7)",
//                 color: "#fff", fontSize: "14px", fontWeight: "700",
//                 textDecoration: "none", transition: "all 0.2s",
//                 boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
//               }}>
//                 Create free account
//               </Link>
//               <Link to="/login" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontWeight: "500" }}>
//                 Already have an account? Sign in →
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Footer ── */}
//       <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 20px" }}>
//         <div className="footer-inner" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
//                 <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
//                 <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
//                 <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
//                 <polygon points="25,25 27,30 20,25" fill="white" />
//               </svg>
//             </div>
//             <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//               StreamChat
//             </span>
//           </div>
//           <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
//             © {new Date().getFullYear()} StreamChat. Built for language learners everywhere.
//           </p>
//           <div style={{ display: "flex", gap: "18px" }}>
//             {[["Features", "#features"], ["FAQ", "#faq"], ["Sign Up", "/signup"]].map(([label, href]) => (
//               href.startsWith("/")
//                 ? <Link key={label} to={href} className="footer-link" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}>{label}</Link>
//                 : <a key={label} href={href} className="footer-link" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}>{label}</a>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;


import { useState, useEffect } from "react";
import { Link } from "react-router";

// ─── Animated Chat Demo Data ──────────────────────────────────
const CHAT_MESSAGES = [
  { id: 1, user: "Priya", avatar: "P", color: "#7c3aed", text: "Hola! ¿Cómo estás hoy?", time: "2:41 PM", own: false },
  { id: 2, user: "You", avatar: "Y", color: "#0891b2", text: "¡Muy bien! Estoy practicando español 😊", time: "2:42 PM", own: true },
  { id: 3, user: "Priya", avatar: "P", color: "#7c3aed", text: "Tu español es muy bueno!", time: "2:42 PM", own: false },
  { id: 4, user: "You", avatar: "Y", color: "#0891b2", text: "Gracias! Want to do a video call?", time: "2:43 PM", own: true },
  { id: 5, user: "Priya", avatar: "P", color: "#7c3aed", text: "¡Sí! Starting now 🎥", time: "2:43 PM", own: false },
];

const REACTIONS = ["❤️", "😂", "👏", "🔥", "😍"];
const FEATURES = [
  { icon: "💬", title: "Instant Messaging", desc: "Zero-lag real-time chat. Send messages, share files, react with emojis — all in one fluid experience." },
  { icon: "🎥", title: "HD Video Calls", desc: "One-click video calls with crystal-clear quality. No downloads, no sign-ups — just connect instantly." },
  { icon: "🌍", title: "Language Exchange", desc: "Get matched with native speakers of your target language. The fastest path to real fluency." },
  { icon: "🟢", title: "Live Presence", desc: "See who's online right now. Real-time status updates across every device, instantly." },
  { icon: "🔔", title: "Smart Notifications", desc: "Friend requests, messages, calls — stay connected without missing a beat." },
  { icon: "🔒", title: "Private & Secure", desc: "Google OAuth, email verification, and encrypted sessions. Your conversations stay yours." },
];

const FAQS = [
  { q: "Is StreamChat completely free?", a: "Yes — 100% free. No subscriptions, no hidden fees. Create an account and start chatting immediately." },
  { q: "How does language matching work?", a: "During onboarding you pick your native language and what you're learning. We match you with people whose native language is what you want to learn — a perfect two-way exchange." },
  { q: "Do I need to download anything for video calls?", a: "Nothing. Video calls run entirely in your browser. Click call, and you're connected — it's that simple." },
  { q: "Can I use my Google account to sign in?", a: "Yes. Hit 'Continue with Google' and you're in within seconds — no password needed." },
  { q: "How do friend requests work?", a: "Browse suggested learners, send a request, and once they accept you can chat and call immediately." },
  { q: "What languages are supported?", a: "50+ languages including Spanish, Mandarin, Arabic, Japanese, French, Hindi, Portuguese, Korean, and many more." },
  { q: "How accurate is the online status?", a: "It updates in real time via WebSockets. The moment someone opens the app they appear online — no delays, no polling." },
  { q: "Is my data private?", a: "Absolutely. We never sell your data. Messages are handled through secure infrastructure and you can delete your account any time." },
];

// ─── FAQ Item ─────────────────────────────────────────────────
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: open ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.025)",
      border: open ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px", padding: "20px 22px", cursor: "pointer",
      transition: "all 0.22s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#f0eeff", fontFamily: "'Syne', sans-serif", lineHeight: "1.4" }}>{q}</p>
        <div style={{
          width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
          background: open ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
        }}>
          <svg width="12" height="12" fill="none" stroke={open ? "#a78bfa" : "rgba(255,255,255,0.4)"} strokeWidth="2.5" viewBox="0 0 24 24"
            style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.22s" }}>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>
      {open && <p style={{ margin: "12px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.48)", lineHeight: "1.75" }}>{a}</p>}
    </div>
  );
};

// ─── Animated Chat Mock ───────────────────────────────────────
const ChatMock = () => {
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [typing, setTyping] = useState(false);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    let current = 0;
    const showNext = () => {
      if (current < CHAT_MESSAGES.length) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          current++;
          setVisibleMsgs(current);
          if (current === CHAT_MESSAGES.length) {
            // Show reaction then restart
            setTimeout(() => setReaction(REACTIONS[Math.floor(Math.random() * REACTIONS.length)]), 600);
            setTimeout(() => { setReaction(null); setVisibleMsgs(0); current = 0; showNext(); }, 3000);
          } else {
            setTimeout(showNext, 1200);
          }
        }, 800);
      }
    };
    const t = setTimeout(showNext, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      background: "#0e0e1f",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Chat Header */}
      <div style={{
        padding: "14px 16px",
        background: "rgba(124,58,237,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>P</div>
        <div>
          <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#f0eeff" }}>Priya · Spanish Native</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
            <p style={{ margin: 0, fontSize: "11px", color: "#22c55e" }}>Online</p>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
          </div>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.9 1.18 2 2 0 012.92 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "hidden", justifyContent: "flex-end" }}>
        {CHAT_MESSAGES.slice(0, visibleMsgs).map((msg, i) => (
          <div key={msg.id} style={{
            display: "flex", flexDirection: msg.own ? "row-reverse" : "row",
            alignItems: "flex-end", gap: "8px",
            animation: "msgIn 0.3s ease forwards",
            position: "relative",
          }}>
            {!msg.own && (
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: `linear-gradient(135deg, ${msg.color}, ${msg.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>
                {msg.avatar}
              </div>
            )}
            <div style={{
              maxWidth: "75%", padding: "9px 13px", borderRadius: msg.own ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: msg.own ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.07)",
              border: msg.own ? "none" : "1px solid rgba(255,255,255,0.08)",
              position: "relative",
            }}>
              <p style={{ margin: 0, fontSize: "13px", color: msg.own ? "#fff" : "#e2e0ff", lineHeight: "1.5" }}>{msg.text}</p>
              <p style={{ margin: "3px 0 0", fontSize: "10px", color: msg.own ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)", textAlign: msg.own ? "right" : "left" }}>{msg.time}</p>
              {/* Reaction */}
              {reaction && i === visibleMsgs - 1 && (
                <div style={{
                  position: "absolute", bottom: "-10px", right: msg.own ? "auto" : "-10px", left: msg.own ? "-10px" : "auto",
                  background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "100px", padding: "2px 7px", fontSize: "12px",
                  animation: "reactionPop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
                }}>
                  {reaction}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #7c3aed88)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: "#fff" }}>P</div>
            <div style={{ padding: "9px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px 14px 14px 4px", display: "flex", gap: "4px", alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#a78bfa", animation: `typingDot 1.2s ${i * 0.2}s infinite ease-in-out` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "8px 12px", fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
          Type a message...
        </div>
        <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  );
};

// ─── Video Call Mock ──────────────────────────────────────────
const VideoMock = () => {
  const [callTime, setCallTime] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCallTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div style={{
      background: "#0e0e1f",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* Main video area */}
      <div style={{
        flex: 1,
        background: "linear-gradient(135deg, #1a0a2e, #0d1a2e)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        minHeight: "160px",
      }}>
        {/* Remote user */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", fontWeight: "800", color: "#fff",
            margin: "0 auto 10px",
            boxShadow: "0 0 0 3px rgba(124,58,237,0.3), 0 0 0 6px rgba(124,58,237,0.1)",
            animation: "speaking 2s ease-in-out infinite",
          }}>P</div>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#f0eeff" }}>Priya</p>
          <p style={{ margin: "3px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Speaking...</p>
        </div>

        {/* Call timer */}
        <div style={{
          position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          borderRadius: "100px", padding: "4px 12px",
          fontSize: "12px", color: "#f0eeff", fontWeight: "600",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "blink 1s infinite" }} />
          {fmt(callTime)}
        </div>

    
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          width: "70px", height: "52px",
          background: "linear-gradient(135deg, #0d2a1a, #0a1a2e)",
          borderRadius: "10px", border: "2px solid rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #0891b2, #0e7490)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#fff" }}>Y</div>
        </div>
      </div>

      {/* Call controls */}
      <div style={{
        padding: "14px 16px",
        background: "rgba(0,0,0,0.3)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
      }}>
        {[
          { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" /><path d="M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23M12 19v3M8 23h8" /></svg>, bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" },
          { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>, bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" },
          { icon: <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.81 19.79 19.79 0 011 2.18 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91" /><line x1="23" y1="1" x2="1" y2="23" /></svg>, bg: "#ef4444", color: "#fff" },
          { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>, bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" },
        ].map((btn, i) => (
          <div key={i} style={{ width: "38px", height: "38px", borderRadius: "50%", background: btn.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: btn.color, border: i === 2 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
            {btn.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────
const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState("chat");

  return (
    <div style={{ minHeight: "100vh", background: "#08080f", fontFamily: "'DM Sans', sans-serif", color: "#f0eeff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.5); border-radius: 4px; }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes reactionPop {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes speaking {
          0%, 100% { box-shadow: 0 0 0 3px rgba(124,58,237,0.3), 0 0 0 6px rgba(124,58,237,0.1); }
          50% { box-shadow: 0 0 0 5px rgba(124,58,237,0.5), 0 0 0 10px rgba(124,58,237,0.15); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .fu1 { animation: fadeUp 0.6s 0.0s ease both; }
        .fu2 { animation: fadeUp 0.6s 0.12s ease both; }
        .fu3 { animation: fadeUp 0.6s 0.24s ease both; }
        .fu4 { animation: fadeUp 0.6s 0.36s ease both; }
        .fu5 { animation: fadeUp 0.6s 0.48s ease both; }

        .feat-card { transition: all 0.22s ease; cursor: default; }
        .feat-card:hover { background: rgba(124,58,237,0.1) !important; border-color: rgba(124,58,237,0.35) !important; transform: translateY(-3px); }
        .cta-btn { transition: all 0.2s ease; }
        .cta-btn:hover { opacity: 0.88; transform: translateY(-2px); }
        .ghost-btn { transition: all 0.2s ease; }
        .ghost-btn:hover { background: rgba(255,255,255,0.09) !important; }
        .nav-a { transition: color 0.18s; }
        .nav-a:hover { color: #a78bfa !important; }
        .demo-tab { transition: all 0.2s ease; cursor: pointer; }

        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .demo-grid { grid-template-columns: 1fr !important; }
          .demo-grid > div:last-child { display: none; }
        }
        @media (max-width: 640px) {
          .hero-h { font-size: 32px !important; letter-spacing: -0.5px !important; }
          .hero-sub { font-size: 15px !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns a, .hero-btns button { width: 100% !important; justify-content: center !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
          .sec { padding: 60px 18px !important; }
          .sec-h { font-size: 28px !important; }
          .cta-box { padding: 36px 20px !important; }
          .cta-box h2 { font-size: 26px !important; }
          .cta-box-btns { flex-direction: column !important; align-items: stretch !important; }
          .cta-box-btns a { text-align: center !important; }
          .foot-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 18px !important; }
          .nav-d { display: none !important; }
          .nav-auth-d { display: none !important; }
          .ham { display: flex !important; }
          .stats-r { gap: 18px !important; }
        }
        @media (min-width: 641px) {
          .ham { display: none !important; }
          .mob-menu { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 20px", height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
                <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
                <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
                <polygon points="25,25 27,30 20,25" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: "16px", fontWeight: "800", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #c4b5fd, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StreamChat</span>
          </Link>

          <div className="nav-d" style={{ display: "flex", alignItems: "center", gap: "26px" }}>
            {[["Features", "#features"], ["Demo", "#demo"], ["FAQ", "#faq"]].map(([label, href]) => (
              <a key={label} href={href} className="nav-a" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontWeight: "500" }}>{label}</a>
            ))}
          </div>

          <div className="nav-auth-d" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link to="/login" className="ghost-btn" style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.55)", textDecoration: "none", padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.09)", background: "transparent" }}>Sign In</Link>
            <Link to="/signup" className="cta-btn" style={{ fontSize: "13px", fontWeight: "700", color: "#fff", textDecoration: "none", padding: "7px 16px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 4px 14px rgba(124,58,237,0.35)" }}>Get Started</Link>
          </div>

          <button className="ham" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", padding: "4px", display: "flex", alignItems: "center" }}>
            <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="mob-menu" style={{ background: "#10101e", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "14px 20px", display: "flex", flexDirection: "column", gap: "2px" }}>
            {[["Features", "#features"], ["Demo", "#demo"], ["FAQ", "#faq"]].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontWeight: "500" }}>{label}</a>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <Link to="/login" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Sign In</Link>
              <Link to="/signup" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "700" }}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "88px 20px 100px", textAlign: "center" }}>
        {/* Mesh bg */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "30%", right: "-15%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "30%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)" }} />
          {/* Grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div style={{ position: "relative", maxWidth: "780px", margin: "0 auto" }}>
          {/* Live badge */}
          <div className="fu1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.28)", borderRadius: "100px", padding: "5px 14px", marginBottom: "28px", fontSize: "12px", color: "#c4b5fd", fontWeight: "500" }}>
            <span style={{ position: "relative", width: "7px", height: "7px", display: "inline-flex" }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#a78bfa", animation: "pulseRing 1.4s ease-out infinite" }} />
              <span style={{ position: "relative", width: "7px", height: "7px", borderRadius: "50%", background: "#a78bfa" }} />
            </span>
            Now live — connect with speakers worldwide
          </div>

          <h1 className="hero-h fu2" style={{
            fontSize: "58px", fontWeight: "900", lineHeight: "1.04", fontFamily: "'Syne', sans-serif",
            letterSpacing: "-1.5px", marginBottom: "22px",
          }}>
            <span style={{ background: "linear-gradient(135deg, #fff 0%, #e0d9ff 50%, #a78bfa 100%)", backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Seamless Video Calls & Real-Time Chat
            </span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: "700", fontSize: "0.72em" }}>All in one place.</span>
          </h1>

          <p className="hero-sub fu3" style={{ fontSize: "17px", color: "rgba(255,255,255,0.42)", lineHeight: "1.75", maxWidth: "540px", margin: "0 auto 40px" }}>
            Connect with native speakers worldwide. Practice languages through real conversations — chat, call, and make friends as you become fluent.
          </p>

          <div className="hero-btns fu4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/signup" className="cta-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "9px", padding: "14px 30px",
              borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", fontSize: "15px", fontWeight: "700", textDecoration: "none",
              boxShadow: "0 8px 28px rgba(124,58,237,0.42)",
            }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              Start Chatting
            </Link>
            <Link to="/signup" className="ghost-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "9px", padding: "14px 26px",
              borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)",
              color: "rgba(255,255,255,0.7)", fontSize: "15px", fontWeight: "600", textDecoration: "none",
            }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
              Join a Call
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-r fu5" style={{ marginTop: "56px", display: "flex", alignItems: "center", justifyContent: "center", gap: "36px", flexWrap: "wrap" }}>
            {[{ v: "50+", l: "Languages" }, { v: "< 100ms", l: "Latency" }, { v: "Free", l: "Forever" }, { v: "Real-time", l: "Everything" }].map(({ v, l }) => (
              <div key={l} style={{ textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: "19px", fontWeight: "800", color: "#f0eeff", fontFamily: "'Syne', sans-serif" }}>{v}</p>
                <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "1px" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="sec" style={{ padding: "80px 20px", maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Live preview</p>
          <h2 className="sec-h" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.8px", marginBottom: "12px" }}>See it in action</h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.38)", maxWidth: "420px", margin: "0 auto" }}>Real UI — not a mockup. This is exactly what you'll use.</p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
          {[["chat", "💬 Chat"], ["call", "🎥 Video Call"]].map(([key, label]) => (
            <button key={key} className="demo-tab" onClick={() => setActiveDemo(key)}
              style={{
                padding: "8px 20px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", border: "none",
                background: activeDemo === key ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)",
                color: activeDemo === key ? "#fff" : "rgba(255,255,255,0.45)",
                boxShadow: activeDemo === key ? "0 4px 14px rgba(124,58,237,0.35)" : "none",
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Demo grid */}
        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", height: "400px" }}>
          <div style={{ height: "100%" }}>
            {activeDemo === "chat" ? <ChatMock /> : <VideoMock />}
          </div>
          <div style={{ height: "100%" }}>
            {activeDemo === "chat" ? <VideoMock /> : <ChatMock />}
          </div>
        </div>

        {/* Feature callouts below demo */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
          {["✅ Zero lag messaging", "✅ HD video calling", "✅ Real-time presence", "✅ Emoji reactions"].map(f => (
            <span key={f} style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "100px", padding: "5px 14px" }}>{f}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="sec" style={{ padding: "80px 20px", background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.04), transparent)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Everything included</p>
            <h2 className="sec-h" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.8px", marginBottom: "12px" }}>Built for real conversations</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.38)", maxWidth: "420px", margin: "0 auto", lineHeight: "1.7" }}>Every feature designed to make language exchange natural and effective.</p>
          </div>

          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feat-card" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "24px" }}>
                <div style={{ fontSize: "26px", marginBottom: "14px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#f0eeff", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)", lineHeight: "1.7" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="sec" style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Simple process</p>
          <h2 className="sec-h" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.8px" }}>Up in under 2 minutes</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          {[
            { n: "01", t: "Create account", d: "Sign up with email or Google. Verify and you're in." },
            { n: "02", t: "Set your profile", d: "Pick your native language and what you're learning." },
            { n: "03", t: "Find partners", d: "Browse learners matched to your exact language goals." },
            { n: "04", t: "Start speaking", d: "Chat, call, and practice. Real fluency, real fast." },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "8px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "13px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "13px", fontWeight: "800", color: "#fff", fontFamily: "'Syne', sans-serif", boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}>{s.n}</div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#f0eeff", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{s.t}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: "1.65" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="sec" style={{ padding: "80px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Questions</p>
          <h2 className="sec-h" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.8px", marginBottom: "10px" }}>Frequently asked</h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.38)" }}>Everything you need to know.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "60px 20px 80px", maxWidth: "820px", margin: "0 auto" }}>
        <div className="cta-box" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(59,130,246,0.06))", border: "1px solid rgba(124,58,237,0.22)", borderRadius: "20px", padding: "56px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(124,58,237,0.15)", filter: "blur(50px)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "900", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.8px", marginBottom: "14px" }}>Ready to start speaking?</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.42)", marginBottom: "32px", lineHeight: "1.75", maxWidth: "420px", margin: "0 auto 32px" }}>
              Join language learners having real conversations every day. Free, instant, and it actually works.
            </p>
            <div className="cta-box-btns" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/signup" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 30px", borderRadius: "11px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", fontSize: "14px", fontWeight: "700", textDecoration: "none", boxShadow: "0 8px 24px rgba(124,58,237,0.45)" }}>
                Create free account
              </Link>
              <Link to="/login" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: "500" }}>
                Already have an account? Sign in →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.055)", padding: "26px 20px" }}>
        <div className="foot-inner" style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 32 32" fill="none"><rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" /><polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" /><rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" /><polygon points="25,25 27,30 20,25" fill="white" /></svg>
            </div>
            <span style={{ fontSize: "13px", fontWeight: "700", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #c4b5fd, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StreamChat</span>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)" }}>© {new Date().getFullYear()} StreamChat · Built for language learners everywhere.</p>
          <div style={{ display: "flex", gap: "18px" }}>
            {[["Features", "#features"], ["FAQ", "#faq"], ["Sign Up", "/signup"]].map(([label, href]) => (
              href.startsWith("/")
                ? <Link key={label} to={href} style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>{label}</Link>
                : <a key={label} href={href} style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;