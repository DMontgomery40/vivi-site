import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Settings, Zap, ChevronDown, Github, Mail, ExternalLink, Shield, Database, Terminal, Users, Lock, Heart, Network, MessageSquare, FileCode, Eye, Container, Clock, Server, Cpu, GitBranch } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Simplified Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-night to-deep" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div 
          className="absolute inset-0 bg-gradient-radial from-sky/10 via-transparent to-transparent"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96,165,250,0.08), transparent 50%)`
          }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6">
        <Link to="/">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky to-ocean border border-sky/30 grid place-items-center shadow-lg shadow-sky/25">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
              Vivified
            </div>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 text-slate-300">
            <a href="#three-lane" className="text-sm font-medium hover:text-white transition-colors">
              3-Lane System
            </a>
            <a href="#core-services" className="text-sm font-medium hover:text-white transition-colors">
              Core Services
            </a>
            <a href="#developer-tools" className="text-sm font-medium hover:text-white transition-colors">
              Developer Tools
            </a>
            <Link to="/roadmap" className="text-sm font-medium hover:text-white transition-colors">
              Roadmap
            </Link>
          </div>
          <a 
            className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
            href="https://faxbot.net/admin-demo/" 
            target="_blank" 
            rel="noreferrer"
          >
            <span className="text-sm font-medium">Live Demo</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY }}
          className="min-h-screen flex items-center justify-center px-6 lg:px-12 -mt-20"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 flex items-center justify-center">
              <div className="text-8xl drop-shadow-2xl filter brightness-110">🦋</div>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8">
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Enterprise Application
              </span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent animate-gradient">
                Kernel for
              </span>
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Regulated Software
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Assemble products from interchangeable parts. Keep them safe under real-world constraints.
              <br />
              <span className="text-sky font-medium">3-lane communication • Plugin-first architecture • Trait-based security • Policy-driven governance</span>
            </p>
            
            <p className="text-sm italic text-slate-400 max-w-2xl mx-auto mb-12">
              *Named after my daughter Vivi. The domain vivi.com costs $429k. vivified.dev was $21. 
              Sometimes constraints breed creativity.*
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <a 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink to-sky px-8 py-4 font-bold text-white shadow-2xl shadow-pink/25 hover:shadow-pink/40 hover:scale-105 transition-all duration-200"
                href="https://github.com/DMontgomery40/Faxbot/tree/auto-tunnel" 
                target="_blank" 
                rel="noreferrer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  git clone vivified
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <a 
                className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors px-6 py-3 rounded-xl border border-slate-700/50 hover:border-pink/50 backdrop-blur-sm"
                href="mailto:dmontg@gmail.com"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">dmontg@gmail.com</span>
              </a>
            </div>

            <div className="flex justify-center">
              <div
                className="text-slate-400 cursor-pointer animate-bounce"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <ChevronDown className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* What This Actually Is */}
        <section className="py-24 px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                What This Actually Is
              </h2>
              <p className="text-xl text-slate-400 max-w-4xl mx-auto">
                An application kernel that lets you rewire live systems—swapping transports, storage, identity, and UI modules—without breaking contracts or compliance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sky/5 to-ocean/5 border border-sky/20 backdrop-blur-xl rounded-3xl p-12 text-center mb-16">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Built by Accident While Solving Healthcare's Fax Problem
              </h3>
              <p className="text-lg text-slate-200 font-medium max-w-4xl mx-auto leading-relaxed">
                Started as a simple fax server. Got scared about HIPAA compliance. Went overboard on architecture. 
                Six months later, realized I'd built a platform for regulated software.
                <br /><br />
                <span className="text-sky">Faxbot proves it works. Your domain could be next.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Three Core Innovations */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Three Core Innovations
              </h2>
              <p className="text-xl text-slate-400 max-w-4xl mx-auto">
                The architectural decisions that make enterprise-grade plugin systems actually work in production
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* 3-Lane Communication */}
              <div id="three-lane" className="group">
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 h-full hover:border-sky/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-sky/20 to-ocean/20 border border-sky/30">
                      <Network className="h-8 w-8 text-sky" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">3-Lane Communication</h3>
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Purpose-built channels with different performance and security characteristics. Most plugin systems fail because they treat all communication the same.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-sky flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sky">Canonical Lane</div>
                        <div className="text-sm text-slate-400">Universal data models, &lt;15ms p50, NATS JetStream</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-pink flex-shrink-0" />
                      <div>
                        <div className="font-medium text-pink">Operator Lane</div>
                        <div className="text-sm text-slate-400">Low-latency gRPC, &lt;5ms p50, zero-copy</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple flex-shrink-0" />
                      <div>
                        <div className="font-medium text-purple">Proxy Lane</div>
                        <div className="text-sm text-slate-400">Heavily guarded external calls, mTLS</div>
                      </div>
                    </div>
                  </div>

                  <Link to="/three-lane">
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky/20 to-ocean/20 border border-sky/30 text-sky font-medium px-6 py-3 rounded-xl hover:from-sky/30 hover:to-ocean/30 transition-all duration-200">
                      <span>Technical Deep Dive</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Trait-Based Security */}
              <div className="group">
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 h-full hover:border-pink/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-pink/20 to-magenta/20 border border-pink/30">
                      <Shield className="h-8 w-8 text-pink" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Trait-Based Security</h3>
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Users, plugins, and data have traits that determine compatibility. Policy engine enforces access control automatically—no manual permission checks.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="bg-slate-900/70 rounded-lg p-4">
                      <div className="text-xs font-mono text-slate-300">
                        <div className="text-pink">user.traits = ['admin_capable', 'hipaa_compliant']</div>
                        <div className="text-sky">plugin.traits = ['handles_phi', 'requires_encryption']</div>
                        <div className="text-purple mt-2"># System enforces compatibility automatically</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      Dynamic UI rendering, automatic data filtering, zero-trust by default
                    </div>
                  </div>

                  <Link to="/trait-system">
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink/20 to-magenta/20 border border-pink/30 text-pink font-medium px-6 py-3 rounded-xl hover:from-pink/30 hover:to-magenta/30 transition-all duration-200">
                      <span>Security & Policy Guide</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Plugin-First Architecture */}
              <div className="group">
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 h-full hover:border-purple/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple/20 to-deep/20 border border-purple/30">
                      <Container className="h-8 w-8 text-purple" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Plugin-First Architecture</h3>
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Everything is a plugin running in secure containers. Multi-language SDKs, standardized contracts, and comprehensive developer tooling.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="bg-slate-900/70 rounded-lg p-4">
                      <div className="text-xs font-mono text-slate-300">
                        <div className="text-sky">vivified create-plugin --type communication</div>
                        <div className="text-slate-500"># Generates complete scaffold:</div>
                        <div className="text-slate-400">├── Plugin contract implementation</div>
                        <div className="text-slate-400">├── Docker configuration</div>
                        <div className="text-slate-400">└── Unit test stubs</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      Python, Node.js, Go SDKs with identical APIs
                    </div>
                  </div>

                  <Link to="/developer-tools">
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple/20 to-deep/20 border border-purple/30 text-purple font-medium px-6 py-3 rounded-xl hover:from-purple/30 hover:to-deep/30 transition-all duration-200">
                      <span>Developer Experience</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Infrastructure */}
        <section id="core-services" className="py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Enterprise Infrastructure Included
              </h2>
              <p className="text-xl text-slate-400 max-w-4xl mx-auto">
                Core platform services that normally take enterprise teams years to build
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left Column - What You Get */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">What You Get Out of the Box</h3>
                <div className="space-y-6">
                  <ServiceFeature 
                    icon={<Users className="h-6 w-6 text-sky" />}
                    title="Identity & Access Management"
                    description="User management, API keys, OAuth, enterprise IdP integration, session management with CSRF protection"
                  />
                  <ServiceFeature 
                    icon={<Settings className="h-6 w-6 text-pink" />}
                    title="Configuration & Policy Engine"
                    description="Hierarchical config store, encrypted secrets, multi-tenant configuration, trait-based policy enforcement"
                  />
                  <ServiceFeature 
                    icon={<Database className="h-6 w-6 text-purple" />}
                    title="Storage & Orchestration"
                    description="Shared object storage, plugin registry, event bus routing, canonical model engine, workflow orchestration"
                  />
                  <ServiceFeature 
                    icon={<Eye className="h-6 w-6 text-sky" />}
                    title="Audit & Compliance"
                    description="Structured audit logging, HIPAA/SOC2 alignment, PHI redaction, metrics monitoring, compliance reporting"
                  />
                </div>
              </div>

              {/* Right Column - Architecture Diagram */}
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">System Architecture</h3>
                <div className="bg-slate-900/70 rounded-2xl p-6">
                  <pre className="text-slate-300 text-sm leading-relaxed overflow-x-auto">
{`Vivified Core (Security Foundation)
├── GUI-First Admin Console
├── 3-Lane Communication System
├── Trait-Based Security Engine
├── Plugin Manager & Sandbox
├── Identity & Access Service
├── Configuration Service
├── Storage & Orchestration
├── Canonical Model Engine
└── Audit & Compliance

