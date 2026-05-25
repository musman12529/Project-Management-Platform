"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const [email, setEmail] = useState("testing@gmail.com");
  const [password, setPassword] = useState("testing@gmail.com");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      setLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    localStorage.setItem("email", email);

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      setError("");
      setLoading(false);
      if (res?.url) {
        router.replace("/");
      }
    }
  };

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="full-bleed relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05050a]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-600/40 blur-3xl animate-blob" />
          <div className="absolute bottom-[-160px] right-[10%] h-[520px] w-[520px] rounded-full bg-pink-500/40 blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 blur-xl animate-glow-pulse" />
            <div className="relative h-20 w-20 animate-spin-slow rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 [mask:radial-gradient(farthest-side,transparent_calc(100%_-_4px),#000_0)]" />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (sessionStatus === "authenticated") return null;

  return (
    <div className="full-bleed relative min-h-screen overflow-hidden bg-[#05050a] text-white">
      {/* ============================================================
          ANIMATED BACKGROUND
          ============================================================ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-600/40 blur-3xl animate-blob" />
        <div className="absolute top-32 right-[-120px] h-[480px] w-[480px] rounded-full bg-pink-500/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-160px] left-[20%] h-[480px] w-[480px] rounded-full bg-cyan-500/30 blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Notification toast */}
      {showNotification && (
        <div className="animate-fade-up fixed left-1/2 top-6 z-50 -translate-x-1/2">
          <div className="glass-strong flex items-center gap-3 rounded-full border border-emerald-400/30 px-5 py-3 shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm text-white/90">Sample credentials are pre-filled — just click sign in.</span>
          </div>
        </div>
      )}

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* ============================================================
            LEFT SHOWCASE PANEL
            ============================================================ */}
        <div className="hidden flex-col justify-between lg:flex">
          <div className="animate-fade-up">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 font-black text-white shadow-lg">
                P
              </div>
              <div>
                <div className="text-base font-semibold">Project Collab</div>
                <div className="text-xs text-white/40">Ship the impossible.</div>
              </div>
            </Link>
          </div>

          <div className="animate-fade-up animation-delay-2000 max-w-md">
            <div className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
              Welcome back
            </div>
            <h2 className="text-5xl font-black leading-[1.05] tracking-tight">
              Pick up
              <br />
              <span className="text-gradient">right where</span>
              <br />
              you left off.
            </h2>
            <p className="mt-6 text-base text-white/55">
              Your boards, your team, your AI insights — all waiting. One sign-in
              and you&apos;re back in flow.
            </p>

            {/* Floating mini cards */}
            <div className="relative mt-12 h-48">
              <div className="glass-strong absolute left-0 top-0 w-56 -rotate-3 animate-float rounded-xl p-4 shadow-2xl">
                <div className="text-[10px] uppercase tracking-widest text-white/40">In progress</div>
                <div className="mt-2 text-sm font-semibold">AI summary v2</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 ring-2 ring-black/40" />
                    <span className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 ring-2 ring-black/40" />
                  </div>
                  <span className="text-[10px] text-white/40">Due 2d</span>
                </div>
              </div>
              <div className="glass-strong absolute right-4 top-12 w-60 rotate-3 animate-float-slow rounded-xl p-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-base">✦</div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">AI insight</div>
                    <div className="text-[11px] text-white/50">Sprint velocity up 23%</div>
                  </div>
                </div>
              </div>
              <div className="glass-strong absolute bottom-0 left-12 w-52 -rotate-2 animate-float rounded-xl p-4 shadow-2xl animation-delay-2000">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Done today</div>
                <div className="mt-1 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-black text-transparent">
                  12 ✓
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up animation-delay-4000 text-xs text-white/40">
            © 2026 Project Collab · Built with Next.js, Socket.IO, and Gemini AI
          </div>
        </div>

        {/* ============================================================
            RIGHT FORM PANEL
            ============================================================ */}
        <div className="flex items-center justify-center">
          <div className="animate-fade-up w-full max-w-md">
            {/* Mobile header */}
            <Link href="/" className="mb-8 inline-flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 font-black text-white">
                P
              </div>
              <span className="font-semibold">Project Collab</span>
            </Link>

            <div className="relative">
              {/* Glow halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-30 blur-xl" />

              <div className="glass-strong relative rounded-3xl p-8 shadow-2xl md:p-10">
                <div className="mb-8">
                  <h1 className="text-4xl font-black tracking-tight">Sign in</h1>
                  <p className="mt-2 text-sm text-white/50">
                    New here?{" "}
                    <Link href="/register" className="font-semibold text-white underline decoration-pink-400 underline-offset-4 hover:decoration-2">
                      Create an account
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div className="group relative">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-11 py-3.5 text-base text-white placeholder-white/30 transition-all focus:border-pink-400/60 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="group relative">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-xs font-medium uppercase tracking-widest text-white/50">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="text-xs text-white/50 transition-colors hover:text-white"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v2m6 8H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2zM8 11V7a4 4 0 118 0v4" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-11 py-3.5 text-base text-white placeholder-white/30 transition-all focus:border-pink-400/60 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="animate-fade-up rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full overflow-hidden rounded-xl bg-white py-4 text-base font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? "Signing in..." : "Sign in to your workspace"}
                      {!loading && (
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <Link
                  href="/register"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
                >
                  Create a new account
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-white/40">
              By signing in you agree to our terms & privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
