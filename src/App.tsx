import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Plug, Puzzle, Settings, Zap, Code, Layers, Sparkles, ChevronDown, Github, Mail, ExternalLink, Shield, Database, Brain, Terminal, Users, Lock, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  
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
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-night to-deep" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-sky/20 via-transparent to-transparent"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96,165,250,0.15), transparent 40%)`
          }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-sky/40 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                y: [null, -20, 20, -20],
                opacity: [0, 1, 0.5, 1, 0]
              }}
              transition={{ 
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
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
            className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white transition-colors group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/architecture" className="flex items-center gap-2">
              <span className="text-sm font-medium">Technical Details</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
          <motion.a 
            className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
            href="https://faxbot.net/admin-demo/" 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium">See Faxbot Demo</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="min-h-screen flex items-center justify-center px-6 lg:px-12 -mt-20"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 flex items-center justify-center"
            >
              <div className="text-8xl drop-shadow-2xl filter brightness-110">🦋</div>
            </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
            >
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                The security-first
              </span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent animate-gradient">
                platform where
              </span>
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                everything is a plugin
              </span>
          </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Enterprise-grade architecture, open-source foundation, infinite possibilities. 
              <br />
              <span className="text-sky font-medium">Built by accident while solving healthcare's fax problem.</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm italic text-slate-400 max-w-2xl mx-auto mb-12"
            >
              *Named after my daughter Vivi. The domain vivi.com costs $429k. vivified.dev was $21. 
              Sometimes constraints breed creativity.*
            </motion.p>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            >
              <motion.a 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink to-sky px-8 py-4 font-bold text-white shadow-2xl shadow-pink/25 transition-all hover:shadow-pink/40 hover:scale-105"
                href="https://github.com/DMontgomery40/Faxbot/tree/auto-tunnel" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  git clone vivified
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-magenta to-purple opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              
              <motion.a 
                className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors px-6 py-3 rounded-xl border border-slate-700/50 hover:border-pink/50 backdrop-blur-sm"
                href="mailto:dmontg@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">dmontg@gmail.com</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-slate-400 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </motion.div>

            {/* Architecture Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center mb-16"
            >
              <motion.div
                className="group flex items-center gap-3 text-slate-400 hover:text-pink transition-colors px-6 py-3 rounded-xl border border-slate-700/50 hover:border-pink/50 backdrop-blur-sm cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/architecture" className="flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Read the Technical Deep Dive</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* The Real Story Section */}
        <section className="py-32 px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                How This Actually Started
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-4xl mx-auto mb-16"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  I had heart failure after COVID (myocarditis) and suddenly found myself faxing a lot of medical records. Healthcare is genuinely stuck in 1995 - everything still runs on fax machines. So I started building a simple fax server.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  But then I got scared. What if a hospital actually used this thing with real patient data and I screwed something up? What if HIPAA auditors came knocking? I'd never built anything for healthcare before.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  So I went way overboard on the architecture:
                </p>
                <ul className="text-slate-300 space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink rounded-full mt-3 flex-shrink-0"></div>
                    Made every component swappable so I could switch providers if one failed compliance
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink rounded-full mt-3 flex-shrink-0"></div>
                    Built security boundaries everywhere so plugins couldn't accidentally leak data
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink rounded-full mt-3 flex-shrink-0"></div>
                    Created a universal message format so different systems could talk without breaking
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink rounded-full mt-3 flex-shrink-0"></div>
                    Added AI integration because I knew LLMs would need proper guardrails around medical data
                  </li>
                </ul>
                <p className="text-xl text-white font-semibold">
                  Six months later, I looked at what I'd built. This wasn't a fax server anymore.
                </p>
                <p className="text-2xl font-bold text-center mt-6 bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent">
                  It was a platform for building regulated software.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <EnhancedFeature 
                icon={<Shield className="h-8 w-8" />} 
                title="Security-First" 
                text="HIPAA-aligned controls, HMAC verification, short-TTL tokens, and compliant logging built into the core platform."
                delay={0}
              />
              <EnhancedFeature 
                icon={<Plug className="h-8 w-8" />} 
                title="Everything's a Plugin" 
                text="User management, storage, communication, even the UI. Mix and match 20+ providers with clean boundaries."
                delay={0.1}
              />
              <EnhancedFeature 
                icon={<Brain className="h-8 w-8" />} 
                title="AI Integration" 
                text="Official MCP servers (Node & Python) for stdio/HTTP/SSE with webhook support and proper guardrails."
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* What Vivified Actually Is Section */}
        <section className="py-32 px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                What Vivified Actually Is
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-sky mb-4">Core Platform</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span><strong>GUI-first Admin Console:</strong> One interface for everything—no CLI-only features allowed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Settings className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span><strong>Traits-first architecture:</strong> UI dynamically renders based on active provider capabilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span><strong>Multi-backend adapters:</strong> Mix and match 20+ providers with clean boundaries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span><strong>HIPAA-aligned controls:</strong> HMAC verification, audit trails, compliant logging</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-sky mb-4">Your Application</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <Code className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span>Whatever you build on top using our plugin contracts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span>Gets enterprise admin console, multi-provider architecture, AI integration, and compliance for free</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Layers className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                      <span>Could be cybersecurity tools, educational platforms, ERP systems—platform adapts to your domain</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8">
                  <p className="text-lg text-slate-200 font-medium">
                    <strong>Translation:</strong> We handle all the enterprise infrastructure (admin console, provider adapters, AI integration, compliance). You focus on your domain-specific business logic.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                The Architecture That Changes Everything
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16"
            >
              <pre className="text-slate-300 text-sm md:text-base leading-relaxed overflow-x-auto">
{`Vivified Core (Your Security Foundation)
├── GUI-First Admin Console (React + MUI, mobile-responsive)
├── Traits-First UI Rendering (dynamic based on active capabilities)
├── Multi-Backend Provider System (20+ pre-built adapters)
├── Canonical Event & Error Model (universal message format)
├── AI Integration (MCP servers: stdio/HTTP/SSE + webhooks)
├── Identical SDKs (Node.js & Python with same API surface)
├── HIPAA Controls (HMAC verification, audit trails, compliant logging)
└── Plugin Sandbox & Security Boundaries

