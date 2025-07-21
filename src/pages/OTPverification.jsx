import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, ArrowLeft, RefreshCw } from "lucide-react";
import API_URL from "../constants/Constants";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Get phone number from navigation state
  const phoneNumber = location.state?.phone || "";

  // Redirect to login if no phone number is provided
  useEffect(() => {
    if (!phoneNumber) {
      navigate("/login");
    }
  }, [phoneNumber, navigate]);

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    
    // Filter only numeric characters and take first 6
    const numbers = pastedData.replace(/\D/g, "").slice(0, 6);
    
    if (numbers.length > 0) {
      const newOtp = ["", "", "", "", "", ""];
      
      // Fill the OTP array with pasted numbers
      for (let i = 0; i < numbers.length && i < 6; i++) {
        newOtp[i] = numbers[i];
      }
      
      setOtp(newOtp);
      setError("");
      
      // Focus on the next empty input or the last filled input
      const nextIndex = Math.min(numbers.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setError("Injiza kode yose y'imibare 6");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          otp: otpString,
        }),
      });

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      const data = await response.json();

      // Store user data and token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Navigate based on user role
      if (data.user.role === "ADMIN") {
        navigate("/dashboard");
      } else if (data.user.role === "AGENT" && data.user.isSuperAgent) {
        navigate("/agent-dashboard/payments-super-agent");
      } else if (data.user.role === "AGENT") {
        navigate("/agent-dashboard");
      } else if (data.user.role === "OPERATIONS") {
        navigate("/operations-dashboard");
      } else if (data.user.role === "CUSTOMER_SUPPORT") {
        navigate("/customer-support-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Kode ntibaho. Gerageza kandi.");
      console.error("OTP verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/resend-email-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          phone: phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }

      // Reset timer and states
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      // Restart timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError("Byanze kohereza kode. Gerageza kandi.");
      console.error("Resend OTP error:", err);
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-sky-100 transform transition-all hover:scale-105 duration-300 ease-in-out">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-sky-600" />
          </div>
          <h2 className="text-3xl font-bold text-sky-800 mb-2">
            Emeza Kode
          </h2>
          <p className="text-sm text-gray-600 font-light">
            Twaguhejeje kode kuri {phoneNumber}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm border border-red-200 animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 text-center">
              Injiza kode y'imibare 6
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => handlePaste(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                  placeholder="•"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center">
                <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Tegereza...
              </div>
            ) : (
              "Emeza"
            )}
          </button>

          <div className="text-center space-y-4">
            <div className="text-sm text-gray-600">
              {!canResend ? (
                <span>Kode ishya mu masegonda {formatTime(timer)}</span>
              ) : (
                <span>Ntabwo wakiriye kode?</span>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!canResend || isResending}
              className="text-sm font-medium text-sky-600 hover:text-sky-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="animate-spin -ml-1 mr-1 h-4 w-4" />
                  Kohereza...
                </div>
              ) : (
                "Kohereza kode ishya"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-sky-600 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Subira inyuma
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;