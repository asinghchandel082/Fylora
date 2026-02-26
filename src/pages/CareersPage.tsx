import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const CareersPage = () => {
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
                            Careers
                        </h1>
                        <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-xl text-foreground font-medium mb-8">
                            We are building Fylora with a small, focused team that values
                            quality, privacy, and long-term thinking.
                        </p>
                        <p>
                            There are no open roles at the moment. However, if you care deeply
                            about building thoughtful software and privacy-first products, we
                            would love to hear from you.
                        </p>
                        <div className="mt-8 p-6 bg-card border border-border shadow-sm rounded-2xl flex items-center justify-between">
                            <div>
                                <h3 className="text-foreground font-semibold mb-1">Get in touch</h3>
                                <p className="text-sm">Reach out to us directly:</p>
                            </div>
                            <a href="mailto:careers@betatesting" className="font-medium text-primary hover:underline">
                                careers@betatesting
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default CareersPage;