Your Plugins (Your Application Domain)
├── Domain-Specific Providers (your integrations)
├── Business Logic Plugins (your workflows)
├── Custom UI Components (your admin screens)
├── Data Processing Plugins (your transformations)
└── Communication Adapters (your protocols)`}
              </pre>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 rounded-2xl">
                <p className="text-lg text-slate-200 font-medium">
                  We handle all the enterprise infrastructure (admin console, provider adapters, AI integration, compliance). You build your product.
                </p>
              </div>
            </motion.div>

            {/* Why This Matters */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-pink mb-4">For Solo Developers</h3>
                <p className="text-slate-300 mb-4">Building enterprise software solo is insane. You need:</p>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• GUI-first admin console with mobile support</li>
                  <li>• Multi-provider architecture with 20+ adapters</li>
                  <li>• AI integration (MCP servers, multiple transports)</li>
                  <li>• Role-based permissions with audit trails</li>
                  <li>• HIPAA/SOC2-ready compliance framework</li>
                </ul>
                <p className="text-sky font-semibold mt-4">With Vivified: All of that is the platform.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-pink mb-4">For Teams/Startups</h3>
                <p className="text-slate-300 mb-4">Stop rebuilding the same infrastructure:</p>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• GUI-first admin console (React + MUI) ✅</li>
                  <li>• Multi-backend provider system ✅</li>
                  <li>• AI integration (MCP servers) ✅</li>
                  <li>• Traits-first dynamic UI rendering ✅</li>
                  <li>• Canonical event/error model ✅</li>
                </ul>
                <p className="text-sky font-semibold mt-4">Your team builds features, we handle infrastructure.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-pink mb-4">For Enterprises</h3>
                <p className="text-slate-300 mb-4">Replace legacy systems without losing flexibility:</p>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Integrate with existing identity providers</li>
                  <li>• Maintain compliance while enabling innovation</li>
                  <li>• Give different user types appropriate experiences</li>
                  <li>• Scale from 10 to 10,000 users with same architecture</li>
                </ul>
              </motion.div>
            </div>

            {/* Q&A */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Is this just another application framework?
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed text-center">
                No. Frameworks help you build applications. Vivified handles security, compliance, user management, and AI integration so you can focus on your product.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Technical Deep Dive Section */}
        <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent to-slate-900/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Technical Deep Dive
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                How the plugin architecture actually works under the hood
              </p>
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink to-sky text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-pink/25"
                whileHover={{ scale: 1.05 }}
              >
                <Settings className="h-5 w-5" />
                <span>Technical Deep Dive Below</span>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </motion.div>

            {/* Application Kernel Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Application Kernel for Regulated Software
              </h3>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Vivified is an application kernel for regulated software. It lets you assemble products from interchangeable parts and keep them safe under real‑world constraints. Capabilities are expressed as traits, everything else is a plugin, and policy decides who can do what. The result is a system you can rewire live — swapping transports, storage, identity, and UI modules — without breaking your contracts or your compliance story.
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Out of the box, Vivified ships with an Admin Console that is trait‑aware: it adapts diagnostics, setup, and help to the active provider's capabilities instead of hard‑coding brand names. It includes SDKs for Node and Python that mirror the API and stay honest to the OpenAPI spec, so you can move quickly without guessing. It also includes two built‑in MCP servers (Node and Python) that can run over stdio, HTTP, or SSE. That means you can expose the platform's capabilities to AI agents in environments with different security postures — from fully offline stdio to HIPAA‑friendly SSE — without rebuilding anything.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Traits and Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Traits and Policy Engine
              </h3>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Under the hood, the kernel separates "what is possible" from "what is allowed." Providers declare capabilities through canonical traits such as <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">webhook.verification</code>, <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">auth.methods</code>, <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">supports_inbound</code>, <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">requires_ami</code>, or <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">needs_storage</code>. Your app then loads plugins — transport, storage, identity, and more — and the UI simply renders what those traits say exists.
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Authorization is handled by policy: roles and attributes can enable or hide actions per tenant, group, user, or session. This keeps the experience clean for a low‑access user while giving admins a deep, actionable view — with different diagnostics, different help, and different next steps — even when both users share the same providers.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Canonical Models */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Canonical Models
              </h3>
              <p className="text-lg text-slate-300 text-center mb-8">
                Universal data formats enable plugin interoperability:
              </p>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <pre className="text-slate-300 text-sm md:text-base leading-relaxed overflow-x-auto">
{`@dataclass
class CanonicalMessage:
    sender: CanonicalIdentity
    recipient: CanonicalIdentity
    content: CanonicalContent
    traits: List[str]  # ['encrypted', 'urgent', 'requires_audit']
    metadata: Dict[str, Any]`}
                </pre>
              </div>
            </motion.div>

            {/* Trait-Based Access Control */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Trait-Based Access Control
              </h3>
              <p className="text-lg text-slate-300 text-center mb-8">
                Users, plugins, and resources have traits that determine compatibility:
              </p>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                <pre className="text-slate-300 text-sm md:text-base leading-relaxed overflow-x-auto">
{`# User traits determine their experience
user.traits = ['admin_capable', 'hipaa_compliant']

