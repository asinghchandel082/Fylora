import { useState } from "react";
import { X, Star, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    toolName: string;
}

const ReviewModal = ({ isOpen, onClose, toolName }: ReviewModalProps) => {
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) return;

        setIsSubmitting(true);

        try {
            if (db) {
                await addDoc(collection(db, "reviews"), {
                    rating,
                    comment: comment.slice(0, 150).replace(/</g, "&lt;").replace(/>/g, "&gt;"), // Basic sanitization
                    tool: toolName,
                    created_at: serverTimestamp(),
                    approved: rating >= 3,
                    source: "post_download"
                });
            }

            // Track GA4 Event
            if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
                window.gtag("event", "review_submitted", {
                    rating: rating,
                    tool_name: toolName
                });
            }

            setSubmitted(true);
            setTimeout(() => onClose(), 2000);
        } catch (e) {
            console.error("Failed to submit review", e);
            // Fail silently and close so as not to block user flow
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && !submitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card p-8 shadow-2xl relative z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-6 top-6 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="text-center">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-2">How did we do?</h2>
                            <p className="text-muted-foreground mb-8">
                                Your feedback helps us keep Fylora free and fast.
                            </p>

                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        onClick={() => setRating(star)}
                                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            className={`h-10 w-10 transition-colors ${star <= (hoveredRating || rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-transparent text-muted-foreground/30"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="mb-6 text-left">
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    Anything else to add? <span className="text-muted-foreground font-normal">(Optional)</span>
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value.slice(0, 150))}
                                    placeholder="Tell us what you loved or how we can improve..."
                                    className="w-full resize-none rounded-xl border border-input bg-background/50 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[100px]"
                                    maxLength={150}
                                />
                                <div className="mt-1 text-right text-xs text-muted-foreground">
                                    {comment.length}/150
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 rounded-xl border border-input bg-transparent py-3 font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={rating === 0 || isSubmitting}
                                    className="flex-1 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                                >
                                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {isOpen && submitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative z-10 rounded-3xl border border-white/10 bg-card p-10 text-center shadow-2xl max-w-sm w-full"
                    >
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                            <Star className="h-8 w-8 fill-green-500 text-green-500" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">Thank You!</h3>
                        <p className="text-muted-foreground">Your feedback is incredible.</p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReviewModal;
