import { motion } from "framer-motion";
import { ArrowLeft, Shield, Code, Database, Brain, Settings, Lock, Zap, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Architecture() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-night to-deep" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Navigation */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6"
      >
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky to-ocean border border-sky/30 grid place-items-center shadow-lg shadow-sky/25">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-sky to-ocean rounded-2xl blur opacity-30 animate-pulse" />
          </div>
          <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
            Vivified
          </div>
        </motion.div>
        
        <div className="flex items-center gap-6">
          <motion.div
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 flex items-center justify-center"
            >
              <div className="text-6xl drop-shadow-2xl filter brightness-110">⚙️</div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8"
            >
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Technical
              </span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent animate-gradient">
                Architecture
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              How the application kernel actually works under the hood
            </motion.p>
          </div>
        </section>

        {/* Core Concept */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Application Kernel for Regulated Software
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Vivified is an application kernel for regulated software. It lets you assemble products from interchangeable parts and keep them safe under real‑world constraints. Capabilities are expressed as traits, everything else is a plugin, and policy decides who can do what. The result is a system you can rewire live — swapping transports, storage, identity, and UI modules — without breaking your contracts or your compliance story.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Out of the box, Vivified ships with a trait‑aware Admin Console and AI Studio, dynamic model connectors (OpenAI, Claude, Ollama, DeepSeek), PostgreSQL as the default DB, and Redis vectors with optional Redis Stack. SDK helpers exist and expand alongside the Admin flows. Agent/MCP integration is under evaluation and will follow the same trait‑aware and policy‑first principles.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Traits and Plugins */}
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Traits and Policy Engine
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16"
            >
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Under the hood, the kernel separates "what is possible" from "what is allowed." Providers declare capabilities through canonical traits such as <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">webhook.verification</code>, <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">auth.methods</code>, <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">supports_inbound</code>, <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">requires_ami</code>, or <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">needs_storage</code>. Your app then loads plugins — transport, storage, identity, and more — and the UI simply renders what those traits say exists.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Authorization is handled by policy: roles and attributes can enable or hide actions per tenant, group, user, or session. This keeps the experience clean for a low‑access user while giving admins a deep, actionable view — with different diagnostics, different help, and different next steps — even when both users share the same providers.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security and Compliance */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Built for Regulated Environments
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16"
            >
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  The platform is designed for environments that cannot afford surprises. Webhooks return 202 and are idempotent by default. Secrets never appear in logs, and PHI is treated as toxic: it's redacted in audit records and kept out of observable payloads. Sessions use secure cookies with CSRF protection, and elevation states (like <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">mfa_verified</code>) are time‑bound and automatically drop.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Observability is consistent and boring: there is exactly one metrics endpoint on the API port, a single health monitor/circuit breaker, and the server never forks multiple metrics stacks that fight each other.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reality Snapshot */}
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">What’s Working Now</h2>
              <div className="grid md:grid-cols-3 gap-6 text-slate-300 text-sm">
                <div>
                  <div className="font-semibold text-sky mb-2">Data & Storage</div>
                  <ul className="space-y-2">
                    <li>PostgreSQL default DB (asyncpg)</li>
                    <li>Redis vectors; Redis Stack optional (HNSW)</li>
                    <li>Config UI reflects effective values</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-sky mb-2">Security</div>
                  <ul className="space-y-2">
                    <li>TBAC classification gates (phi→hipaa_cleared, pii→pii_cleared)</li>
                    <li>Gateway allowlist for all egress</li>
                    <li>Operator allowlists enforced and audited</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-sky mb-2">Admin Console</div>
                  <ul className="space-y-2">
                    <li>AI Studio with dynamic model connectors</li>
                    <li>Vector backend toggle + reindex</li>
                    <li>Plugin Setup Wizard with scaffolds</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Configuration */}
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Configuration That Follows Reality
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Configuration follows reality, not convenience. Vivified resolves configuration from a hierarchical, database‑first model with environment fallback only when the database is down. That means you can give a hospital tenant strict HIPAA defaults while letting a non‑HIPAA tenant use lighter‑weight features, all in the same cluster.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  The Admin Console shows the effective configuration with source badges, and the SDKs see the same truth the UI does.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modular Design */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Built to be Replaced in Pieces
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Vivified is built to be replaced in pieces, not all at once. If you need to change how files are stored, swap the storage plugin. If you need different authentication, switch identity. If a provider has an outage or fails a regional compliance test, point the transport layer at a different plugin without changing the code that calls it.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  The kernel keeps your contracts steady with an OpenAPI‑driven surface and CI guardrails that fail fast when routes or schemas drift.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Big Idea */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                The Big Idea
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-200 text-lg leading-relaxed mb-6">
                  The big idea is that you shouldn't need to fork your product to pass a compliance review or to integrate a new provider. Instead, you declare capabilities as traits, enforce access as policy, plug in the parts you want, and keep shipping.
                </p>
                <p className="text-slate-200 text-lg leading-relaxed">
                  The Admin Console ships day one so teams can build, operate, and automate without waiting for a “phase two.” SDK helpers expand alongside these flows.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-500 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Vivified. Crafting the future of modular systems.
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:dmontg@gmail.com" className="text-slate-400 hover:text-sky transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