# Plugin traits determine what they can access
plugin.traits = ['handles_phi', 'requires_encryption']

# System automatically enforces compatibility
if not trait_engine.compatible(user.traits, plugin.traits):
    raise PermissionError("User cannot access this plugin")`}
                </pre>
              </div>
            </motion.div>

            {/* Security and Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Built for Regulated Environments
              </h3>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    The platform is designed for environments that cannot afford surprises. Webhooks return 202 and are idempotent by default. Secrets never appear in logs, and PHI is treated as toxic: it's redacted in audit records and kept out of observable payloads. Sessions use secure cookies with CSRF protection, and elevation states (like <code className="text-sky bg-slate-800/50 px-2 py-1 rounded">mfa_verified</code>) are time‑bound and automatically drop.
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Observability is consistent and boring: there is exactly one metrics endpoint on the API port, a single health monitor/circuit breaker, and the server never forks multiple metrics stacks that fight each other.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Configuration Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Configuration That Follows Reality
              </h3>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Configuration follows reality, not convenience. Vivified resolves configuration from a hierarchical, database‑first model with environment fallback only when the database is down. That means you can give a hospital tenant strict HIPAA defaults while letting a non‑HIPAA tenant use lighter‑weight features, all in the same cluster.
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    The Admin Console shows the effective configuration with source badges, and the SDKs see the same truth the UI does.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Modular by Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Built to be Replaced in Pieces
              </h3>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Vivified is built to be replaced in pieces, not all at once. If you need to change how files are stored, swap the storage plugin. If you need different authentication, switch identity. If a provider has an outage or fails a regional compliance test, point the transport layer at a different plugin without changing the code that calls it.
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    The kernel keeps your contracts steady with an OpenAPI‑driven surface and CI guardrails that fail fast when routes or schemas drift.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* The Big Idea */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center">
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                  The Big Idea
                </h3>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-slate-200 text-lg leading-relaxed mb-6">
                    The big idea is that you shouldn't need to fork your product to pass a compliance review or to integrate a new provider. Instead, you declare capabilities as traits, enforce access as policy, plug in the parts you want, and keep shipping.
                  </p>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    The Admin Console, SDKs, and MCP servers are there from day one so teams can build, operate, and automate without waiting for a "phase two."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Q&A */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                How is security actually enforced?
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed text-center">
                Core platform validates every plugin operation. Plugins can't bypass authentication, audit logging, or access controls. Think of it like a secure container that plugins run inside.
              </p>
            </motion.div>
          </div>
        </section>

        {/* See It In Action Section */}
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                See It In Action
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Faxbot is the first <em>live</em> application built on Vivified. It's a complete healthcare communication platform with GUI-first admin console, multi-provider architecture, and AI integration. Other applications are in development.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky/5 to-ocean/5" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-sky">Live Demo</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Experience the GUI-first admin console, traits-first UI rendering, and multi-provider architecture in action.
                  </p>
                  <a 
                    href="https://faxbot.net/admin-demo/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-sky to-ocean hover:from-ocean hover:to-deep text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-sky/25 hover:shadow-sky/40 hover:scale-105"
                  >
                    Try Faxbot Admin Demo
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky/5 to-ocean/5" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-sky">Source Code</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Dive into the actual implementation. See how plugins, traits, and security boundaries work in a real production system.
                  </p>
                  <a 
                    href="https://github.com/DMontgomery40/Faxbot/tree/auto-tunnel" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-slate-600 hover:border-sky/50 text-slate-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <Github className="h-4 w-4" />
                    Explore Faxbot Code
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 max-w-4xl mx-auto">
                <p className="text-lg text-slate-300 leading-relaxed">
                  We're building <span className="font-bold text-sky">Vivified</span> in the open. 
                  Faxbot proves the architecture works for complex, compliance-heavy applications. 
                  Your domain could be next.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-slate-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Get Started
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                From zero to production-ready platform in minutes
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Quick Start */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-pink mb-6">Quick Start (Docker Compose)</h3>
                <div className="bg-slate-900/70 rounded-2xl p-6 mb-6">
                  <pre className="text-slate-300 text-sm leading-relaxed overflow-x-auto">
{`git clone https://github.com/dmontgomery40/vivified
cd vivified
cp .env.example .env
# Pick your providers in .env (20+ pre-built adapters)

