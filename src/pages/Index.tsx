import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import { tools } from "@/lib/tools";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, title: "Privacy First", description: "Files are processed and deleted automatically. We never store or read your content." },
  { icon: Zap, title: "Lightning Fast", description: "Client-side processing means your files never leave your browser when possible." }
];

const Index = () => {
  const featuredTools = tools.slice(0, 8);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
        {/* Animated Glow Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] opacity-50 mix-blend-screen pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/3 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none animate-[pulse_10s_ease-in-out_infinite_reverse]" />

        <div className="absolute inset-0 bg-[image:var(--fylora-gradient-soft)] opacity-40 dark:opacity-20" />

        <div className="relative container py-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border shadow-sm text-sm font-medium mb-8"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
                100% Private & Client-Side
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Every PDF tool, <br className="hidden md:block" />
              <span className="fylora-gradient-text">Beautifully Private.</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Merge, split, compress, convert, and protect. The fastest PDF studio that never uploads your files to a server.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="h-14 px-8 rounded-full fylora-gradient-bg fylora-shadow-primary text-white font-medium text-lg hover:scale-105 transition-transform duration-300">
                <Link to="/tools">
                  Explore Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full font-medium text-lg border-2 hover:bg-muted/50 transition-colors">
                <Link to="/about">How it works</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              className="text-left p-8 rounded-3xl bg-card border border-white/5 shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="container pb-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Popular Tools</h2>
          <p className="text-muted-foreground">Get started with our most-used PDF tools</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link to="/tools">View All {tools.length} Tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
