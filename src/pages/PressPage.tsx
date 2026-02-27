import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const PressPage = () => {
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
                            Press & Media
                        </h1>
                        <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-xl text-foreground font-medium mb-8">
                            Everything you need to write about Fylora.
                        </p>
                        <p>
                            Fylora is a privacy-first web application designed to handle PDF manipulation
                            entirely within the user's browser. Our mission is to provide fast, reliable,
                            and secure document tools without the need for server uploads or subscriptions.
                        </p>

                        <h3 className="text-foreground">Brand Assets</h3>
                        <p>
                            Please download our official brand kit for high-resolution logos, brand guidelines, and product screenshots.
                            Our primary color is Bright Blue (#2487FB) and our Display font is Outfit.
                        </p>

                        <div className="p-6 bg-card border border-border mt-8 shadow-sm rounded-2xl flex items-center justify-between">
                            <div>
                                <h3 className="text-foreground font-semibold mb-1">Media Inquiries</h3>
                                <p className="text-sm m-0">For interviews, quotes, or further resources:</p>
                            </div>
                            <a href="mailto:fyloratech@gmail.com" className="font-medium text-primary hover:underline">
                                fyloratech@gmail.com
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default PressPage;
