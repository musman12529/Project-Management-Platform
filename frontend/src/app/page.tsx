import Link from "next/link";

export default function Home() {
  return (
    <main className="full-bleed relative min-h-screen overflow-hidden bg-[#05050a] text-white">
      {/* ============================================================
          ANIMATED BACKGROUND LAYER
          ============================================================ */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Mesh gradient blobs */}
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-600/40 blur-3xl animate-blob" />
        <div className="absolute top-32 right-[-120px] h-[480px] w-[480px] rounded-full bg-pink-500/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-[60%] left-[20%] h-[420px] w-[420px] rounded-full bg-cyan-500/30 blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute bottom-[-160px] right-[10%] h-[520px] w-[520px] rounded-full bg-indigo-600/30 blur-3xl animate-blob animation-delay-6000" />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        {/* Top gradient fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05050a] to-transparent" />
      </div>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-16 pb-32 text-center md:pt-24">
        {/* Pill badge */}
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wider text-white/70 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          NEW · AI-POWERED INSIGHTS · v2.0
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up animation-delay-2000 max-w-5xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          <span className="block text-white">Where teams</span>
          <span className="text-gradient block">ship the impossible.</span>
        </h1>

        {/* Sub-headline */}
        <p className="animate-fade-up animation-delay-4000 mt-8 max-w-2xl text-lg text-white/60 md:text-xl">
          The all-in-one project workspace with real-time collaboration, AI insights,
          and lightning fast task tracking. Built for teams that move fast and break
          deadlines, not promises.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up animation-delay-4000 mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get started — it&apos;s free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10 hover:border-white/40"
          >
            <span className="flex items-center gap-2">
              Sign in
              <svg className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Trust line */}
        <p className="animate-fade-up animation-delay-6000 mt-8 text-sm text-white/40">
          No credit card · Free forever for teams up to 5 · 14-day Pro trial
        </p>

        {/* ============================================================
            DASHBOARD MOCKUP (replaces the old tasks.png)
            ============================================================ */}
        <div className="animate-fade-up animation-delay-6000 relative mt-24 w-full max-w-6xl">
          {/* Glow halo */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-30 blur-2xl" />

          <div className="glass-strong relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_120px_-20px_rgba(168,85,247,0.5)]">
            {/* Mock browser chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="hidden flex-1 px-8 sm:block">
                <div className="mx-auto h-6 w-72 rounded-md bg-white/10 px-3 py-1 text-center text-xs text-white/50">
                  app.projectcollab.io / dashboard
                </div>
              </div>
              <div className="text-xs text-white/40">●●●</div>
            </div>

            {/* Mock dashboard body */}
            <div className="grid grid-cols-12 gap-4 p-5 text-left text-sm">
              {/* Sidebar */}
              <aside className="col-span-3 hidden flex-col gap-2 rounded-xl bg-white/[0.03] p-4 md:flex">
                <div className="mb-2 text-[11px] uppercase tracking-widest text-white/40">Workspace</div>
                {["Dashboard", "My Tasks", "Projects", "Team Chat", "Insights", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      i === 1 ? "bg-gradient-to-r from-purple-500/30 to-pink-500/20 text-white" : "text-white/60"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                    {item}
                  </div>
                ))}
              </aside>

              {/* Main panel */}
              <div className="col-span-12 flex flex-col gap-4 md:col-span-9">
                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active", value: "47", color: "from-purple-500 to-pink-500" },
                    { label: "Done today", value: "12", color: "from-cyan-400 to-blue-500" },
                    { label: "AI insights", value: "08", color: "from-emerald-400 to-teal-500" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/[0.04] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</div>
                      <div className={`mt-1 bg-gradient-to-r ${s.color} bg-clip-text text-3xl font-bold text-transparent`}>
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kanban */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { title: "To do", color: "bg-yellow-400", tasks: ["Onboard new designer", "API rate limit fix"] },
                    { title: "In progress", color: "bg-blue-400", tasks: ["Auth refactor", "Realtime cursors", "AI summary v2"] },
                    { title: "Done", color: "bg-emerald-400", tasks: ["Deploy v1.4", "Q3 roadmap"] },
                  ].map((col) => (
                    <div key={col.title} className="rounded-xl bg-white/[0.03] p-3">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/70">
                        <span className={`h-2 w-2 rounded-full ${col.color}`} />
                        {col.title}
                      </div>
                      <div className="space-y-2">
                        {col.tasks.map((t) => (
                          <div key={t} className="rounded-lg border border-white/5 bg-black/30 p-2.5 text-xs text-white/80">
                            <div className="mb-2 truncate">{t}</div>
                            <div className="flex items-center justify-between">
                              <div className="flex -space-x-1.5">
                                <span className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 ring-2 ring-black/40" />
                                <span className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 ring-2 ring-black/40" />
                              </div>
                              <span className="text-[10px] text-white/40">2d</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating notification card */}
          <div className="absolute -right-4 top-32 hidden w-64 rotate-3 lg:block">
            <div className="glass-strong animate-float-slow rounded-xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg">✦</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white">AI suggestion</div>
                  <div className="text-[11px] text-white/50">Sprint velocity up 23% this week</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating chat card */}
          <div className="absolute -left-4 bottom-24 hidden w-60 -rotate-3 lg:block">
            <div className="glass-strong animate-float rounded-xl p-4 shadow-2xl">
              <div className="text-[10px] uppercase tracking-widest text-white/40">Team chat</div>
              <div className="mt-2 text-xs text-white/80">
                <span className="font-semibold text-pink-400">@sarah</span> shipped the dark mode 🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MARQUEE STRIP
          ============================================================ */}
      <section className="relative border-y border-white/10 bg-black/30 py-8">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-16 whitespace-nowrap px-8 text-2xl font-bold tracking-tight text-white/30">
            {[
              "REAL-TIME COLLAB",
              "✦",
              "AI-POWERED",
              "✦",
              "20+ REST APIS",
              "✦",
              "SOCKET.IO",
              "✦",
              "MONGODB",
              "✦",
              "GEMINI AI",
              "✦",
              "NEXT.JS",
              "✦",
            ].map((t, i) => (
              <span key={`a-${i}`}>{t}</span>
            ))}
            {[
              "REAL-TIME COLLAB",
              "✦",
              "AI-POWERED",
              "✦",
              "20+ REST APIS",
              "✦",
              "SOCKET.IO",
              "✦",
              "MONGODB",
              "✦",
              "GEMINI AI",
              "✦",
              "NEXT.JS",
              "✦",
            ].map((t, i) => (
              <span key={`b-${i}`}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS
          ============================================================ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { num: "20+", label: "REST APIs", grad: "from-purple-400 to-pink-500" },
            { num: "100ms", label: "Realtime latency", grad: "from-cyan-400 to-blue-500" },
            { num: "AI", label: "Gemini insights", grad: "from-emerald-400 to-teal-500" },
            { num: "24/7", label: "Built-in chat", grad: "from-amber-400 to-orange-500" },
          ].map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all hover:-translate-y-1 hover:border-white/20"
            >
              <div className={`bg-gradient-to-r ${s.grad} bg-clip-text text-4xl font-black text-transparent md:text-5xl`}>
                {s.num}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-white/50">{s.label}</div>
              <div className={`absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r ${s.grad} opacity-0 transition-opacity group-hover:opacity-100`} />
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          FEATURES GRID
          ============================================================ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
            Features
          </div>
          <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Everything your team needs.
            <br />
            <span className="text-gradient">Nothing they don&apos;t.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Real-time everything",
              desc: "Live cursors, instant chat, and synchronized boards powered by Socket.IO. No refresh required.",
              grad: "from-purple-500/20 to-pink-500/20",
              border: "hover:border-pink-400/40",
            },
            {
              icon: "✦",
              title: "AI insights",
              desc: "Gemini turns your meeting notes into action items, summaries, and next steps in seconds.",
              grad: "from-cyan-500/20 to-blue-500/20",
              border: "hover:border-cyan-400/40",
            },
            {
              icon: "▦",
              title: "Beautiful boards",
              desc: "Drag, drop, and ship. Kanban that doesn't fight you when sprints get chaotic.",
              grad: "from-emerald-500/20 to-teal-500/20",
              border: "hover:border-emerald-400/40",
            },
            {
              icon: "✉",
              title: "Team chat built in",
              desc: "No more app-hopping. Project-scoped conversations live right next to your tasks.",
              grad: "from-amber-500/20 to-orange-500/20",
              border: "hover:border-orange-400/40",
            },
            {
              icon: "◎",
              title: "Track what matters",
              desc: "Overdue, completed, in-progress — visualized cleanly so nothing slips through cracks.",
              grad: "from-rose-500/20 to-red-500/20",
              border: "hover:border-rose-400/40",
            },
            {
              icon: "⚙",
              title: "Built on solid stack",
              desc: "Next.js, Node, Express, MongoDB, and 20+ tested REST APIs you can trust in production.",
              grad: "from-indigo-500/20 to-violet-500/20",
              border: "hover:border-indigo-400/40",
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 ${f.border}`}
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${f.grad} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 text-2xl">
                {f.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 p-12 text-center md:p-20">
          {/* Animated gradient bg */}
          <div className="absolute inset-0 -z-10 bg-gradient-animated opacity-90" />
          <div className="absolute inset-0 -z-10 noise" />
          {/* Inner darkening */}
          <div className="absolute inset-0 -z-10 bg-black/30" />

          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Ready to actually
            <br />
            <span className="text-shimmer">finish that project?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg">
            Join the teams using Project Collab to ship faster, talk less, and keep
            momentum from Monday standup to Friday launch.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-white hover:text-black"
            >
              Create free account
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="relative border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 font-black text-white">
                P
              </div>
              <div className="text-sm">
                <div className="font-semibold text-white">Project Collab</div>
                <div className="text-xs text-white/40">Ship the impossible.</div>
              </div>
            </div>
            <div className="flex gap-6 text-xs text-white/50">
              <Link href="/login" className="hover:text-white">Login</Link>
              <Link href="/register" className="hover:text-white">Register</Link>
              <a href="https://github.com/musman12529/Project-Management-Platform" target="_blank" rel="noreferrer" className="hover:text-white">
                GitHub
              </a>
            </div>
            <div className="text-xs text-white/40">© 2026 Project Collab. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
