import { useParams, Navigate, Link } from "react-router-dom";
import { blogPosts } from "@/lib/blog";
import { tools } from "@/lib/tools";
import Layout from "@/components/Layout";
import { useSeo } from "@/hooks/useSeo";
import { ChevronRight, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    useSeo({
        title: `${post.title} | Fylora Blog`,
        description: post.metaDescription,
        url: `/blog/${post.slug}`,
    });

    const relatedTool = post.relatedToolId ? tools.find(t => t.id === post.relatedToolId) : null;

    // Generate JSON-LD Schemas
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        author: {
            "@type": "Organization",
            name: "Fylora",
            url: "https://fylora.online/"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.content.faqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
            }
        }))
    };

    return (
        <Layout>
            {/* Inject Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="bg-background pt-8 pb-20 md:pt-12 md:pb-32">
                <div className="container max-w-3xl mx-auto px-6 md:px-8">

                    {/* Breadcrumb Navigation */}
                    <nav className="flex items-center text-sm text-muted-foreground mb-8 md:mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1.5 min-w-min">
                            <Home className="w-3.5 h-3.5 mb-0.5" /> Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 opacity-50 shrink-0" />
                        <Link to="/blog" className="hover:text-primary transition-colors min-w-min">
                            Blog
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 opacity-50 shrink-0" />
                        <span className="text-foreground truncate max-w-[200px] md:max-w-xs">{post.title}</span>
                    </nav>

                    <article>
                        <header className="mb-12 md:mb-16">
                            <time className="text-primary font-semibold tracking-wide text-sm mb-4 block uppercase opacity-90">
                                {post.date}
                            </time>
                            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                                {post.title}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-8">
                                {post.metaDescription}
                            </p>

                            {post.featuredImage && (
                                <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-border/50 bg-muted/30 mb-12">
                                    <img
                                        src={post.featuredImage}
                                        alt={`Featured artwork for ${post.title}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </header>

                        <div className="text-base text-muted-foreground leading-relaxed md:leading-[1.9]">
                            <div className="mb-14 space-y-6">
                                {post.content.intro.map((paragraph, i) => (
                                    <p key={i} className="text-lg font-medium text-foreground/80 leading-relaxed md:leading-[1.8]" dangerouslySetInnerHTML={{ __html: paragraph }} />
                                ))}
                            </div>

                            {post.content.sections.map((section, idx) => (
                                <section key={idx} className="mb-14">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-display tracking-tight">{section.heading}</h2>
                                    <div className="space-y-6">
                                        {section.paragraphs.map((p, i) => (
                                            <p key={i} className="text-base text-muted-foreground leading-relaxed md:leading-[1.9]" dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                        {section.list && (
                                            <ul className="space-y-4 mt-8 bg-muted/20 p-6 md:p-8 rounded-2xl border border-border/40">
                                                {section.list.map((item, i) => (
                                                    <li key={i} className="flex gap-4">
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mt-0.5">
                                                            {i + 1}
                                                        </span>
                                                        <span className="text-base text-foreground/90 font-medium" dangerouslySetInnerHTML={{ __html: item }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </section>
                            ))}

                            <section className="mt-16 pt-16 border-t border-border/50">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 font-display tracking-tight">Frequently Asked Questions</h2>
                                <div className="space-y-10">
                                    {post.content.faqs.map((faq, idx) => (
                                        <div key={idx} className="bg-background">
                                            <h3 className="font-semibold text-lg text-foreground mb-3 leading-snug">{faq.question}</h3>
                                            <p className="text-base text-muted-foreground leading-relaxed md:leading-[1.8] m-0" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="mt-16 pt-12 border-t border-border/50 bg-primary/5 p-8 md:p-12 rounded-[2rem]">
                                <div className="space-y-5">
                                    {post.content.conclusion.map((paragraph, i) => (
                                        <p key={i} className="text-lg font-medium text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }} />
                                    ))}
                                </div>

                                {relatedTool && (
                                    <div className="mt-8">
                                        <Button asChild size="lg" className="w-full sm:w-auto h-14 rounded-full px-8 fylora-gradient-bg border-0 shadow-lg hover:shadow-xl transition-all">
                                            <Link to={`/${relatedTool.id}`} className="!text-white !no-underline hover:!text-white">
                                                Launch the {relatedTool.name} Tool <ArrowRight className="w-5 h-5 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </section>
                        </div>
                    </article>

                </div>
            </div>
        </Layout>
    );
};

export default BlogPostPage;
