import { ArrowLeft, Code, Terminal, FileCode, Puzzle, Settings, CheckCircle, GitBranch, Package, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

export default function DeveloperTools() {
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
            <Code className="h-5 w-5 text-white" />
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
              <div className="text-6xl drop-shadow-2xl filter brightness-110">🛠️</div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8">
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Developer
              </span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
                Experience
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Complete SDK ecosystem and tooling for building enterprise-grade plugins
            </p>
          </div>
        </section>

        {/* Multi-Language SDKs */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                SDKs & Scaffolds
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Start with the Admin Console’s Plugin Setup Wizard; SDK helpers and scaffolds are available and expanding.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 grid place-items-center">
                    <span className="text-white font-bold text-lg">Py</span>
                  </div>
                  <h3 className="text-2xl font-bold text-sky">Python helpers</h3>
                </div>
                <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                  <pre className="text-slate-300 text-sm">
{`from vivified import Plugin

class MyPlugin(CommunicationPlugin):
    def send_message(self, msg):
        # Your logic here
        self.publish_event(canonical_event)
        
    def on_startup(self):
        self.register_with_core()`}
                  </pre>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Healthcheck + manifest examples</li>
                  <li>• Logging and audit helpers</li>
                  <li>• Operator allowlist integration</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 grid place-items-center">
                    <span className="text-white font-bold text-lg">JS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-pink">Node.js helpers</h3>
                </div>
                <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                  <pre className="text-slate-300 text-sm">
{`import { Plugin } from '@vivified/sdk';

class MyPlugin extends CommunicationPlugin {
  async sendMessage(msg) {
    // Your logic here
    await this.publishEvent(canonicalEvent);
  }
  
  async onStartup() {
    await this.registerWithCore();
  }
}`}
                  </pre>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Express server integration</li>
                  <li>• Promise-based async APIs</li>
                  <li>• TypeScript definitions included</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 grid place-items-center">
                    <span className="text-white font-bold text-lg">Go</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple">Go SDK</h3>
                </div>
                <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                  <pre className="text-slate-300 text-sm">
{`package main

import "github.com/vivified/sdk-go"

type MyPlugin struct {
    vivified.CommunicationPlugin
}

func (p *MyPlugin) SendMessage(msg *Message) error {
    // Your logic here
    return p.PublishEvent(canonicalEvent)
}`}
                  </pre>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Native HTTP server support</li>
                  <li>• Goroutine-safe operations</li>
                  <li>• Minimal dependencies</li>
                </ul>
              </div>
            </div>

            {/* SDK Features */}
            <div className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent text-center">
                Consistent Features Across All SDKs
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>Automatic registration with core platform</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>Event bus connection and message handling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>RPC gateway client for inter-plugin calls</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>Configuration management integration</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>Structured logging with correlation IDs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>Metrics collection and health checks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>Canonical model transformations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
                    <span>Security and trait validation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

            {/* CLI and Tooling */}
            <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                CLI and Development Tools
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Complete toolchain for plugin development, validation, and testing
              </p>
            </div>

            {/* CLI Commands */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Terminal className="h-8 w-8 text-sky" />
                <h3 className="text-3xl font-bold text-sky">Admin Console Wizard</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-pink mb-4">Scaffold Generation</h4>
                  <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                    <pre className="text-slate-300 text-sm">
{`# Admin Console → Tools → Plugin Setup Wizard
# 1) Draft manifest (traits, allowlists)
# 2) Validate policy
# 3) Register with Core
# 4) Download scaffold (healthcheck, manifest, endpoints)`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-pink mb-4">Validation & Testing</h4>
                  <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                    <pre className="text-slate-300 text-sm">
{`# Console tools
# - Manifest validation (traits, allowlists)
# - Operator lane allowlist checks
# - Basic health + audit views

# Local dev (recommended)
# - Docker Compose per scaffold
# - Hot reload examples`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Development Features */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileCode className="h-8 w-8 text-sky" />
                  <h3 className="text-2xl font-bold text-sky">Templates</h3>
                </div>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li>• Complete project scaffolding</li>
                  <li>• Best practices built-in</li>
                  <li>• Contract implementation stubs</li>
                  <li>• Docker and CI configuration</li>
                  <li>• Example canonical transformers</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="h-8 w-8 text-pink" />
                  <h3 className="text-2xl font-bold text-pink">Validation</h3>
                </div>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li>• JSON Schema validation</li>
                  <li>• Trait compatibility checking</li>
                  <li>• Dependency resolution</li>
                  <li>• Security policy validation</li>
                  <li>• Contract compliance testing</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Workflow className="h-8 w-8 text-purple" />
                  <h3 className="text-2xl font-bold text-purple">Testing</h3>
                </div>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li>• Lightweight simulation harness</li>
                  <li>• Full Docker Compose dev env</li>
                  <li>• Mock core platform</li>
                  <li>• Integration test helpers</li>
                  <li>• Hot-reload for rapid iteration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Plugin Marketplace Vision */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Package className="h-8 w-8 text-sky" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                  Plugin Ecosystem Vision
                </h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-200 text-lg leading-relaxed mb-6">
                  The architecture anticipates a plugin registry/marketplace where developers can share plugins. 
                  Consistent contracts and packaging mean plugins are easy to publish as Docker images with manifests 
                  that others can reuse.
                </p>
                <p className="text-slate-200 text-lg leading-relaxed">
                  Semantic versioning, backward compatibility of core contracts, and comprehensive validation 
                  ensure a thriving ecosystem of third-party plugins that just work together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
