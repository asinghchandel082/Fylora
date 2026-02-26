import { useCallback, useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onFilesSelected: (files: File[]) => void;
  files: File[];
  onRemoveFile: (index: number) => void;
}

const FileUploader = ({
  accept = ".pdf",
  multiple = false,
  maxSizeMB = 50,
  onFilesSelected,
  files,
  onRemoveFile,
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = useCallback(
    (fileList: FileList | File[]) => {
      const arr = Array.from(fileList);
      const maxBytes = maxSizeMB * 1024 * 1024;
      const valid: File[] = [];
      for (const f of arr) {
        if (f.size > maxBytes) {
          setError(`"${f.name}" exceeds ${maxSizeMB}MB limit`);
          return [];
        }
        valid.push(f);
      }
      setError(null);
      return valid;
    },
    [maxSizeMB]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const valid = validateFiles(e.dataTransfer.files);
      if (valid.length) onFilesSelected(valid);
    },
    [validateFiles, onFilesSelected]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const valid = validateFiles(e.target.files);
      if (valid.length) onFilesSelected(valid);
      e.target.value = "";
    },
    [validateFiles, onFilesSelected]
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        animate={{
          borderColor: isDragging ? "var(--primary)" : "var(--border)",
          backgroundColor: isDragging ? "hsl(var(--primary) / 0.05)" : "hsl(var(--muted) / 0.3)",
        }}
        transition={{ duration: 0.2 }}
        className="relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        <motion.div
          animate={{ y: isDragging ? -5 : 0, scale: isDragging ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-background shadow-sm border border-border"
        >
          <Upload className={`h-8 w-8 transition-colors duration-300 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
        </motion.div>

        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          {isDragging ? "Drop your files now" : "Select files to process"}
        </h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop or <span className="text-primary font-medium hover:underline">browse</span> your device.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-4 font-mono font-medium tracking-wider uppercase">
          {accept.replace(/\./g, "")} up to {maxSizeMB}MB
        </p>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-destructive font-medium bg-destructive/10 px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <X className="h-4 w-4" /> {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {files.map((file, i) => (
          <motion.div
            layout
            key={file.name + i}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-card p-4 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onRemoveFile(i); }}
              className="p-2 mr-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;
