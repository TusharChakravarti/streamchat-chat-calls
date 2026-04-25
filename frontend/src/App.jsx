import React from 'react'
import { Navigate, Route, Routes, useLocation } from "react-router"
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CallPage from './pages/CallPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import NotificationPage from './pages/NotificationsPage.jsx'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import PageLoader from './components/PageLoader.jsx'
import { Toaster } from 'react-hot-toast'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import ForgotPasswordPage from './pages/ForgetPasswordPage.jsx'
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx"
import GoogleCallbackPage from "./pages/GoogleCallbackPage.jsx"
import LandingPage from "./pages/LandingPage.jsx"
const PUBLIC_ONLY_ROUTES = ["/verify-email", "/forgot-password", "/reset-password", "/google-callback"]

const App = () => {
  const { isLoading, authUser } = useAuthUser()
  const location = useLocation()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded


  const isPublicAuthRoute = PUBLIC_ONLY_ROUTES.some(path =>
    location.pathname.startsWith(path)
  )

  if (isLoading && !isPublicAuthRoute) return <PageLoader />

  

  return (
    <Routes>

  {/* ── Root — landing for guests, dashboard for users ── */}
  <Route path="/" element={
    !isAuthenticated
      ? <LandingPage />
      : isOnboarded
        ? <Layout showSidebar={true}><HomePage /></Layout>
        : <Navigate to="/onboarding" />
  } />

  <Route path="/signup" element={
    !isAuthenticated ? <SignUpPage /> : (
      <Navigate to={isOnboarded ? "/" : "/onboarding"} />
    )
  } />

  <Route path="/login" element={
    !isAuthenticated ? <LoginPage /> : (
      <Navigate to={isOnboarded ? "/" : "/onboarding"} />
    )
  } />

  {/* ── Auth-independent routes ── */}
  <Route path="/verify-email" element={<VerifyEmailPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  <Route path="/reset-password" element={<ResetPasswordPage />} />
  <Route path="/google-callback" element={<GoogleCallbackPage />} />

  <Route path="/notifications" element={
    isAuthenticated && isOnboarded ? (
      <Layout showSidebar={true}><NotificationPage /></Layout>
    ) : (
      <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
  } />

  <Route path="/call/:id" element={
    isAuthenticated && isOnboarded ? (
      <CallPage />
    ) : (
      <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
  } />

  <Route path="/chat/:id" element={
    isAuthenticated && isOnboarded ? (
      <Layout showSidebar={false}><ChatPage /></Layout>
    ) : (
      <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
  } />

  <Route path="/onboarding" element={
    isAuthenticated ? (
      !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
    ) : (
      <Navigate to="/login" />
    )
  } />

</Routes>
  )

  
}

export default App