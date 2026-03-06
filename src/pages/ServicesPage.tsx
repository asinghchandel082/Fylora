import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const services = [
    {
        title: "Web Development",
        description: "Build modern, responsive, and blazing-fast websites tailored to your unique business needs.",
        definition: "Web development is the process of creating high-performance websites and web applications that help businesses establish a strong digital presence.",
        paragraph: "We architect custom digital experiences that blend stunning aesthetics with robust engineering. Our web development services ensure your brand not only stands out visually but operates flawlessly across all devices and browsers.",
        deliverables: [
            "Custom websites",
            "SaaS platforms",
            "Landing pages",
            "API integrations",
            "Performance optimization"
        ],
        benefits: "Fast, scalable, and SEO-friendly websites.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "CMS Development",
        description: "Custom Content Management Systems designed for scale, flexibility, and easy content updates.",
        definition: "CMS development services provide customized, scalable content management systems allowing businesses to create and modify digital content easily.",
        paragraph: "Take control of your digital narrative with our bespoke CMS development services. We build intuitive backends that empower your team to publish content rapidly without requiring deep technical knowledge, managing documents as easily as using our <a href='/tools'>free PDF tools</a>.",
        deliverables: [
            "Headless CMS architecture",
            "Custom WordPress development",
            "Content migration strategies",
            "User role management",
            "Scalable media handling"
        ],
        benefits: "Flexible, secure, and user-friendly content management.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "SEO",
        description: "Boost your search engine rankings and drive highly targeted organic traffic to your website.",
        definition: "SEO services involve optimizing your website's technical structure and content to rank higher in organic search engine results.",
        paragraph: "Our comprehensive SEO services ensure your brand captures high-intent traffic directly from search engines. We deploy proven strategies across technical SEO, content generation, and authority building to outrank your competitors. Read our <a href='/blog'>blog</a> for the latest strategies.",
        deliverables: [
            "Technical SEO audits",
            "Keyword research & targeting",
            "On-page optimization",
            "Link building campaigns",
            "Local SEO tuning"
        ],
        benefits: "Sustainable organic traffic and increased brand visibility.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Digital Marketing",
        description: "Engage your audience and maximize ROI through data-driven digital marketing strategies.",
        definition: "Digital marketing services encompass strategic online campaigns to promote brands, reach potential customers, and drive measurable conversions.",
        paragraph: "Accelerate your growth pipeline with our targeted digital marketing services. We utilize a multi-channel approach spanning paid advertising, content marketing, and email outreach to convert prospects into returning customers.",
        deliverables: [
            "PPC & Ads management",
            "Social media strategies",
            "Email marketing funnels",
            "Conversion rate optimization",
            "Campaign analytics"
        ],
        benefits: "Higher ROI, better engagement, and faster customer acquisition.",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Graphic Designing",
        description: "Create stunning visuals and strong brand identities that captivate and inspire your audience.",
        definition: "Graphic design services focus on creating compelling visual content to communicate brand identity and marketing messages effectively.",
        paragraph: "Elevate your brand's perception through our premium graphic design services. We craft bespoke visual identities that resonate with your target demographic and create lasting emotional connections.",
        deliverables: [
            "Logo & brand identity",
            "Marketing collateral",
            "Social media graphics",
            "Print design materials",
            "Typography & color systems"
        ],
        benefits: "Distinctive brand identity and professional visual presence.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "UI/UX Designing",
        description: "Design intuitive and beautiful user interfaces that deliver exceptional user experiences.",
        definition: "UI UX design services optimize digital interfaces to ensure applications are visually stunning, easy to navigate, and highly accessible.",
        paragraph: "We engineer digital products users love through our specialized UI UX design services. By combining deep user research with cutting-edge interface aesthetics, we dramatically improve product adoption and user satisfaction.",
        deliverables: [
            "Wireframing & prototyping",
            "User journey mapping",
            "High-fidelity UI design",
            "Design system creation",
            "Usability testing"
        ],
        benefits: "Higher user retention, frictionless navigation, and premium aesthetics.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Data Analytics & Dashboards",
        description: "Transform complex data into actionable insights through interactive and visual dashboards.",
        definition: "Data analytics dashboards visually consolidate complex business metrics into intuitive interfaces to enable data-driven decision making.",
        paragraph: "Unlock the hidden value in your raw data with custom data analytics dashboards. Our data engineers structure your information streams into real-time, visual reporting tools that executives can utilize instantly. We also integrate with <a href='/tools'>digital automation tools</a> to streamline data pipelines.",
        deliverables: [
            "Interactive KPI dashboards",
            "Real-time data pipelines",
            "Custom BI reporting",
            "Data warehouse integration",
            "Predictive analytics models"
        ],
        benefits: "Real-time actionable insights and streamlined reporting.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "AI Agent Development",
        description: "Automate workflows and enhance customer interactions using advanced AI automation agents.",
        definition: "AI agent development involves creating intelligent software entities capable of executing complex workflows and reasoning autonomously.",
        paragraph: "Revolutionize your operational efficiency through our AI automation development. We build and deploy intelligent agents capable of handling customer support, internal data processing, and complex multi-step reasoning, similar to the precision of our <a href='/tools'>online productivity tools</a>.",
        deliverables: [
            "Custom LLM integrations",
            "Workflow automation bots",
            "RAG-based search systems",
            "Intelligent customer support",
            "Multi-agent reasoning architectures"
        ],
        benefits: "Massive time savings, 24/7 automation, and reduced operational costs.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    }
];

export default function ServicesPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Fylora",
        "url": "https://fylora.online/services",
        "description": "Professional digital services including web development, SEO, AI automation, UI UX design, digital marketing, CMS development and data analytics dashboards.",
        "areaServed": "Worldwide",
        "serviceType": [
            "Web Development",
            "CMS Development",
            "SEO",
            "Digital Marketing",
            "Graphic Design",
            "UI UX Design",
            "Data Analytics",
            "AI Agent Development"
        ]
    };

    return (
        <Layout>
            <Helmet>
                <title>Professional Digital Services | Web Development, AI Automation, SEO & Data Analytics – Fylora</title>
                <meta name="description" content="Explore Fylora’s professional services including web development, CMS development, SEO, digital marketing, graphic design, UI/UX design, data analytics dashboards, and AI automation agents to grow your business." />
                <meta name="keywords" content="web development services, AI automation development, SEO services, digital marketing services, UI UX design services, data analytics dashboards, CMS development services, AI agent development" />
                <link rel="canonical" href="https://fylora.online/services" />

                <meta property="og:title" content="Professional Digital Services | Web Development, AI Automation, SEO & Data Analytics – Fylora" />
                <meta property="og:description" content="Explore Fylora’s professional services including web development, CMS development, SEO, digital marketing, graphic design, UI/UX design, data analytics dashboards, and AI automation agents to grow your business." />
                <meta property="og:url" content="https://fylora.online/services" />

                <meta name="twitter:title" content="Professional Digital Services | Web Development, AI Automation, SEO & Data Analytics – Fylora" />
                <meta name="twitter:description" content="Explore Fylora’s professional services including web development, CMS development, SEO, digital marketing, graphic design, UI/UX design, data analytics dashboards, and AI automation agents to grow your business." />

                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <section className="relative overflow-hidden pt-8 pb-12 md:pt-16 md:pb-20 flex flex-col items-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />

                <div className="container relative z-10 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-10 max-w-3xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6"
                        >
                            Our Professional <span className="fylora-gradient-text">Services</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed"
                        >
                            Partner with us to transform your ideas into exceptional digital experiences. From web development to advanced AI solutions.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {services.map((service, idx) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group flex flex-col bg-card border border-white/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                            >
                                <div className="w-full h-32 sm:h-40 overflow-hidden bg-muted/20 relative shrink-0">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-300" />
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-1 text-center justify-center">
                                    <h2 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                                        {service.title}
                                    </h2>
                                    <p className="text-xs md:text-sm text-muted-foreground flex-none leading-relaxed mb-3">
                                        {service.description}
                                    </p>

                                    <div className="text-left text-xs text-muted-foreground/80 space-y-3 pb-3 border-b border-white/5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <p className="font-medium text-foreground/80 mb-1">{service.definition}</p>
                                            <p className="[&>a]:text-primary [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:text-primary/80 transition-colors" dangerouslySetInnerHTML={{ __html: service.paragraph }} />
                                        </div>
                                        <div className="mt-3">
                                            <strong className="text-foreground/80 block mb-1">Deliverables:</strong>
                                            <ul className="list-disc pl-4 space-y-0.5">
                                                {service.deliverables.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-left text-xs font-semibold text-primary pt-3 leading-tight mt-auto">
                                        Benefits: <span className="text-primary/80 font-normal">{service.benefits}</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" className="h-14 px-10 rounded-full fylora-gradient-bg border-none hover:scale-105 transition-transform duration-300 text-white shadow-lg shadow-primary/25 font-semibold text-lg">
                                    Contact Us Today
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[700px] w-[95vw] h-[85vh] max-h-[85vh] p-0 overflow-hidden bg-background rounded-3xl border-white/10 shadow-2xl flex flex-col gap-0 pointer-events-auto">
                                <DialogHeader className="sr-only">
                                    <DialogTitle>Contact Us</DialogTitle>
                                </DialogHeader>
                                <div className="h-14 w-full bg-background border-b border-border flex items-center px-6 shrink-0 relative z-10">
                                    <span className="font-display font-semibold text-lg">Get in Touch</span>
                                </div>
                                <div className="w-full flex-1 min-h-0 relative bg-background flex flex-col pt-2">
                                    <ContactForm />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* AI Search Optimized FAQ Section */}
                    <div className="mt-24 md:mt-32 max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-muted-foreground">Find quick answers to common questions about our services.</p>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
                                <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-3">What services does Fylora offer?</h3>
                                <p className="text-muted-foreground leading-relaxed">Fylora provides web development, CMS development, SEO services, digital marketing, UI/UX design, graphic design, AI automation, and data analytics dashboards.</p>
                            </div>
                            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
                                <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-3">Can Fylora develop AI automation agents?</h3>
                                <p className="text-muted-foreground leading-relaxed">Yes. Fylora builds AI agents that automate workflows, analyze data, and improve customer interactions.</p>
                            </div>
                            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
                                <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-3">Do you offer SEO for startups and small businesses?</h3>
                                <p className="text-muted-foreground leading-relaxed">Yes. Our SEO services include keyword strategy, technical SEO, content optimization, and performance monitoring.</p>
                            </div>
                            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
                                <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-3">Can Fylora create business dashboards?</h3>
                                <p className="text-muted-foreground leading-relaxed">Yes. We design interactive dashboards that convert complex business data into actionable insights.</p>
                            </div>
                            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
                                <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-3">How can I start working with Fylora?</h3>
                                <p className="text-muted-foreground leading-relaxed">You can contact us through the website to discuss your project and receive a customized solution.</p>
                            </div>
                        </div>
                    </div>

                    {/* Conversion CTA Section */}
                    <div className="mt-24 md:mt-32 mb-10 text-center bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 relative z-10">
                            Let's Build Something Exceptional
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
                            Partner with Fylora to build powerful websites, AI automation systems, and data-driven growth solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="h-14 px-10 rounded-full fylora-gradient-bg border-none hover:scale-105 transition-transform duration-300 text-white shadow-lg shadow-primary/25 font-semibold text-lg w-full sm:w-auto">
                                        Start Your Project
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px] w-[95vw] h-[85vh] max-h-[85vh] p-0 overflow-hidden bg-background rounded-3xl border-white/10 shadow-2xl flex flex-col gap-0 pointer-events-auto">
                                    <DialogHeader className="sr-only">
                                        <DialogTitle>Start Your Project</DialogTitle>
                                    </DialogHeader>
                                    <div className="h-14 w-full bg-background border-b border-border flex items-center px-6 shrink-0 relative z-10">
                                        <span className="font-display font-semibold text-lg">Start Your Project</span>
                                    </div>
                                    <div className="w-full flex-1 min-h-0 relative bg-background flex flex-col pt-2">
                                        <ContactForm />
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/20 hover:bg-white/5 transition-colors duration-300 font-semibold text-lg w-full sm:w-auto">
                                        Contact Us
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px] w-[95vw] h-[85vh] max-h-[85vh] p-0 overflow-hidden bg-background rounded-3xl border-white/10 shadow-2xl flex flex-col gap-0 pointer-events-auto">
                                    <DialogHeader className="sr-only">
                                        <DialogTitle>Contact Us</DialogTitle>
                                    </DialogHeader>
                                    <div className="h-14 w-full bg-background border-b border-border flex items-center px-6 shrink-0 relative z-10">
                                        <span className="font-display font-semibold text-lg">Get in Touch</span>
                                    </div>
                                    <div className="w-full flex-1 min-h-0 relative bg-background flex flex-col pt-2">
                                        <ContactForm />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                </div>
            </section>
        </Layout>
    );
}
