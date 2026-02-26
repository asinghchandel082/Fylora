import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const AboutPage = () => {
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
              About Fylora
            </h1>
            <div className="h-1 w-20 fylora-gradient-bg rounded-full"></div>
          </div>

          <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary max-w-none text-muted-foreground leading-relaxed">
            <p className="text-xl text-foreground font-medium mb-8">
              Fylora was created to make working with files effortless.
            </p>
            <p>
              We believe everyday tools should be fast, intuitive, and respectful
              of user privacy. Instead of overwhelming users with unnecessary
              complexity, Fylora focuses on clarity, performance, and trust.
            </p>
            <p>
              Our goal is to build a reliable platform for individuals, professionals,
              and teams who work with documents daily.
            </p>
            <p>
              Fylora is continuously evolving, guided by real user needs and
              thoughtful product design.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;
