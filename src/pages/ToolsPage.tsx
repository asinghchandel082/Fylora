import { motion } from "framer-motion";
import { tools } from "@/lib/tools";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";

const categories = [
  { key: "core", label: "Core Tools" },
  { key: "convert", label: "Conversion" },
  { key: "advanced", label: "Advanced" },
] as const;

const ToolsPage = () => (
  <Layout>
    <div className="container py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">All PDF Tools</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Free, private tools for every PDF task. Pick one to get started.
        </p>
      </motion.div>

      {categories.map(cat => {
        const catTools = tools.filter(t => t.category === cat.key);
        if (!catTools.length) return null;
        return (
          <div key={cat.key} className="mb-12">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">{cat.label}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {catTools.map((tool, i) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </Layout>
);

export default ToolsPage;
