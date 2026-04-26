import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShuffleIcon, ShipWheelIcon } from "lucide-react";
import { LANGUAGES } from "../constants";
import { axiosInstance } from "../lib/axios";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const [previewUrl,setPreviewUrl] = useState(authUser?.profilePic || null)
  const [uploading, setUploading] = useState(false);
  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

 
  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleFileChange = async(e) =>{
const file = e.target.files[0];
if(!file) return;
setPreviewUrl(URL.createObjectURL(file))
setUploading(true);
try{
const formData = new FormData();
formData.append("profilePic",file);
const res = await axiosInstance.post('/auth/upload-profile-pic',formData,{
  headers:{"Content-Type":"multipart/form-data"}
})

setFormState(prev=>({
  ...prev,
  profilePic:res.data.profilePic
  
}))


    toast.success("Profile picture uploaded!");
}
catch{
    toast.error("Upload failed. Please try again.");
    setPreviewUrl(null);
}
finally{
      setUploading(false);

}

  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://api.dicebear.com/9.x/toon-head/svg?seed=${idx}`;
setFormState(prev => ({
  ...prev,
  profilePic: randomAvatar
}));
    toast.success("Random avatar generated!");
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0d1a",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 20px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        .ob-input {
          width: 100%; padding: 11px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #f1f0ff;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
        }
        .ob-input:focus { border-color: rgba(124,58,237,0.6); background: rgba(255,255,255,0.07); }
        .ob-input::placeholder { color: rgba(255,255,255,0.25); }
        .ob-select {
          width: 100%; padding: 11px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #f1f0ff;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
          appearance: none; cursor: pointer;
        }
        .ob-select:focus { border-color: rgba(124,58,237,0.6); }
        .ob-select option { background: #13131f; color: #f1f0ff; }
        .ob-textarea {
          width: 100%; padding: 11px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #f1f0ff;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
          resize: vertical; min-height: 90px;
        }
        .ob-textarea:focus { border-color: rgba(124,58,237,0.6); }
        .ob-textarea::placeholder { color: rgba(255,255,255,0.25); }
        .ob-label {
          display: block; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.6); margin-bottom: 7px;
        }
        .ob-btn-primary {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 10px;
          color: #fff; font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: opacity 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ob-btn-primary:hover { opacity: 0.88; }
        .ob-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .ob-btn-secondary {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 10px;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.3);
          color: #a78bfa; font-size: 13px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .ob-btn-secondary:hover { background: rgba(124,58,237,0.2); }
        @keyframes sc-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        width: "100%", maxWidth: "600px",
        background: "#0a0a14",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
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
          <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", color: "#f1f0ff", fontFamily: "'Syne', sans-serif" }}>
            Complete Your Profile
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            Set up your profile to connect with language partners
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
             {/* Avatar Preview */}
            <div style={{
              width: "96px", height: "96px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "2px solid rgba(124,58,237,0.3)",
              overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",position:"relative"
            }}>
              {formState.profilePic ? (
                <img src={formState.profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}

              {uploading &&(
                   <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: "22px", height: "22px", borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.2)",
          borderTop: "2px solid #fff",
          animation: "sc-spin 0.75s linear infinite",
        }} />
      </div>
              )}


            </div>
            <label style={{
    display: "inline-flex", alignItems: "center", gap: "7px",
    padding: "8px 18px", borderRadius: "10px", cursor: uploading ? "not-allowed" : "pointer",
    background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
    color: "#a78bfa", fontSize: "13px", fontWeight: "600",
    opacity: uploading ? 0.6 : 1, transition: "all 0.2s",
  }}>
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    {uploading? "Uploading...":"Upload Photo"}

    <input type="file" accept="image/*"  onChange={handleFileChange} disabled = {uploading} style={{display:none}} />

  </label>
            <button type="button" onClick={handleRandomAvatar}   style={{
      background: "none", border: "none", cursor: "pointer",
      fontSize: "12px", color: "rgba(255,255,255,0.3)",
      textDecoration: "underline", padding: 0,
    }}>
              <ShuffleIcon size={14} />
                 or generate random avatar
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="ob-label">Full Name</label>
            <input type="text" placeholder="Your full name" className="ob-input"
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="ob-label">Bio</label>
            <textarea placeholder="Tell others about yourself and your language learning goals..."
              className="ob-textarea"
              value={formState.bio}
              onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
            />
          </div>


{/* Languages */}
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // ← stacks on mobile, side by side on desktop
  gap: "14px"
}}>
  <div>
    <label className="ob-label">Native Language</label>
    <div style={{ position: "relative" }}>
      <select className="ob-select"
        value={formState.nativeLanguage}
        onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
      >
        <option value="">Select native language</option>
        {LANGUAGES.map((lang) => (
          <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
        ))}
      </select>
      <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>

  <div>
    <label className="ob-label">Learning Language</label>
    <div style={{ position: "relative" }}>
      <select className="ob-select"
        value={formState.learningLanguage}
        onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
      >
        <option value="">Select learning language</option>
        {LANGUAGES.map((lang) => (
          <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
        ))}
      </select>
      <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>
</div>
      

          {/* Location */}
          <div>
            <label className="ob-label">Location</label>
            <div style={{ position: "relative" }}>
              <MapPinIcon size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input type="text" placeholder="City, Country" className="ob-input"
                style={{ paddingLeft: "36px" }}
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="ob-btn-primary" disabled={isPending}>
            {isPending ? (
              <>
                <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", animation: "sc-spin 0.75s linear infinite", display: "inline-block" }} />
                Saving profile...
              </>
            ) : (
              <>
                <ShipWheelIcon size={16} />
                Complete Onboarding
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;


