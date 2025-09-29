import { ArrowLeft, Settings, Database, Shield, Brain, GitBranch, Plug, Server, Rocket, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminConsole() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-night to-deep" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>

      <header className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky to-ocean border border-sky/30 grid place-items-center shadow-lg shadow-sky/25">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
            Admin Console
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 flex items-center justify-center">
              <div className="text-6xl drop-shadow-2xl">🧭</div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[0.95] mb-4">
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">GUI‑First Operations</span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">for the Entire Platform</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything operable via CLI is operable here. Trait‑aware rendering ensures least‑privilege views, while DEV_MODE enables one‑click sign‑in for local workflows.
            </p>
          </div>
        </section>

        {/* What’s Shipped */}
        <section className="py-12 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 mb-4">Shipped</div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">What You Can Use Today</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-sky" />
                  <div className="text-lg font-semibold">AI Studio</div>
                </div>
                <ul className="text-slate-300 space-y-3 text-sm leading-relaxed">
                  <li>Repository‑wide RAG with embeddings and trait‑filtered queries.</li>
                  <li>Model connectors: OpenAI, Claude, Ollama (local), DeepSeek.</li>
                  <li>Dynamic model dropdowns with pricing badges.</li>
                </ul>
              </div>

              <div className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-sky" />
                  <div className="text-lg font-semibold">RAG & Storage</div>
                </div>
                <ul className="text-slate-300 space-y-3 text-sm leading-relaxed">
                  <li>PostgreSQL (asyncpg) is the default DB.</li>
                  <li>Redis vectors by default; Redis Stack (HNSW) optional.</li>
                  <li>Toggle backend and reindex from the Console.</li>
                </ul>
              </div>

              <div className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-sky" />
                  <div className="text-lg font-semibold">Security & Traits</div>
                </div>
                <ul className="text-slate-300 space-y-3 text-sm leading-relaxed">
                  <li>TBAC classification gates: phi→hipaa_cleared, pii→pii_cleared.</li>
                  <li>Gateway allowlist for all egress; Operator allowlist for RPC.</li>
                  <li>DEV_MODE: one‑click dev sign‑in using bootstrap_admin_only.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Wizard */}
        <section className="py-12 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky/10 border border-sky/30 text-sky mb-4">Shipped</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Plugin Setup Wizard</h2>
              <p className="text-slate-400 max-w-3xl mx-auto mt-3">Draft a manifest, validate traits and allowlists, register with core, then download a scaffold for your language.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <Callout icon={<Plug className="w-5 h-5" />} title="Draft & Validate" desc="Propose plugin traits, declare external domains, validate policy constraints." />
              <Callout icon={<Lock className="w-5 h-5" />} title="Allowlist & Register" desc="Operator/Gateway allowlists generated and enforceable with full audit." />
              <Callout icon={<Rocket className="w-5 h-5" />} title="Scaffold & Iterate" desc="Download starter code with healthcheck, manifest, and example endpoints." />
            </div>
          </div>
        </section>

        {/* Notes & Status */}
        <section className="py-12 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Reality Check</h3>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
                <li>Core DB: PostgreSQL default; SQLite used only for tests/DEV_MODE.</li>
                <li>Vectors: Redis default; Redis Stack optional for HNSW indexing.</li>
                <li>Egress: All external calls pass through Gateway allowlist; operator calls through explicit allow rules.</li>
                <li>Admin Console: AI Studio, RAG backend toggle, model connectors ship today.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Callout({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-2 text-sky">
        {icon}
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-slate-300 text-sm">{desc}</div>
    </div>
  );
}

