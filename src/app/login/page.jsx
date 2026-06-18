// "use client";

// import React, { useState } from "react";
// import Link from "next/link"; 
// import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
// import { FaLock, FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { FaBagShopping, FaArrowRight, FaEnvelope } from "react-icons/fa6";
// import { authClient } from "@/lib/auth-client";

// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formStatus, setFormStatus] = useState({ type: null, message: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setFormStatus({ type: null, message: "" }); 

//     const formData = new FormData(e.currentTarget);
//     const data = {};
//     formData.forEach((value, key) => {
//       data[key] = value.toString();
//     });

//     try {
//       // BetterAuth Sign In API call
//       const { data: session, error } = await authClient.signIn.email({
//         email: data.email,
//         password: data.password,
//       });

//       if (error) {
//         throw new Error(error.message || "Invalid email or password.");
//       }

//       setFormStatus({
//         type: "success",
//         message: "Logged in successfully! Redirecting to home...",
//       });

//       // Login success hole homepage-e niye jabe
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 1500);

//     } catch (error) {
//       setFormStatus({
//         type: "error",
//         message: error.message || "Authentication failed. Please try again.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[90vh] bg-slate-50/60 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
//       {/* Background Ornaments (Register page er sathe matching) */}
//       <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#38A3A5]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
//       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#57CC99]/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

//       <div className="w-full max-w-[480px] bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 sm:p-8 relative z-10">
        
//         {/* Brand Logo & Header */}
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-flex items-center gap-2 mb-4">
//             <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#38A3A5] to-[#57CC99] text-white shadow-md">
//               <FaBagShopping size={18} />
//             </div>
//             <span className="font-bold text-lg tracking-tight text-[#216869]">NEXTMART</span>
//           </Link>
//           <h2 className="text-2xl font-black text-[#216869] tracking-tight">Welcome Back</h2>
//           <p className="text-sm text-slate-500 mt-1">Sign in to your account to continue</p>
//         </div>

//         {/* HeroUI Form Validation Wrapper */}
//         <Form validationBehavior="native" onSubmit={handleSubmit} className="flex flex-col gap-5">
          
//           {/* Email Field */}
//           <TextField
//             isRequired
//             name="email"
//             type="email"
//             validate={(value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Please enter a valid email address" : null}
//           >
//             <Label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</Label>
//             <div className="relative w-full">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 z-20"><FaEnvelope size={14} /></span>
//               <Input placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus-visible:outline-none focus-visible:border-[#38A3A5] text-slate-800 transition-all" />
//             </div>
//             <FieldError className="text-xs text-red-500 mt-1" />
//           </TextField>

//           {/* Password Field */}
//           <TextField isRequired name="password" type={showPassword ? "text" : "password"}>
//             <div className="flex items-center justify-between mb-1.5">
//               <Label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</Label>
//               <Link href="/forgot-password" className="text-xs font-semibold text-[#38A3A5] hover:underline">Forgot?</Link>
//             </div>
//             <div className="relative w-full">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 z-20"><FaLock size={14} /></span>
//               <Input placeholder="Enter your password" className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus-visible:outline-none focus-visible:border-[#38A3A5] text-slate-800 transition-all" />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-[#38A3A5] transition-colors cursor-pointer z-30"
//               >
//                 {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
//               </button>
//             </div>
//             <FieldError className="text-xs text-red-500 mt-1" />
//           </TextField>

//           {/* Status Message Display */}
//           {formStatus.type && (
//             <div 
//               className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
//                 formStatus.type === "success" 
//                   ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
//                   : "bg-rose-50 border-rose-200 text-rose-800"
//               }`}
//             >
//               {formStatus.type === "success" ? (
//                 <FaCheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
//               ) : (
//                 <FaExclamationCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
//               )}
//               <span className="text-sm font-medium leading-normal">{formStatus.message}</span>
//             </div>
//           )}

