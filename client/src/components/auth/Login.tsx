import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import leanLearnLogo from "../../assets/images/Logo.png";
import { auth } from "./firebase";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useUser } from "@/UserContext";

declare global {
  interface Window {
    confirmationResult: ConfirmationResult;
  }
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const setUpRecaptcha = () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response: string) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("reCAPTCHA response:", response);

      },
    });
    return recaptchaVerifier;
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        setError("Please enter a valid 10-digit Indian phone number.");
        setLoading(false);
        return;
      }

      const fullPhoneNumber = `+91${phone}`;
      const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber, "IN");
      if (!phoneNumber || !phoneNumber.isValid()) {
        setError("Invalid phone number. Please enter a valid Indian number.");
        setLoading(false);
        return;
      }

      const recaptchaVerifier = setUpRecaptcha();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber.format("E.164"),
        recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      navigate("/verify-otp", { state: { isTeacher: role === "teacher" } });
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In successful:", user);

        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

  
        toast.success("You have successfully signed in with Google.", {
          position: "top-right",
          autoClose: 1000, // Toast will auto-close after 3 seconds
          onClose: () => {
            // Navigate after the toast is closed
            setUser(userData);
            navigate("/select-mentor", { state: { user: userData } });
          },
        });
      })
      .catch((error) => {
        setError("Google Sign-In failed. Please try again.");
        console.error(error);
      });
  };
 
 
 
  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
       <ToastContainer  style={{ zIndex: 9999 }} /> 
      <div className="absolute top-8 left-8">
        <img
          src={leanLearnLogo}
          alt="LeanLearn"
          className="h-6 w-auto object-contain"
        />
      </div>

    
      <div className="flex-1 flex flex-col items-center justify-center">
     
        <div className="w-[400px] bg-[#111111] rounded-lg p-8">
          <h2 className="text-white text-2xl font-medium text-center mb-6">
            {role === "teacher" ? "Teacher Login" : "Login"}
          </h2>
          
          {role === "teacher" && (
            <form onSubmit={handlePhoneSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-white text-sm">Phone No.</label>
                <input
                  type="tel"
                  placeholder="Enter your Phone No."
                  className="w-full bg-[#1A1A1A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setPhone(value);
                    }
                  }}
                  required
                />
              </div>
              <div id="recaptcha-container"></div>

              <button
                type="submit"
                className="w-full bg-[#00A3FF] text-black py-3 rounded-md hover:bg-[#0088D4] transition-colors"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          <button
            onClick={handleGoogleSignIn}
            className="w-full signin-button text-white py-3 mt-4 rounded-md  transition-colors"
          >
            Sign in with Google
          </button>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>

        <Link
          to={role === "teacher" ? "/signup?role=teacher" : "/signup"}
          className={role === "teacher" ? "text-white text-sm mt-4 hover:text-gray-300 transition-colors text-decoration-line: underline" : ""}
        >
          CREATE AN ACCOUNT
        </Link>
      </div>
    </div>
  );
};

export default Login;
