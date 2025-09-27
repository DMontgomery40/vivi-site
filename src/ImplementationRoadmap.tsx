import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CheckCircle, Clock, Zap, GitBranch, Server, Shield, Code, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function ImplementationRoadmap() {
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
              <MapPin className="h-5 w-5 text-white" />
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
              <div className="text-6xl drop-shadow-2xl filter brightness-110">🗺️</div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8"
            >
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Implementation
              </span>
              <span className="block bg-gradient-to-r from-pink via-magenta to-sky bg-clip-text text-transparent animate-gradient">
                Roadmap
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              A realistic 5-phase plan to build the complete enterprise platform
            </motion.p>
          </div>
        </section>

        {/* Repository Structure */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Repository Structure
              </h2>
              <div className="bg-slate-900/70 rounded-2xl p-6">
                <pre className="text-slate-300 text-sm md:text-base leading-relaxed overflow-x-auto">
{`vivified/
├── core/                # Core platform source code
│   ├── identity/       # Identity & auth service
│   ├── config/         # Configuration service
│   ├── policy/         # Policy engine and trait logic
│   ├── messaging/      # Event bus and RPC gateway integration
│   ├── plugin_manager/ # Plugin registration & sandbox logic
│   ├── ui/             # Admin Console frontend
│   └── ...
├── plugins/             # Reference or built-in plugins
│   ├── example_email_gateway/    # Example plugin 1
│   └── example_user_management/  # Example plugin 2
├── sdk/                 # SDKs for plugin development
│   ├── python/
│   ├── nodejs/
│   └── go/
├── docs/                # Documentation for architecture and plugin development
├── tools/               # Dev tools (manifest validator, CLI generator source)
├── docker-compose.yml   # Compose file for core and example plugins
├── k8s/                 # Kubernetes manifests or Helm charts for deployment
└── ...`}
                </pre>
              </div>
              <p className="text-lg text-slate-300 mt-6">
                Clear separation: core vs plugins vs SDK. Designed for scalable development and deployment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Phase Roadmap */}
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
                5-Phase Development Plan
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Each phase delivers incremental value and validates the architecture
              </p>
            </motion.div>

            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sky to-ocean grid place-items-center">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-sky mb-2">Core Scaffolding & Plugin Interface Baseline</h3>
                    <p className="text-slate-400">Foundation setup with basic plugin registration</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-pink mb-4">Key Deliverables</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                        <span>Repository structure and CI pipeline</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                        <span>Core skeleton app with health endpoints</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                        <span>Plugin interface definitions and contracts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                        <span>Basic plugin registration flow</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                        <span>Example no-op plugin</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky mt-0.5 flex-shrink-0" />
                        <span>Docker Compose setup</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-pink mb-4">Technical Focus</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-purple flex-shrink-0" />
                        <span>FastAPI/Express core application</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <GitBranch className="h-5 w-5 text-purple flex-shrink-0" />
                        <span>Abstract base classes for plugin types</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Code className="h-5 w-5 text-purple flex-shrink-0" />
                        <span>Canonical model data structures</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-sky/10 to-ocean/10 border border-sky/30 rounded-2xl">
                      <p className="text-slate-200 font-medium">
                        <strong>Outcome:</strong> Running platform skeleton with one plugin recognized by core
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-pink to-magenta grid place-items-center">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-pink mb-2">Core Services Implementation</h3>
                    <p className="text-slate-400">Identity, configuration, and basic security</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-sky mb-4">Key Deliverables</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-pink mt-0.5 flex-shrink-0" />
                        <span>User authentication and API key management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-pink mt-0.5 flex-shrink-0" />
                        <span>Basic trait and permission engine</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Server className="h-5 w-5 text-pink mt-0.5 flex-shrink-0" />
                        <span>Hierarchical configuration service</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-pink mt-0.5 flex-shrink-0" />
                        <span>Secure plugin registration with validation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-pink mt-0.5 flex-shrink-0" />
                        <span>Initial Admin Console backend</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                      <pre className="text-slate-300 text-sm">
{`# Example trait checking
if not trait_engine.compatible(
    user.traits, plugin.traits
):
    raise PermissionError(
        "User cannot access plugin"
    )`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-pink/10 to-magenta/10 border border-pink/30 rounded-2xl">
                      <p className="text-slate-200 font-medium">
                        <strong>Outcome:</strong> Functional platform with real auth and trait-based access control
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phase 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple to-deep grid place-items-center">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-purple mb-2">Inter-Plugin Communication Backbone</h3>
                    <p className="text-slate-400">Event bus, RPC gateway, and policy enforcement</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-sky mb-4">Communication Lanes</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-sky mt-2 flex-shrink-0"></div>
                        <span><strong>Canonical Lane:</strong> NATS/Redis event bus with policy filtering</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-pink mt-2 flex-shrink-0"></div>
                        <span><strong>Operator Lane:</strong> RPC gateway with auth and audit</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-purple mt-2 flex-shrink-0"></div>
                        <span><strong>Proxy Lane:</strong> Sandboxed external API gateway</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-pink mb-4">End-to-End Demo</h4>
                    <div className="bg-slate-900/70 rounded-2xl p-4 mb-4">
                      <pre className="text-slate-300 text-sm">
{`UserManagement → UserCreated event
     ↓ (canonical lane)
EmailGateway → get_user_info call
     ↓ (operator lane)  
Identity → user details
     ↓
EmailGateway → send welcome email`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple/10 to-deep/10 border border-purple/30 rounded-2xl">
                      <p className="text-slate-200 font-medium">
                        <strong>Outcome:</strong> Two plugins communicating through core with full audit trail
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phase 4 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 grid place-items-center">
                    <span className="text-white font-bold text-2xl">4</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-green-400 mb-2">Security Hardening & Advanced Features</h3>
                    <p className="text-slate-400">Production-ready compliance and full Admin Console</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-sky mb-4">Security Features</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Fine-grained access control</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Comprehensive audit logging</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Container sandboxing review</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Network segmentation</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-pink mb-4">Admin Console</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Complete user management UI</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Plugin management interface</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Code className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Configuration management</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span>Audit logs viewer</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-400/30 rounded-2xl">
                  <p className="text-slate-200 font-medium">
                    <strong>Outcome:</strong> Production-hardened platform with full GUI management capabilities
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phase 5 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 grid place-items-center">
                    <span className="text-white font-bold text-2xl">5</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-yellow-400 mb-2">Developer Tools & Plugin Ecosystem</h3>
                    <p className="text-slate-400">Complete SDK, CLI tools, and reference implementations</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-sky mb-4">Developer Experience</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <Code className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>Multi-language SDKs (Python, Node.js, Go)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Code className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>Vivified CLI with plugin generation</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>Manifest validation tools</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>Testing and dev environments</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-pink mb-4">Reference Plugins</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>Email Gateway Plugin (full implementation)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>User Management Plugin (domain logic example)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <GitBranch className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>Complete documentation and examples</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6 bg-slate-900/70 rounded-2xl p-4">
                      <pre className="text-slate-300 text-sm">
{`vivified create-plugin \\
  --type communication \\
  --name my-domain \\
  --language python

# Complete scaffold generated
# Ready for your business logic`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl">
                  <p className="text-slate-200 font-medium text-center">
                    <strong>Final Outcome:</strong> Vivified Platform v1.0 - Complete enterprise kernel with plugin ecosystem
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Timeline Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-sky/10 to-ocean/10 border border-sky/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink to-sky bg-clip-text text-transparent">
                Development Timeline
              </h3>
              <div className="grid md:grid-cols-5 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-sky mb-2" />
                  <span className="text-slate-300 font-medium">Phase 1</span>
                  <span className="text-slate-400 text-sm">2-3 weeks</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-pink mb-2" />
                  <span className="text-slate-300 font-medium">Phase 2</span>
                  <span className="text-slate-400 text-sm">4-6 weeks</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-purple mb-2" />
                  <span className="text-slate-300 font-medium">Phase 3</span>
                  <span className="text-slate-400 text-sm">6-8 weeks</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-green-400 mb-2" />
                  <span className="text-slate-300 font-medium">Phase 4</span>
                  <span className="text-slate-400 text-sm">4-6 weeks</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-yellow-400 mb-2" />
                  <span className="text-slate-300 font-medium">Phase 5</span>
                  <span className="text-slate-400 text-sm">3-4 weeks</span>
                </div>
              </div>
              <p className="text-lg text-slate-200 font-medium">
                <strong>Total Timeline:</strong> 19-27 weeks to production-ready v1.0
              </p>
              <p className="text-slate-300 mt-4">
                Each phase delivers working software that validates the architecture and provides immediate value.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
