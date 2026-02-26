import { FileText, Scissors, Minimize2, Image, ImagePlus, RotateCw, ArrowUpDown, Droplets, Lock, Unlock, FileType, FileCode, ScanSearch, Highlighter, EyeOff } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "core" | "convert" | "advanced";
  color: string;
}

export const tools: Tool[] = [
  { id: "merge", name: "Merge PDF", description: "Combine multiple PDFs into one document", icon: FileText, category: "core", color: "bg-primary" },
  { id: "split", name: "Split PDF", description: "Extract pages or split into separate files", icon: Scissors, category: "core", color: "bg-primary" },
  { id: "compress", name: "Compress PDF", description: "Reduce file size while maintaining quality", icon: Minimize2, category: "core", color: "bg-primary" },
  { id: "pdf-to-image", name: "PDF to Image", description: "Convert PDF pages to high-quality images", icon: Image, category: "convert", color: "bg-primary" },
  { id: "image-to-pdf", name: "Image to PDF", description: "Create PDF from images", icon: ImagePlus, category: "convert", color: "bg-primary" },
  { id: "rotate", name: "Rotate PDF", description: "Rotate pages in any direction", icon: RotateCw, category: "core", color: "bg-primary" },
  { id: "reorder", name: "Reorder Pages", description: "Drag and drop to rearrange pages", icon: ArrowUpDown, category: "core", color: "bg-primary" },
  { id: "watermark", name: "Add Watermark", description: "Add text or image watermarks", icon: Droplets, category: "core", color: "bg-primary" },
  { id: "protect", name: "Protect PDF", description: "Add password protection to your PDF", icon: Lock, category: "core", color: "bg-primary" },
  { id: "unlock", name: "Unlock PDF", description: "Remove password from protected PDFs", icon: Unlock, category: "core", color: "bg-primary" },
  { id: "pdf-to-txt", name: "PDF to Text", description: "Extract plain text from PDF files", icon: FileType, category: "convert", color: "bg-primary" },
  { id: "pdf-to-md", name: "PDF to Markdown", description: "Convert PDF content to Markdown", icon: FileCode, category: "convert", color: "bg-primary" },
  { id: "ocr", name: "OCR Extract", description: "Extract text from scanned documents", icon: ScanSearch, category: "advanced", color: "bg-primary" },
  { id: "annotate", name: "Annotate PDF", description: "Add highlights, underlines, and comments", icon: Highlighter, category: "advanced", color: "bg-primary" },
  { id: "redact", name: "Redact PDF", description: "Permanently remove sensitive content", icon: EyeOff, category: "advanced", color: "bg-primary" },
];

export const getToolById = (id: string) => tools.find(t => t.id === id);
