import { useParams, Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { ArrowLeft, Download, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Layout from "@/components/Layout";
import FileUploader from "@/components/FileUploader";
import PrivacyBadge from "@/components/PrivacyBadge";
import { Button } from "@/components/ui/button";
import { getToolById } from "@/lib/tools";
import { processPdf } from "@/lib/pdf-processor";

type Status = "idle" | "processing" | "done" | "error";

const ToolPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = getToolById(toolId || "");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Blob | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [options, setOptions] = useState({
    password: "",
    watermarkText: "",
    rotationAngle: 90,
    searchText: "",
    annotationType: "highlight",
    compressLevel: "balanced",
  });

  const needsMultiple = toolId === "merge" || toolId === "image-to-pdf";
  const needsPassword = toolId === "protect" || toolId === "unlock";
  const needsWatermark = toolId === "watermark";
  const needsRotate = toolId === "rotate";
  const needsAnnotate = toolId === "annotate";
  const needsCompress = toolId === "compress";

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(prev => needsMultiple ? [...prev, ...newFiles] : newFiles);
    setStatus("idle");
    setResult(null);
  }, [needsMultiple]);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files.length || !toolId) return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const blob = await processPdf(toolId, files, options);
      setResult(blob);
      setStatus("done");

      // Trigger confetti on success
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Processing failed");
      setStatus("error");
    }
  }, [files, toolId, options]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement("a");
    a.href = url;

    let extension = "pdf";
    if (result.type === "application/zip" || toolId === "split" || toolId === "pdf-to-image") {
      extension = "zip";
    } else if (result.type === "text/plain") {
      extension = "txt";
    } else if (result.type === "text/markdown") {
      extension = "md";
    }

    a.download = `fylora-${toolId}-result.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, toolId]);

  if (!tool) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Tool not found</h1>
          <Button asChild variant="outline"><Link to="/tools">Back to tools</Link></Button>
        </div>
      </Layout>
    );
  }

  const Icon = tool.icon;

  return (
    <Layout>
      <div className="container max-w-3xl py-12 md:py-20">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Tools
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shrink-0 relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Icon className="h-8 w-8 relative z-10" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{tool.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{tool.description}</p>
            </div>
          </div>

          <PrivacyBadge className="mb-10 inline-flex" />

          <FileUploader
            accept={toolId === "image-to-pdf" ? ".png,.jpg,.jpeg" : ".pdf"}
            multiple={needsMultiple}
            onFilesSelected={handleFilesSelected}
            files={files}
            onRemoveFile={handleRemoveFile}
          />

          <div className="space-y-6 mt-8">
            {needsPassword && files.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-6 rounded-2xl bg-card border border-white/5 shadow-sm">
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  {toolId === "protect" ? "Set Password" : "Enter Password"}
                </label>
                <input
                  type="password"
                  value={options.password}
                  onChange={e => setOptions({ ...options, password: e.target.value })}
                  placeholder="Enter password…"
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                />
              </motion.div>
            )}

            {needsWatermark && files.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-6 rounded-2xl bg-card border border-white/5 shadow-sm">
                <label className="text-sm font-semibold text-foreground mb-2 block">Watermark Text</label>
                <input
                  type="text"
                  value={options.watermarkText}
                  onChange={e => setOptions({ ...options, watermarkText: e.target.value })}
                  placeholder="e.g. CONFIDENTIAL"
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                />
              </motion.div>
            )}

            {needsRotate && files.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-6 rounded-2xl bg-card border border-white/5 shadow-sm">
                <label className="text-sm font-semibold text-foreground mb-2 block">Rotation Angle</label>
                <select
                  value={options.rotationAngle}
                  onChange={e => setOptions({ ...options, rotationAngle: Number(e.target.value) })}
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow cursor-pointer"
                >
                  <option value={90}>90° Clockwise</option>
                  <option value={180}>180°</option>
                  <option value={270}>270° Clockwise</option>
                </select>
              </motion.div>
            )}

            {needsCompress && files.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-6 rounded-2xl bg-card border border-white/5 shadow-sm">
                <label className="text-sm font-semibold text-foreground mb-2 block">Compression Level</label>
                <select
                  value={options.compressLevel}
                  onChange={e => setOptions({ ...options, compressLevel: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow cursor-pointer"
                >
                  <option value="low">Low (Fastest, Larger File)</option>
                  <option value="balanced">Balanced (Recommended)</option>
                  <option value="high">High (Maximum Compression)</option>
                </select>
              </motion.div>
            )}

            {needsAnnotate && files.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-6 rounded-2xl bg-card border border-white/5 shadow-sm space-y-5">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Text to Find & Annotate</label>
                  <input
                    type="text"
                    value={options.searchText}
                    onChange={e => setOptions({ ...options, searchText: e.target.value })}
                    placeholder="e.g. Important Details"
                    className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Annotation Style</label>
                  <select
                    value={options.annotationType}
                    onChange={e => setOptions({ ...options, annotationType: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow cursor-pointer"
                  >
                    <option value="highlight">Yellow Highlight</option>
                    <option value="underline">Red Underline</option>
                    <option value="comment">Add Text Comment</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>

          {files.length > 0 && status !== "done" && (
            <Button
              onClick={handleProcess}
              disabled={
                status === "processing" ||
                (needsPassword && !options.password) ||
                (needsWatermark && !options.watermarkText) ||
                (needsAnnotate && !options.searchText) ||
                (needsCompress && !options.compressLevel)
              }
              className="mt-8 w-full h-14 rounded-xl fylora-gradient-bg text-white shadow-lg shadow-primary/25 relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              size="lg"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center text-lg font-semibold tracking-wide">
                {status === "processing" ? (
                  <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Processing heavily…</>
                ) : (
                  <>{tool.name}</>
                )}
              </span>
            </Button>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm text-destructive font-medium">{errorMsg}</p>
          )}

          {status === "done" && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-10 rounded-3xl border border-white/10 bg-card p-10 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 fylora-gradient-bg opacity-5 pointer-events-none" />
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
                className="mx-auto h-20 w-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Success!</h2>
              <p className="text-base text-muted-foreground mb-8">Your file has been processed perfectly and is ready for download.</p>
              <Button onClick={handleDownload} size="lg" className="h-14 px-10 rounded-full fylora-gradient-bg text-white shadow-lg shadow-primary/30 hover:scale-105 transition-transform duration-300 text-lg font-medium">
                <Download className="mr-2 h-5 w-5" /> Download Result
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      {/* Full-screen Minimalist Loading Overlay for UX */}
      <AnimatePresence>
        {status === "processing" && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col items-center p-10 bg-card rounded-[2rem] shadow-2xl shadow-primary/10 border border-white/5 max-w-sm w-full mx-4 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                <div className="relative bg-background p-5 rounded-2xl border border-white/10 shadow-xl shadow-black/5">
                  <Loader2 className="h-10 w-10 text-primary animate-[spin_2s_linear_infinite]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-3">Processing...</h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[250px]">
                Please wait while we magically manipulate your documents entirely in your browser.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ToolPage;
