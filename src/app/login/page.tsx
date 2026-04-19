"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in your credentials.");
      return;
    }
    setError("");
    setIsLoading(true);

    // Simulate secure 1.5s authentication
    setTimeout(() => {
      // In a mock environment we'll just extract a fake name from the email
      const fakeName = email.split("@")[0].toUpperCase();
      login(email, fakeName);
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center p-4 overflow-hidden selection:bg-[#FF1744] selection:text-white">
      
      {/* Background Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF1744]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B9D]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Luxury Glassmorphic Form Wrapper */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
        
        {/* Brand Logo / Return to Home */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group">
            <h1 className="text-3xl font-extrabold tracking-widest uppercase cursor-pointer">
              Strawberry<span className="text-[#FF1744]">.</span>
            </h1>
            <div className="w-0 h-[2px] bg-[#FF1744] group-hover:w-full transition-all duration-500 ease-out mx-auto mt-1" />
          </Link>
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-4">Sign In To Your Account</p>
        </div>

        {/* The Card */}
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleLogin} className="flex flex-col gap-6 relative">
            
            {error && (
              <div className="p-3 bg-[#FF1744]/10 border border-[#FF1744]/30 rounded-xl text-center">
                <p className="text-[#FF1744] text-[10px] uppercase tracking-widest leading-relaxed">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] text-white/50 tracking-[0.2em] uppercase ml-2">Email Address</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white hover:bg-white/[0.05] focus:outline-none focus:border-[#FF1744]/50 focus:bg-white/[0.05] transition-all duration-300 peer"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-2">
                <label className="text-[10px] text-white/50 tracking-[0.2em] uppercase">Security Key</label>
                <a href="#" className="text-[9px] text-[#FF1744] tracking-widest uppercase hover:text-white transition-colors">Forgot?</a>
              </div>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white hover:bg-white/[0.05] focus:outline-none focus:border-[#FF1744]/50 focus:bg-white/[0.05] transition-all duration-300 peer"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full relative group overflow-hidden rounded-2xl py-5 bg-[#111] shadow-[0_0_20px_rgba(255,23,68,0.2)] hover:shadow-[0_0_40px_rgba(255,23,68,0.6)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#FF6B9D] ease-out duration-500 opacity-90 group-hover:opacity-100 transform translate-y-[100%] group-hover:translate-y-0 transition-transform"></div>
              <span className={`relative z-10 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] font-bold ${isLoading ? 'text-white/50' : 'text-white'}`}>
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Authenticating...
                  </>
                ) : (
                  <>Secure Login &rarr;</>
                )}
              </span>
            </button>
            
          </form>
          
          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#FF1744] hover:text-white transition-colors font-bold ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Meta */}
        <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mt-8">
          End-to-End Encrypted Platform
        </p>

      </div>
    </div>
  );
}