//           {/* Action Button */}
//           <Button
//             type="submit"
//             isLoading={isLoading}
//             className={`w-full text-white font-semibold py-3 rounded shadow-md transition-all text-base flex items-center justify-center gap-2 mt-1 cursor-pointer select-none active:scale-[0.98] ${
//               isLoading ? "bg-[#22577A]/70" : "bg-[#22577A] hover:bg-[#1a4461]"
//             }`}
//           >
//             {isLoading ? "Signing in..." : "Sign In"} {!isLoading && <FaArrowRight size={14} />}
//           </Button>

//         </Form>

//         {/* Footer Link to Register Page */}
//         <div className="text-center mt-6 pt-5 border-t border-slate-100">
//           <p className="text-sm text-slate-500">
//             Don't have an account?{" "}
//             <Link href="/register" className="text-[#38A3A5] font-semibold hover:underline">Sign Up</Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Link from "next/link"; 
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FaLock, FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaBagShopping, FaArrowRight, FaEnvelope } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc"; // Imported Google Icon
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // Separate loader for Google
  const [formStatus, setFormStatus] = useState({ type: null, message: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Credentials form dynamic submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ type: null, message: "" }); 

    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const { data: session, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password.");
      }

      setFormStatus({
        type: "success",
        message: "Logged in successfully! Redirecting to home...",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "Authentication failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // BetterAuth Google OAuth flow trigger handler
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setFormStatus({ type: null, message: "" });
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Success hole directly user home route dashboard mapping pipeline stream check korbe
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "Google authentication failed. Try again.",
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-slate-50/60 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#38A3A5]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#57CC99]/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="w-full max-w-[480px] bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 sm:p-8 relative z-10">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#38A3A5] to-[#57CC99] text-white shadow-md">
              <FaBagShopping size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#216869]">NEXTMART</span>
          </Link>
          <h2 className="text-2xl font-black text-[#216869] tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to your account to continue</p>
        </div>

        <Form validationBehavior="native" onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Please enter a valid email address" : null}
          >
            <Label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</Label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 z-20"><FaEnvelope size={14} /></span>
              <Input placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus-visible:outline-none focus-visible:border-[#38A3A5] text-slate-800 transition-all" />
            </div>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField isRequired name="password" type={showPassword ? "text" : "password"}>
            <div className="flex items-center justify-between mb-1.5">
              <Label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</Label>
              <Link href="/forgot-password" className="text-xs font-semibold text-[#38A3A5] hover:underline">Forgot?</Link>
            </div>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 z-20"><FaLock size={14} /></span>
              <Input placeholder="Enter your password" className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus-visible:outline-none focus-visible:border-[#38A3A5] text-slate-800 transition-all" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-[#38A3A5] transition-colors cursor-pointer z-30"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Status Message Display */}
          {formStatus.type && (
            <div 
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                formStatus.type === "success" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {formStatus.type === "success" ? (
                <FaCheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <FaExclamationCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              )}
              <span className="text-sm font-medium leading-normal">{formStatus.message}</span>
            </div>
          )}

          {/* Form Action Email Credentials Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className={`w-full text-white font-semibold py-3 rounded shadow-md transition-all text-base flex items-center justify-center gap-2 mt-1 cursor-pointer select-none active:scale-[0.98] ${
              isLoading ? "bg-[#22577A]/70" : "bg-[#22577A] hover:bg-[#1a4461]"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"} {!isLoading && <FaArrowRight size={14} />}
          </Button>

          {/* Horizontal Splitter Or layout boundary separator */}
          <div className="flex items-center my-1 select-none pointer-events-none">
            <div className="grow border-t border-slate-200"></div>
            <span className="mx-3 text-xs font-bold text-slate-400 uppercase tracking-wider">or</span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          {/* Google Social OAuth Interactive Provider Action Button */}
          <Button
            type="button"
            onPress={handleGoogleSignIn}
            isLoading={isGoogleLoading}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 border border-slate-200/90 rounded shadow-sm transition-all text-base flex items-center justify-center gap-2.5 cursor-pointer select-none active:scale-[0.98]"
          >
            {!isGoogleLoading && <FcGoogle size={20} />}
            {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
          </Button>

        </Form>

        <div className="text-center mt-6 pt-5 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#38A3A5] font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>

      </div>
    </div>
  );
}