import { ArrowLeft, Shield, Users, Key, Settings, Eye, Lock, Workflow, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

export default function TraitSystem() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-night to-deep" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>

      {/* Navigation */}
      <header className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky to-ocean border border-sky/30 grid place-items-center shadow-lg shadow-sky/25">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
            Vivified
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
        {/* Hero Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex items-center justify-center">
              <div className="text-6xl drop-shadow-2xl filter brightness-110">🔐</div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8">
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Trait-Based
              </span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
                Security & Policy
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              How Vivified separates "what is possible" from "what is allowed" through traits and policy
            </p>
          </div>
        </section>

        {/* Trait System Overview */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                How Traits Work
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Traits are capability flags that describe what users, plugins, and resources can do or require. 
                  Providers declare capabilities through canonical traits like <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">webhook.verification</code>, 
                  <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">auth.methods</code>, 
                  <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">supports_inbound</code>, 
                  <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">requires_ami</code>, or 
                  <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">handles_phi</code>.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  The UI dynamically renders based on active traits, and the policy engine enforces compatibility between 
                  user traits, plugin traits, and data traits before allowing any operation.
                </p>
                <div className="mt-6 p-4 bg-gradient-to-r from-sky/10 to-ocean/10 border border-sky/30 rounded-2xl">
                  <div className="text-slate-200 text-sm"><strong>Shipped TBAC gates:</strong> data tagged <code className="text-sky">phi</code> requires callers with <code className="text-sky">hipaa_cleared</code>; <code className="text-sky">pii</code> requires <code className="text-sky">pii_cleared</code>. These defaults are overridable via Config.</div>
                </div>
              </div>
            </div>

            {/* Trait Examples */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-8 w-8 text-sky" />
                  <h3 className="text-2xl font-bold text-sky">User Traits</h3>
                </div>
                <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                  <pre className="text-slate-300 text-sm">
{`user.traits = [
  'admin_capable',
  'hipaa_compliant',
  'finance_access',
  'can_view_audit_logs'
]`}
                  </pre>
                </div>
                <p className="text-slate-300 text-sm">
                  User traits determine their experience and access level in the system.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="h-8 w-8 text-pink" />
                  <h3 className="text-2xl font-bold text-pink">Plugin Traits</h3>
                </div>
                <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                  <pre className="text-slate-300 text-sm">
{`plugin.traits = [
  'handles_phi',
  'requires_encryption',
  'supports_inbound',
  'webhook_verification'
]`}
                  </pre>
                </div>
                <p className="text-slate-300 text-sm">
                  Plugin traits declare what they can handle and what they require from the environment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-8 w-8 text-purple" />
                  <h3 className="text-2xl font-bold text-purple">Data Traits</h3>
                </div>
                <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                  <pre className="text-slate-300 text-sm">
{`data.traits = [
  'contains_phi',
  'confidential',
  'requires_audit',
  'encrypted'
]`}
                  </pre>
                </div>
                <p className="text-slate-300 text-sm">
                  Data traits label information with security and handling requirements.
                </p>
              </div>
            </div>

            {/* Policy Engine */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Policy Engine Enforcement
              </h2>
              <div className="bg-slate-900/70 rounded-2xl p-6 mb-6">
                <pre className="text-slate-300 text-sm md:text-base leading-relaxed overflow-x-auto">
{`# Automatic trait compatibility checking
if not trait_engine.compatible(user.traits, plugin.traits):
    raise PermissionError("User cannot access this plugin")

# Data access control
if data.has_trait('contains_phi') and not plugin.has_trait('handles_phi'):
    return redacted_version(data)

# UI rendering based on traits
if user.has_trait('admin_capable'):
    show_admin_features()
else:
    show_limited_interface()`}
                </pre>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                The policy engine automatically enforces trait compatibility across all system interactions. 
                No manual permission checks needed—the system knows what's allowed.
              </p>
              <div className="mt-6 p-4 bg-slate-900/60 border border-slate-700/60 rounded-2xl text-sm text-slate-300">
                <strong>Reality check:</strong> Trait‑aware UI surfaces ship in the Admin Console today (diagnostics, setup, and model connectors reflect active traits). Fine‑grained custom policies per tenant are expanding steadily.
              </div>
            </div>

            {/* Dynamic UI Rendering */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Traits-First UI Adaptation
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  The Admin Console automatically adapts to active plugins and user permissions. If a plugin is disabled 
                  or a user lacks permission, the UI either hides those sections or shows them disabled with helpful messages.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  This means the same interface can serve different user types with appropriate experiences—from 
                  limited-access users seeing only what they need, to admins getting deep diagnostic tools—all 
                  without hardcoding different UIs.
                </p>
                <div className="bg-gradient-to-r from-sky/10 to-ocean/10 border border-sky/30 rounded-2xl p-6">
                  <p className="text-lg text-slate-200 font-medium text-center">
                    <strong>Result:</strong> One interface that intelligently adapts to capabilities and permissions, 
                    reducing maintenance overhead and ensuring consistent experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
