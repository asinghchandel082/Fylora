import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Tool } from "@/lib/tools";

const ToolCard = ({ tool }: { tool: Tool }) => {
  const Icon = tool.icon;
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={`/tool/${tool.id}`}
        className="group relative flex flex-col p-6 rounded-3xl bg-card border border-white/5 shadow-sm hover:shadow-2xl transition-all duration-400 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
          <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        </div>

        <h3 className="relative font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{tool.name}</h3>
        <p className="relative text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
