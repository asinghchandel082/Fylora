import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const FeatureRequestPage = () => {
    return (
        <Layout>
            <div className="container max-w-3xl py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Request a Feature
                        </h1>
                        <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-xl text-foreground font-medium mb-8">
                            Help us shape the future of Fylora.
                        </p>
                        <p>
                            We are constantly looking for ways to improve our PDF toolkit. The best ideas come directly from our users who work with documents every single day.
                        </p>

                        <div className="bg-card border border-border shadow-sm rounded-2xl p-8 mt-10 not-prose">
                            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-sm font-semibold text-foreground mb-2 block">What tool or feature are you looking for?</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. PDF to Word Conversion"
                                        className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground mb-2 block">How would this help your workflow?</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us a little about your use case..."
                                        className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow resize-none"
                                    ></textarea>
                                </div>
                                <Button size="lg" className="w-full fylora-gradient-bg text-white shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Submit Request
                                </Button>
                            </form>
                        </div>

                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default FeatureRequestPage;
