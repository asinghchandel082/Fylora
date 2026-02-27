import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const RoadmapPage = () => {
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
                            Product Roadmap
                        </h1>
                        <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-xl text-foreground font-medium mb-8">
                            Fylora is actively evolving.
                        </p>
                        <p className="mb-4">Our upcoming areas of focus include:</p>

                        <ul className="space-y-3 p-0 list-none mb-8">
                            {[
                                "Smarter document workflows",
                                "Advanced OCR and AI-powered features",
                                "Batch processing and automation",
                                "Team collaboration and API access",
                                "Performance and reliability improvements"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 pl-0 before:hidden m-0">
                                    <div className="w-2 h-2 rounded-full mt-2.5 bg-primary shrink-0 opacity-70"></div>
                                    <span className="text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-8 border-t border-border">
                            <p>
                                User feedback plays a key role in shaping our roadmap.
                                Have an idea? <a href="mailto:fyloratech@gmail.com" className="font-medium text-primary hover:underline">Request a feature.</a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default RoadmapPage;