# Start the platform
docker compose up -d --build api

# GUI-first Admin Console
open http://localhost:8080

# Health checks
curl http://localhost:8080/health
curl -i http://localhost:8080/health/ready

# Optional: AI integration (MCP servers)
docker compose --profile mcp up -d --build`}
                  </pre>
                </div>
              </motion.div>

              {/* Healthcare Example */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-pink mb-6">Healthcare Communication Platform</h3>
                <div className="bg-slate-900/70 rounded-2xl p-6 mb-6">
                  <pre className="text-slate-300 text-sm leading-relaxed overflow-x-auto">
{`# .env configuration
FAX_BACKEND=phaxio
PHAXIO_API_KEY=your_key
PHAXIO_API_SECRET=your_secret

# Or mix providers (hybrid backend)
FAX_OUTBOUND_BACKEND=sinch
FAX_INBOUND_BACKEND=sip`}
                  </pre>
                </div>
                <p className="text-slate-300 text-sm">
                  20+ pre-built adapters for Phaxio, Sinch, SignalWire, FreeSWITCH, and more.
                </p>
              </motion.div>
            </div>

            {/* Build Your First Plugin */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Build Your First Plugin
              </h3>
              <div className="bg-slate-900/70 rounded-2xl p-6 mb-6">
                <pre className="text-slate-300 text-sm md:text-base leading-relaxed overflow-x-auto">
{`vivified create-plugin --type communication --name my-domain
# Generates plugin skeleton with:
# - Provider adapter contract
# - Canonical event model
# - Admin UI components
# - SDK integration
# Add your code, deploy`}
                </pre>
              </div>
              <p className="text-lg text-slate-300 text-center">
                Plugin templates give you everything you need. Just add your code.
              </p>
            </motion.div>

            {/* Why Vivified vs Others */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Why Vivified Instead of [Framework X]?
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                  <h4 className="text-xl font-bold text-sky mb-4">vs. Microservices Frameworks</h4>
                  <div className="space-y-3">
                    <p className="text-slate-400"><strong>Them:</strong> Build and maintain 15 microservices</p>
                    <p className="text-slate-300"><strong>Us:</strong> Build plugins, we handle the platform</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                  <h4 className="text-xl font-bold text-sky mb-4">vs. Low-Code Platforms</h4>
                  <div className="space-y-3">
                    <p className="text-slate-400"><strong>Them:</strong> Vendor lock-in with proprietary tools</p>
                    <p className="text-slate-300"><strong>Us:</strong> Open source with full code access</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                  <h4 className="text-xl font-bold text-sky mb-4">vs. Enterprise Platforms</h4>
                  <div className="space-y-3">
                    <p className="text-slate-400"><strong>Them:</strong> $$$$ licensing with rigid architectures</p>
                    <p className="text-slate-300"><strong>Us:</strong> Start free, scale as needed, customize everything</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8">
                  <h4 className="text-xl font-bold text-sky mb-4">vs. Building From Scratch</h4>
                  <div className="space-y-3">
                    <p className="text-slate-400"><strong>Them:</strong> 18 months building infrastructure before first feature</p>
                    <p className="text-slate-300"><strong>Us:</strong> Ship features on day one</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Final Q&A */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8"
              >
                <h3 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                  What about vendor lock-in?
                </h3>
                <p className="text-slate-300 leading-relaxed text-center">
                  It's open source (MIT license). You own your code, your data, your deployment. We make money from support and services, not lock-in.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8"
              >
                <h3 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                  What happens if you disappear?
                </h3>
                <p className="text-slate-300 leading-relaxed text-center">
                  The platform is designed to run without us. Open source core, documented plugin contracts, no phone-home requirements. Your plugins will outlive us.
                </p>
              </motion.div>
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

function EnhancedFeature({ icon, title, text, delay }: { icon: React.ReactNode; title: string; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl p-8 hover:border-sky/30 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky/5 to-ocean/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-sky/20 to-ocean/20 border border-sky/30 text-sky group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
        <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
          {text}
        </p>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-sky/20 to-ocean/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
}
