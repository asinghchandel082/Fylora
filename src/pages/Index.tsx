import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Zap, Lock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { tools } from "@/lib/tools";
import Layout from "@/components/Layout";
import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";

const ToolCard = React.lazy(() => import("@/components/ToolCard"));

const features = [
  { icon: Shield, title: "Privacy First", description: "Files are processed and deleted automatically. We never store or read your content." },
  { icon: Zap, title: "Lightning Fast", description: "Client-side processing means your files never leave your browser when possible." }
];

const Index = () => {
  const featuredToolIds = ["merge-pdf", "split-pdf", "compress-pdf", "word-to-pdf", "pdf-to-word-alias", "jpg-to-pdf-alias", "protect-pdf", "repair-pdf"];
  const featuredTools = featuredToolIds.map(id => tools.find(t => t.id === id)).filter(Boolean);
  const [reviewIndex, setReviewIndex] = useState(0);

  useSeo({
    title: "Fylora | Free Online PDF Tools – Merge, Split, Compress & More",
    description: "Free online PDF tools. Merge, split, compress, convert, and edit PDFs instantly. 100% private, fast, and secure. No sign-up required.",
    url: "/",
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['homepage-reviews'],
    queryFn: async () => {
      if (!db) return [];
      try {
        const q = query(
          collection(db, "reviews"),
          where("approved", "==", true)
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => doc.data() as { rating: number; comment?: string; tool?: string; created_at?: any });

        const validDocs = docs
          .filter(d => d.rating > 3)
          .sort((a, b) => {
            const timeA = a.created_at?.seconds || 0;
            const timeB = b.created_at?.seconds || 0;
            return timeB - timeA;
          });

        return validDocs.slice(0, 9);
      } catch (e) {
        console.error("Reviews fetch failed", e);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-32 md:pb-32 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] opacity-50 mix-blend-screen pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/3 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 bg-[image:var(--fylora-gradient-soft)] opacity-40 dark:opacity-20" />
        <div className="relative container z-10 max-w-5xl mx-auto px-6 text-center">
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
            <h1 className="font-display font-bold text-foreground leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-balance flex flex-col items-center text-center">
              <span>Free Online PDF Tools</span>
              <span className="block w-full text-center fylora-gradient-text mt-1 sm:mt-2">
                Fast & Ad-Free
              </span>
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
      <section className="container py-16 md:py-28 relative z-20">
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
      <section className="py-20 md:py-32 bg-slate-50/50 dark:bg-slate-900/20 border-y border-border/40">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Popular Tools</h2>
            <p className="text-muted-foreground text-lg">Get started with our most-used PDF tools</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Suspense fallback={<div className="h-48 w-full bg-muted/20 animate-pulse rounded-3xl" />}>
                  <ToolCard tool={tool} />
                </Suspense>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/tools">View All {tools.length} Tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* User Reviews */}
      {reviews.length > 0 && (
        <section className="py-20 md:py-32 bg-background">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Loved by Users</h2>
              <p className="text-muted-foreground text-lg">Hear what our community says about Fylora.</p>
            </div>
            <div className="relative max-w-6xl mx-auto px-12 sm:px-16">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hidden sm:flex hover:bg-white/10 transition-colors"
                onClick={() => setReviewIndex(prev => Math.max(0, prev - 1))}
                disabled={reviewIndex === 0}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="overflow-hidden py-4">
                <motion.div
                  className="flex gap-4 sm:gap-6"
                  initial={false}
                  animate={{ x: `calc(-${reviewIndex * 100}% - ${reviewIndex * (typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 1.5)}rem)` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    const isMobile = window.innerWidth < 640;
                    const maxIdx = Math.max(0, reviews.length - (isMobile ? 1 : 3));
                    if (offset.x < -50 && reviewIndex < maxIdx) {
                      setReviewIndex(prev => prev + 1);
                    } else if (offset.x > 50 && reviewIndex > 0) {
                      setReviewIndex(prev => prev - 1);
                    }
                  }}
                >
                  {reviews.map((r, i) => (
                    <div key={i} className="w-full sm:w-[calc(33.333%-1rem)] flex-shrink-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-3xl bg-card border border-white/5 shadow-sm text-left flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className={`h-4 w-4 ${idx < r.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-muted-foreground/30'}`} />
                            ))}
                          </div>
                          <p className="text-foreground leading-relaxed italic">
                            "{r.comment && r.comment.trim().length > 0 ? r.comment : "Great experience, highly recommended!"}"
                          </p>
                        </div>
                        {r.tool && <p className="text-xs font-bold text-primary mt-6 tracking-widest uppercase opacity-80">{r.tool.replace(/-/g, " ")}</p>}
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hidden sm:flex hover:bg-white/10 transition-colors"
                onClick={() => setReviewIndex(prev => Math.min(Math.max(0, reviews.length - 3), prev + 1))}
                disabled={reviewIndex >= reviews.length - 3 || reviews.length <= 3}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="flex sm:hidden justify-center gap-2 mt-6">
                {Array.from({ length: reviews.length }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${i === reviewIndex ? 'w-6 bg-primary' : 'w-2 bg-muted'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section */}
      <section className="py-20 md:py-32 bg-muted/20 border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">What is Fylora? Your Fast, Private PDF Toolkit</h2>
            <p className="text-muted-foreground leading-loose mb-8 text-lg font-light">
              Fylora is a modern, free online PDF studio designed to help students, creators, and professionals manage their documents effortlessly. We built Fylora because we were tired of online PDF converters that flooded our screens with intrusive ads, forced sign-ups, and questionable privacy policies. We believe that editing, converting, and compressing your sensitive documents should be an ad-free, secure, and lightning-fast experience.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Unlike traditional cloud-based services that demand you wait for uploads to finish, Fylora runs directly in your browser. This means you skip the line. Instantly access the tools you need and get your work done faster than ever before.
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Comprehensive Features for Every Need</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our platform is organized to provide a complete suite of document utilities right away:
            </p>
            <ul className="list-disc pl-6 mb-10 text-muted-foreground space-y-2">
              <li><strong>PDF Tools:</strong> Merge multiple reports into a single file, split large ebooks into chapters, compress oversized portfolios for email, and organize pages seamlessly.</li>
              <li><strong>Text & OCR:</strong> Extract text from scanned documents accurately without buying expensive software. Instantly pull data out of receipts and invoices.</li>
              <li><strong>Image Utilities:</strong> Convert your PDFs to JPGs or PNG formats, extract embedded images, and compress photos down to shareable sizes.</li>
              <li><strong>Security:</strong> Add passwords to restrict access, apply watermarks to protect your intellectual property, or remove annoying restrictions from PDFs you already own.</li>
            </ul>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Why Fylora is Different: Security & Privacy First</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When you use a generic online PDF editor, your highly sensitive documents—such as tax returns, legal contracts, or confidential business proposals—are uploaded to remote servers. This introduces a massive privacy vulnerability. Fylora is built differently. We utilize cutting-edge WebAssembly (Wasm) and client-side processing technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              <strong>What does this mean for you?</strong> It means your files never leave your device. The heavy lifting—whether you are merging a 500-page manuscript or applying OCR to a blurry scan—happens utilizing your computer's own processing power. Because we don't upload your data to our servers, we couldn't read your files even if we wanted to. No uploads, no downloads, and absolutely no data retention.
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Who is Fylora Built For?</h3>
            <div className="grid sm:grid-cols-3 gap-6 mb-8 mt-6">
              <div className="p-6 bg-card border border-white/5 rounded-2xl shadow-sm">
                <h4 className="font-bold text-primary mb-2">Students & Educators</h4>
                <p className="text-sm text-muted-foreground">Easily combine class notes, compress thick textbook PDFs, and extract assignment text without hitting paywalls.</p>
              </div>
              <div className="p-6 bg-card border border-white/5 rounded-2xl shadow-sm">
                <h4 className="font-bold text-primary mb-2">Professionals</h4>
                <p className="text-sm text-muted-foreground">Securely password-protect invoices or watermark confidential client proposals on the fly before sending.</p>
              </div>
              <div className="p-6 bg-card border border-white/5 rounded-2xl shadow-sm">
                <h4 className="font-bold text-primary mb-2">Creators</h4>
                <p className="text-sm text-muted-foreground">Quickly extract high-quality images from moodboard PDFs and convert assets effortlessly for social media.</p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-loose text-lg font-light mt-12 text-center">
            Stop waiting for file uploads and dealing with subscription popups. Experience the fastest, most private way to manage your documents. Explore Fylora today and get your files organized right away.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
