import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";

const SecurityPage = () => {
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
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-2">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Security
                        </h1>
                        <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-xl text-foreground font-medium mb-8">
                            Security is foundational to Fylora.
                        </p>

                        <ul className="space-y-3 p-0 list-none mb-8">
                            {[
                                "Files are processed securely",
                                "Uploaded files are automatically deleted after processing",
                                "No file content is stored long-term",
                                "Industry-standard encryption is used during file handling"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 pl-0 before:hidden m-0">
                                    <div className="w-2 h-2 rounded-full mt-2.5 bg-primary shrink-0 opacity-70"></div>
                                    <span className="text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl mt-12">
                            <p className="m-0 text-foreground font-medium">
                                We design our systems with the assumption that documents may contain
                                sensitive information, and we treat them accordingly.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default SecurityPage;
