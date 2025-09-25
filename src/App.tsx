import { motion } from "framer-motion";
import { ArrowRight, Plug, Puzzle, Settings, Zap } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-sky/20 border border-sky/30 grid place-items-center">
            <Zap className="h-4 w-4 text-sky" />
          </div>
          <div className="text-xl font-extrabold tracking-tight">Vivified</div>
        </div>
        <a className="link text-sm" href="https://faxbot.net/admin-demo/" target="_blank" rel="noreferrer">See Faxbot demo</a>
      </header>

      <main className="flex-1 px-6">
        <section className="max-w-5xl mx-auto text-center pt-10 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            A living, pluggable <span className="text-sky">kernel</span> for any utility
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-slate-300 text-lg"
          >
            Compose workflows from modular plugins. API-first, with a GUI that makes everything click.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a className="btn" href="https://faxbot.net/" target="_blank" rel="noreferrer">
              Check out Faxbot <ArrowRight className="h-4 w-4" />
            </a>
            <a className="link" href="mailto:hello@vivified.dev">hello@vivified.dev</a>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 pb-16">
          <Feature icon={<Plug className="h-5 w-5" />} title="Plugin Kernel" text="Drop-in modules across languages, stitched by a tiny core." />
          <Feature icon={<Puzzle className="h-5 w-5" />} title="Composable" text="Mix, match, and evolve without refactoring your world." />
          <Feature icon={<Settings className="h-5 w-5" />} title="GUI-First" text="Configure visually, command-line when you want it." />
        </section>

        <section className="max-w-5xl mx-auto pb-20">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-2">Coming soon</h2>
            <p className="text-slate-300">
              We’re building <span className="font-semibold">Vivified</span> in the open. For now, explore how we think via{" "}
              <a href="https://faxbot.net/admin-demo/" className="link" target="_blank" rel="noreferrer">Faxbot’s Admin Demo</a>.
            </p>
          </div>
        </section>
      </main>

      <footer className="px-6 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Vivified. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card p-5"
    >
      <div className="flex items-center gap-2 text-sky mb-2">{icon}<span className="font-semibold">{title}</span></div>
      <div className="text-slate-300 text-sm">{text}</div>
    </motion.div>
  );
}
