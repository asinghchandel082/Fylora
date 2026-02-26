import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const TermsPage = () => {
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
                            Terms of Service
                        </h1>
                        <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
                        <p className="text-sm text-muted-foreground pt-2">Last updated: Oct 2026</p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-xl text-foreground font-medium mb-8">
                            By using Fylora, you agree to use the service responsibly and lawfully.
                        </p>

                        <h3 className="text-foreground">Warranties & Liability</h3>
                        <p>
                            Fylora is provided on an 'as-is' basis without warranties of any
                            kind. We are not responsible for damages resulting from misuse of
                            the service or uploaded content.
                        </p>

                        <h3 className="text-foreground">User Responsibilities</h3>
                        <p>
                            Users are responsible for ensuring they have the right to upload
                            and process any files on our platform. Fylora does not monitor
                            or take responsibility for the files themselves.
                        </p>

                        <h3 className="text-foreground">Changes to Terms</h3>
                        <p>
                            We reserve the right to update these terms as the service evolves.
                            Continued usage implies informed consent of the current definitions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default TermsPage;
