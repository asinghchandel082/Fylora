import { Link } from "react-router-dom";
import type { Tool } from "@/lib/tools";

const ToolCard = ({ tool }: { tool: Tool }) => {
  const Icon = tool.icon;
  return (
    <Link
      to={`/${tool.id}`}
      className="group relative flex flex-col p-5 rounded-2xl bg-card border border-white/5 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-200 ease-out overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

      <div className="relative mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200 ease-out">
        <Icon className="h-5 w-5 transition-transform duration-200 ease-out group-hover:scale-105 group-hover:-rotate-3" />
      </div>

      <h3 className="relative font-display text-lg font-semibold text-foreground tracking-tight mb-1.5 group-hover:text-primary transition-colors duration-200 ease-out">{tool.name}</h3>
      <p className="relative text-[13px] text-muted-foreground/80 leading-relaxed font-normal">{tool.description}</p>
    </Link>
  );
};

export default ToolCard;
