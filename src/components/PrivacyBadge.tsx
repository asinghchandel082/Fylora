import { Shield } from "lucide-react";

const PrivacyBadge = ({ className = "" }: { className?: string }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium ${className}`}>
    <Shield className="h-3.5 w-3.5" />
    <span>Your files are automatically deleted after processing</span>
  </div>
);

export default PrivacyBadge;