Your Plugins (Domain Logic)
├── Business Logic Modules
├── Integration Adapters  
├── Custom UI Components
├── Data Processing Pipelines
└── Communication Protocols`}
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-sky/10 to-ocean/10 border border-sky/30 rounded-xl">
                  <p className="text-slate-200 font-medium text-center">
                    <strong>You build the domain logic.</strong><br />
                    We provide the enterprise foundation.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/architecture">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-pink to-sky text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-pink/25 hover:shadow-pink/40 hover:scale-105 transition-all duration-200">
                  <Settings className="h-5 w-5" />
                  <span>Complete Architecture Overview</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Developer Experience */}
        <section id="developer-tools" className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Built for Developers
              </h2>
              <p className="text-xl text-slate-400 max-w-4xl mx-auto">
                From idea to production plugin in minutes, not months
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-sky mb-6">Multi-Language SDKs</h3>
                <div className="bg-slate-900/70 rounded-2xl p-6 mb-6">
                  <pre className="text-slate-300 text-sm">
{`# Python
from vivified import Plugin
class MyPlugin(CommunicationPlugin):
    def send_message(self, msg):
        self.publish_event(canonical_event)

# Node.js  
import { Plugin } from '@vivified/sdk';
class MyPlugin extends CommunicationPlugin {
    async sendMessage(msg) {
        await this.publishEvent(canonicalEvent);
    }

# Go
type MyPlugin struct {
    vivified.CommunicationPlugin
}
func (p *MyPlugin) SendMessage(msg *Message) error {
    return p.PublishEvent(canonicalEvent)
}`}
                  </pre>
                </div>
                <p className="text-slate-400 text-sm">
                  Identical APIs across Python, Node.js, and Go. Same concepts, same methods, same behavior.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-pink mb-6">Complete Toolchain</h3>
                  <div className="space-y-4">
                    <ToolFeature 
                      icon={<Terminal className="h-5 w-5 text-pink" />}
                      title="CLI Generator"
                      description="Complete project scaffolding with best practices built-in"
                    />
                    <ToolFeature 
                      icon={<FileCode className="h-5 w-5 text-pink" />}
                      title="Manifest Validation"
                      description="JSON Schema validation with trait compatibility checking"
                    />
                    <ToolFeature 
                      icon={<Container className="h-5 w-5 text-pink" />}
                      title="Dev Environments"
                      description="Docker Compose setups with hot-reload for rapid iteration"
                    />
                    <ToolFeature 
                      icon={<Eye className="h-5 w-5 text-pink" />}
                      title="Built-in Observability"
                      description="Structured logging, metrics, health checks, and tracing"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink/10 to-sky/10 border border-pink/30 rounded-xl p-6">
                  <h4 className="font-bold text-pink mb-2">5-Phase Implementation Roadmap</h4>
                  <p className="text-slate-300 text-sm">
                    Realistic 19-27 week plan from core scaffolding to production v1.0. 
                    Each phase delivers working software that validates the architecture.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/developer-tools">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-pink to-sky text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-pink/25 hover:shadow-pink/40 hover:scale-105 transition-all duration-200">
                  <Terminal className="h-5 w-5" />
                  <span>Complete Developer Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Proof It Works */}
        <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Proof It Works: Faxbot
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                The first live application built on Vivified. A complete healthcare communication platform proving the architecture works for complex, compliance-heavy applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-sky">Live Production System</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Experience the GUI-first admin console, traits-first UI rendering, and multi-provider architecture running in production with real healthcare data.
                </p>
                <a 
                  href="https://faxbot.net/admin-demo/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky to-ocean hover:from-ocean hover:to-deep text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-sky/25 hover:shadow-sky/40 hover:scale-105"
                >
                  Try Faxbot Admin Demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-sky">Open Source Implementation</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Dive into the actual implementation. See how plugins, traits, and security boundaries work in a real production system handling HIPAA compliance.
                </p>
                <a 
                  href="https://github.com/DMontgomery40/Faxbot/tree/auto-tunnel" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-600 hover:border-sky/50 text-slate-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm hover:scale-105"
                >
                  <Github className="h-4 w-4" />
                  Explore Faxbot Source Code
                </a>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 max-w-4xl mx-auto">
                <p className="text-lg text-slate-300 leading-relaxed">
                  We're building <span className="font-bold text-sky">Vivified</span> in the open. 
                  Faxbot proves the architecture works for complex, compliance-heavy applications. 
                  <br /><br />
                  <span className="text-xl font-bold bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                    Your domain could be next.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-500 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Vivified. Crafting the future of modular systems.
            <Heart className="h-3 w-3 text-pink" />
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

function ServiceFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/50 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ToolFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
}