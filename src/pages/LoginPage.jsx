// src/pages/LoginPage.jsx

import React, { useState } from "react";
import Carousel from "../components/ui/Carousel";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
import SocialButton from "../components/ui/SocialButton";
import { H2, Text } from "../components/ui/Typography";
import authService from "../services/auth/authService";
import { useAuthStore } from "../stores/useAuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Zustand store
  const { login } = useAuthStore();

  const carouselImages = [
    "/crousal/onboarding-slide-1.png",
    "/crousal/onboarding-slide-2.png",
    "/crousal/onboarding-slide-3.png",
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.login({
        email: email,
        password: password
      });

      if (result.success) {
        // Store user and token in Zustand store
        login(result.user, result.token);
        
        console.log("✅ Login successful, user role:", result.user.role?.name);
        
        // Navigate based on user role or to dashboard
        if (result.user.role?.name === "aIumni" || result.user.role?.name === "alumni") {
          navigate("/dashboard/alumni");
        } else if (result.user.role?.name === "company") {
          navigate("/dashboard/company");
        } else if (result.user.role?.name === "school") {
          navigate("/dashboard/school");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Carousel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br items-center justify-center">
        <Carousel images={carouselImages} />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <H2 className="mb-2">Welcome back!</H2>
            <Text color="muted">Login to continue using the app</Text>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <Text color="error" className="text-sm">{error}</Text>
            </div>
          )}

          {/* Login Form */}
          <div className="space-y-4 mb-6">
            <Input
              type="email"
              placeholder="Enter email"
              icon="mail"
              value={email}
              onChange={setEmail}
              label="Email"
            />

            <Input
              type="password"
              placeholder="Enter password"
              icon="lock"
              value={password}
              onChange={setPassword}
              label="Password"
            />

            <div className="text-right">
              <Link onClick={handleForgotPassword} size="medium">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <Button 
            fullWidth 
            onClick={handleLogin} 
            className="mb-6"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div
              className="flex-1 border-t border-gray-300"
              style={{ marginLeft: "4rem" }}
            ></div>
            <Text color="muted" className="px-4">
              or continue with
            </Text>
            <div
              className="flex-1 border-t border-gray-300"
              style={{ marginRight: "4rem" }}
            ></div>
          </div>

          {/* Social Buttons */}
          <div className="flex space-x-4 mb-6 justify-center">
            {/* <SocialButton type="apple" onClick={handleAppleLogin} /> */}
            <SocialButton type="google" onClick={handleGoogleLogin} />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Text color="muted">
              Don't have an account? <Link onClick={handleSignUp}>Sign up</Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
