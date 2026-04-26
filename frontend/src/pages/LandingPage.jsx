import { useState } from "react";
import { Link } from "react-router";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Real-Time Chat",
    desc: "Instant messaging powered by Stream.io. Send messages and react with emojis — all in real time with zero lag.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: "HD Video Calls",
    desc: "Crystal-clear video calling built right into the chat. No downloads — just click and connect.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    title: "Language Exchange",
    desc: "Find partners who speak your target language natively. Matched by language goals.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
    title: "Friend System",
    desc: "Send friend requests, manage your network, and get notified instantly when requests arrive.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Online Presence",
    desc: "See who's online in real time. Socket.io powers instant status updates across all devices.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Secure Auth",
    desc: "Email verification, Google OAuth, and JWT sessions. Your account is always protected.",
  },
];

const FAQS = [
  { q: "Is StreamChat free to use?", a: "Yes — StreamChat is completely free. Create an account, find language partners, and start chatting with no hidden fees or subscriptions." },
  { q: "How does the language matching work?", a: "During onboarding you select your native language and the language you're learning. StreamChat recommends users whose native language is what you're learning — a perfect exchange setup." },
  { q: "Do I need to download anything for video calls?", a: "No downloads required. Video calls run directly in your browser using WebRTC technology. Just click the call button and you're connected instantly." },
  { q: "How do I add friends?", a: "Browse the 'Meet New Learners' section on your dashboard, send a friend request, and once they accept you can start chatting and calling immediately." },
  { q: "Can I sign in with Google?", a: "Yes. You can create an account with your email or sign in instantly with your Google account — no password needed for Google sign-in." },
  { q: "Is my data private?", a: "Your messages are handled through Stream.io's secure infrastructure. We never sell your data. You can delete your account at any time." },
  { q: "What languages are supported?", a: "StreamChat supports 50+ languages — from Spanish and Mandarin to Arabic, Japanese, Hindi, and many more." },
  { q: "How does online status work?", a: "Online status is powered by Socket.io and updates in real time. As soon as a friend opens the app they appear online — no manual status setting needed." },
];

