"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/MyTasks");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidUsername = (username: string) => username.length >= 3;

  // Password strength: 0–4
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthMeta = [
    { label: "Too weak",  color: "bg-red-500",     textColor: "text-red-400" },
    { label: "Weak",      color: "bg-orange-500",  textColor: "text-orange-400" },
    { label: "Okay",      color: "bg-yellow-500",  textColor: "text-yellow-400" },
    { label: "Strong",    color: "bg-emerald-500", textColor: "text-emerald-400" },
    { label: "Excellent", color: "bg-cyan-400",    textColor: "text-cyan-300" },
  ][passwordStrength];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidUsername(username)) {
      setError("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      setLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
        setLoading(false);
      }
      if (res.status === 200) {
        setError("");
        setLoading(false);
        router.push("/login");
      }
    } catch (err) {
      setError("Error, try again");
      setLoading(false);
      console.log(err);
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className="full-bleed relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05050a]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-600/40 blur-3xl animate-blob" />
          <div className="absolute bottom-[-160px] right-[10%] h-[520px] w-[520px] rounded-full bg-pink-500/40 blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="relative h-20 w-20 animate-spin-slow rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 [mask:radial-gradient(farthest-side,transparent_calc(100%_-_4px),#000_0)]" />
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
        <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-500/40 blur-3xl animate-blob" />
        <div className="absolute top-1/2 left-[-120px] h-[480px] w-[480px] rounded-full bg-pink-500/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-160px] right-[20%] h-[480px] w-[480px] rounded-full bg-purple-500/40 blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* ============================================================
            LEFT FORM PANEL
            ============================================================ */}
        <div className="flex items-center justify-center order-2 lg:order-1">
          <div className="animate-fade-up w-full max-w-md">
            <Link href="/" className="mb-8 inline-flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 font-black text-white">
                P
              </div>
              <span className="font-semibold">Project Collab</span>
            </Link>

            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 blur-xl" />

              <div className="glass-strong relative rounded-3xl p-8 shadow-2xl md:p-10">
                <div className="mb-8">
                  <h1 className="text-4xl font-black tracking-tight">Create account</h1>
                  <p className="mt-2 text-sm text-white/50">
                    Already on board?{" "}
                    <Link href="/login" className="font-semibold text-white underline decoration-cyan-400 underline-offset-4 hover:decoration-2">
                      Sign in
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Username */}
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-11 py-3.5 text-base text-white placeholder-white/30 transition-all focus:border-cyan-400/60 focus:outline-none focus:ring-4 focus:ring-cyan-500/10"
                        placeholder="your_handle"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-11 py-3.5 text-base text-white placeholder-white/30 transition-all focus:border-cyan-400/60 focus:outline-none focus:ring-4 focus:ring-cyan-500/10"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-11 py-3.5 text-base text-white placeholder-white/30 transition-all focus:border-cyan-400/60 focus:outline-none focus:ring-4 focus:ring-cyan-500/10"
                        placeholder="At least 8 characters"
                        required
                      />
                    </div>

                    {/* Strength meter */}
                    {password.length > 0 && (
                      <div className="mt-3 animate-fade-up">
                        <div className="flex gap-1.5">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                i < passwordStrength ? strengthMeta.color : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>
                        <div className={`mt-1.5 text-[11px] ${strengthMeta.textColor}`}>
                          Strength: {strengthMeta.label}
                        </div>
                      </div>
                    )}
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
                    className="group relative w-full overflow-hidden rounded-xl py-4 text-base font-semibold text-black transition-all hover:scale-[1.02] disabled:opacity-60"
                  >
                    <span className="absolute inset-0 bg-gradient-animated" />
                    <span className="absolute inset-[2px] rounded-[10px] bg-white" />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-black">
                      {loading ? "Creating account..." : "Create my account"}
                      {!loading && (
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-[11px] text-white/40">
                    By creating an account you agree to our terms & privacy policy.
                  </p>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <Link
                  href="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
                >
                  I already have an account
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT SHOWCASE PANEL
            ============================================================ */}
        <div className="hidden flex-col justify-between order-1 lg:order-2 lg:flex">
          <div className="animate-fade-up flex justify-end">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 font-black text-white shadow-lg">
                P
              </div>
              <div className="text-right">
                <div className="text-base font-semibold">Project Collab</div>
                <div className="text-xs text-white/40">Ship the impossible.</div>
              </div>
            </Link>
          </div>

          <div className="animate-fade-up animation-delay-2000 max-w-md self-end text-right">
            <div className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
              Join thousands of teams
            </div>
            <h2 className="text-5xl font-black leading-[1.05] tracking-tight">
              Start shipping
              <br />
              <span className="text-gradient">in under</span>
              <br />
              60 seconds.
            </h2>
            <p className="mt-6 text-base text-white/55">
              No credit card. No friction. Just create an account, invite your
              team, and watch your boards come alive in real time.
            </p>

            {/* Feature checklist */}
            <ul className="mt-10 space-y-3 text-left">
              {[
                "Free forever for teams up to 5",
                "AI-powered meeting summaries",
                "Real-time chat & live cursors",
                "20+ tested REST APIs out of the box",
              ].map((item) => (
                <li key={item} className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-xs font-bold text-black">
                    ✓
                  </span>
                  <span className="text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up animation-delay-4000 text-right text-xs text-white/40">
            © 2026 Project Collab · Built with Next.js, Socket.IO, and Gemini AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
