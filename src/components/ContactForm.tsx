import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Web3Forms Access Key
const ACCESS_KEY = "7c464778-db5e-450f-a98f-d4c097903b73";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    service: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    subject: `New Contact Form Submission from ${data.name}`,
                    from_name: data.name,
                    ...data,
                }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Message sent successfully!", {
                    description: "We'll get back to you as soon as possible.",
                });
                reset();
            } else {
                throw new Error(result.message || "Failed to send message");
            }
        } catch (error: any) {
            toast.error("Something went wrong", {
                description: error.message || "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name <span className="text-red-500">*</span></Label>
                <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-muted/50 border-white/10 focus-visible:ring-primary h-12"
                    {...register("name")}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email <span className="text-red-500">*</span></Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-muted/50 border-white/10 focus-visible:ring-primary h-12"
                    {...register("email")}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="service" className="text-foreground">Service of Interest</Label>
                <Input
                    id="service"
                    placeholder="e.g., Web Development, SEO"
                    className="bg-muted/50 border-white/10 focus-visible:ring-primary h-12"
                    {...register("service")}
                />
            </div>

            <div className="space-y-2 flex-1">
                <Label htmlFor="message" className="text-foreground">Message <span className="text-red-500">*</span></Label>
                <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="min-h-[120px] h-[120px] bg-muted/50 border-white/10 focus-visible:ring-primary resize-none"
                    {...register("message")}
                />
                {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl fylora-gradient-bg border-none hover:scale-[1.02] transition-transform duration-300 text-white shadow-lg shadow-primary/25 font-semibold text-base mt-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                    </>
                ) : (
                    "Send Message"
                )}
            </Button>
        </form>
    );
}
