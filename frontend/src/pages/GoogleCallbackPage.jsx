import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import PageLoader from "../components/PageLoader.jsx";

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/login?error=google_failed");
      return;
    }

    const finish = async () => {
      try {
       
        await axiosInstance.post("/auth/google/token", { token });

        await queryClient.invalidateQueries({ queryKey: ["authUser"] });
        navigate("/");
      } catch {
        navigate("/login?error=google_failed");
      }
    };

    finish();
  }, []);

  return <PageLoader />;
};

export default GoogleCallbackPage;