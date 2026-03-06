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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

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
        control,
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
        <ScrollArea className="h-full w-full rounded-md pb-4 pt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 p-6 px-8 h-full">
                {/* Personal Details Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-display">Personal Details</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>
                </div>

                {/* Project Details Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-display">Project Details</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <div className="space-y-6 flex-1 flex flex-col">
                        <div className="space-y-2 relative z-[60]">
                            <Label htmlFor="service" className="text-foreground">Service of Interest</Label>
                            <Controller
                                control={control}
                                name="service"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full bg-muted/50 border-white/10 h-12">
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[100] bg-background border-white/10">
                                            <SelectItem value="web_development">Web Development</SelectItem>
                                            <SelectItem value="cms_development">CMS Development</SelectItem>
                                            <SelectItem value="seo">SEO</SelectItem>
                                            <SelectItem value="digital_marketing">Digital Marketing</SelectItem>
                                            <SelectItem value="graphic_designing">Graphic Designing</SelectItem>
                                            <SelectItem value="ui_ux">UI/UX Designing</SelectItem>
                                            <SelectItem value="data_analytics">Data Analytics / Dashboards</SelectItem>
                                            <SelectItem value="ai_agent">AI Agent Development</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-2 flex-1">
                            <Label htmlFor="message" className="text-foreground">Message <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="message"
                                placeholder="Tell us about your project or how we can help you..."
                                className="min-h-[160px] bg-muted/50 border-white/10 focus-visible:ring-primary resize-y"
                                {...register("message")}
                            />
                            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 rounded-xl fylora-gradient-bg border-none hover:scale-[1.02] transition-transform duration-300 text-white shadow-lg shadow-primary/25 font-semibold text-lg"
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
                </div>
            </form>
        </ScrollArea>
    );
}
