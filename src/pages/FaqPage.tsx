import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const FaqPage = () => {
    const faqs = [
        {
            q: "Are my files stored on your servers?",
            a: "No. All PDF processing happens entirely within your web browser using WebAssembly and JavaScript. Your files are never uploaded to our servers, ensuring total privacy."
        },
        {
            q: "Is Fylora really free?",
            a: "Yes. Our core suite of PDF manipulation tools is completely free to use without limits or watermarks. We believe basic document utilities should be accessible to everyone."
        },
        {
            q: "Why did a tool fail to process my PDF?",
            a: "Sometimes PDFs can be heavily encrypted or corrupted. If a tool fails, it's usually because the browser engine couldn't parse the file structure. Ensure your PDF is standard and not DRM-protected."
        },
        {
            q: "Can I use Fylora offline?",
            a: "Because our tools run entirely in your local browser, once the page loads, you can theoretically disconnect from the internet and still merge, split, and edit your documents!"
        }
    ];

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
                            Help & FAQ
                        </h1>
                        <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-xl text-foreground font-medium mb-12">
                            Common questions about privacy, usage, and capability.
                        </p>

                        <div className="space-y-8 md:space-y-12">
                            {faqs.map((faq, i) => (
                                <div key={i}>
                                    <h3 className="text-foreground text-xl font-semibold mb-2">{faq.q}</h3>
                                    <p className="m-0 text-muted-foreground">{faq.a}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 pt-8 border-t border-border">
                            <p>
                                Still have questions? We're here to help. <br />
                                <a href="mailto:support@betatesting" className="font-medium text-primary hover:underline">Contact Support</a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default FaqPage;