const STEPS = [
  { num: "01", title: "Create your account", desc: "Sign up with email or Google in under 30 seconds." },
  { num: "02", title: "Set up your profile", desc: "Tell us your native language and what you're learning." },
  { num: "03", title: "Find your partners", desc: "Browse recommended learners matched to your language goals." },
  { num: "04", title: "Start learning", desc: "Chat, call, and practice with real people every day." },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: open ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)",
      border: open ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px", padding: "18px 20px", cursor: "pointer", transition: "all 0.2s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#f1f0ff", fontFamily: "'Syne', sans-serif", lineHeight: "1.4" }}>
          {q}
        </p>
        <div style={{
          width: "26px", height: "26px", borderRadius: "8px", flexShrink: 0,
          background: open ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
        }}>
          <svg width="12" height="12" fill="none" stroke={open ? "#a78bfa" : "rgba(255,255,255,0.4)"} strokeWidth="2.5" viewBox="0 0 24 24"
            style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>
      {open && (
        <p style={{ margin: "12px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
          {a}
        </p>
      )}
    </div>
  );
};

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", fontFamily: "'DM Sans', sans-serif", color: "#f1f0ff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 4px; }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fade-up 0.6s 0.05s ease both; }
        .fade-up-2 { animation: fade-up 0.6s 0.15s ease both; }
        .fade-up-3 { animation: fade-up 0.6s 0.25s ease both; }
        .fade-up-4 { animation: fade-up 0.6s 0.35s ease both; }

        .feature-card { transition: all 0.25s ease; }
        .feature-card:hover { background: rgba(124,58,237,0.1) !important; border-color: rgba(124,58,237,0.3) !important; transform: translateY(-3px); }
        .cta-primary:hover { opacity: 0.88; transform: translateY(-2px); }
        .cta-secondary:hover { background: rgba(255,255,255,0.08) !important; }
        .nav-link:hover { color: #a78bfa !important; }
        .footer-link:hover { color: #a78bfa !important; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .step-connector { display: none !important; }
        }
        @media (max-width: 600px) {
          .hero-section { padding: 64px 20px 80px !important; }
          .hero-title { font-size: 34px !important; letter-spacing: -1px !important; }
          .hero-sub { font-size: 15px !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns a { width: 100% !important; justify-content: center !important; }
          .stats-row { gap: 20px !important; }
          .section-pad { padding: 64px 20px !important; }
          .section-title { font-size: 30px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .cta-banner { padding: 40px 24px !important; }
          .cta-banner h2 { font-size: 28px !important; }
          .cta-banner-btns { flex-direction: column !important; align-items: stretch !important; }
          .cta-banner-btns a:first-child { text-align: center !important; }
          .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 20px !important; }
          .nav-desktop { display: none !important; }
          .nav-auth { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 601px) {
          .nav-hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(10,10,20,0.9)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
                <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
                <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
                <polygon points="25,25 27,30 20,25" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: "17px", fontWeight: "800", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              StreamChat
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {["Features", "How it Works", "FAQ"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="nav-link"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }}>
                {item}
              </a>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="nav-auth" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link to="/login" className="cta-secondary" style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>
              Sign In
            </Link>
            <Link to="/signup" className="cta-primary" style={{ fontSize: "13px", fontWeight: "600", color: "#fff", textDecoration: "none", padding: "7px 16px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", transition: "all 0.2s" }}>
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: "4px", display: "flex", alignItems: "center" }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" style={{
            background: "#0e0e1f", borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 20px", display: "flex", flexDirection: "column", gap: "4px",
          }}>
            {["Features", "How it Works", "FAQ"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: "500" }}>
                {item}
              </a>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <Link to="/login" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
                Sign In
              </Link>
              <Link to="/signup" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="hero-section" style={{ position: "relative", overflow: "hidden", padding: "90px 24px 110px", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(124,58,237,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", right: "5%", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(168,85,247,0.08)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "760px", margin: "0 auto" }}>
          {/* Badge */}
          <div className="fade-up-1" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "28px",
            fontSize: "12px", color: "#a78bfa", fontWeight: "500",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff000", display: "inline-block", animation: "pulse-ring 1.5s ease infinite" }} />
            Now live — connect with learners worldwide
          </div>

          <h1 className="hero-title fade-up-2" style={{
            fontSize: "58px", fontWeight: "900", lineHeight: "1.05",
            fontFamily: "'Syne', sans-serif", letterSpacing: "-2px", marginBottom: "20px",
            background: "linear-gradient(135deg, #ffffff 40%, #a78bfa 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Learn languages through real conversations
          </h1>

          <p className="hero-sub fade-up-3" style={{
            fontSize: "17px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7",
            marginBottom: "40px", maxWidth: "560px", margin: "0 auto 40px",
          }}>
            StreamChat connects you with native speakers worldwide. Chat, video call, and build friendships while becoming fluent — faster than any app or textbook.
          </p>

          <div className="hero-btns fade-up-4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/signup" className="cta-primary" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 28px", borderRadius: "11px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", fontSize: "15px", fontWeight: "700",
              textDecoration: "none", transition: "all 0.2s",
              boxShadow: "0 8px 28px rgba(124,58,237,0.4)",
            }}>
              Start for free
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/login" className="cta-secondary" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 24px", borderRadius: "11px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)", fontSize: "15px", fontWeight: "600",
              textDecoration: "none", transition: "all 0.2s",
            }}>
              Sign in
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-row" style={{ marginTop: "52px", display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {[{ val: "50+", label: "Languages" }, { val: "Real-time", label: "Video & Chat" }, { val: "Free", label: "Forever" }].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>{val}</p>
                <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="section-pad" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Everything you need</p>
          <h2 className="section-title" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px", marginBottom: "12px" }}>
            Built for language learners
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "440px", margin: "0 auto", lineHeight: "1.7" }}>
            Every feature is designed to make language exchange natural, fun, and effective.
          </p>
        </div>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px", padding: "24px",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "11px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))",
                border: "1px solid rgba(124,58,237,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#a78bfa", marginBottom: "16px",
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className="section-pad" style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg, rgba(124,58,237,0.05), rgba(10,10,20,0))",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Simple process</p>
            <h2 className="section-title" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px" }}>
              Up and running in minutes
            </h2>
          </div>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div className="step-connector" style={{
                  position: "absolute", top: "22px", left: "calc(50% + 26px)",
                  width: "calc(100% - 16px)", height: "1px",
                  background: "linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.05))",
                  display: i < STEPS.length - 1 ? "block" : "none",
                }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                    fontSize: "13px", fontWeight: "800", color: "#fff", fontFamily: "'Syne', sans-serif",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#f1f0ff", fontFamily: "'Syne', sans-serif", marginBottom: "8px" }}>{step.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section-pad" style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", fontWeight: "600", color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Got questions?</p>
          <h2 className="section-title" style={{ fontSize: "36px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px", marginBottom: "12px" }}>
            Frequently asked
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>
            Everything you need to know about StreamChat.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "60px 20px 80px", maxWidth: "860px", margin: "0 auto" }}>
        <div className="cta-banner" style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(168,85,247,0.08))",
          border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: "20px", padding: "56px 40px",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(124,58,237,0.15)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "900", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px", marginBottom: "14px" }}>
              Ready to start speaking?
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", marginBottom: "32px", lineHeight: "1.7", maxWidth: "460px", margin: "0 auto 32px" }}>
              Join thousands of language learners having real conversations every day. Free, instant, and it actually works.
            </p>
            <div className="cta-banner-btns" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/signup" className="cta-primary" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "13px 32px", borderRadius: "11px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "#fff", fontSize: "14px", fontWeight: "700",
                textDecoration: "none", transition: "all 0.2s",
                boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
              }}>
                Create free account
              </Link>
              <Link to="/login" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontWeight: "500" }}>
                Already have an account? Sign in →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 20px" }}>
        <div className="footer-inner" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                <rect x="5" y="7" width="14" height="10" rx="3.5" fill="white" fillOpacity="0.45" />
                <polygon points="7,17 5,22 12,17" fill="white" fillOpacity="0.45" />
                <rect x="13" y="15" width="14" height="10" rx="3.5" fill="white" />
                <polygon points="25,25 27,30 20,25" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              StreamChat
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} StreamChat. Built for language learners everywhere.
          </p>
          <div style={{ display: "flex", gap: "18px" }}>
            {[["Features", "#features"], ["FAQ", "#faq"], ["Sign Up", "/signup"]].map(([label, href]) => (
              href.startsWith("/")
                ? <Link key={label} to={href} className="footer-link" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}>{label}</Link>
                : <a key={label} href={href} className="footer-link" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}>{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
