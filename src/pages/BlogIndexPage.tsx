import Layout from "@/components/Layout";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { blogPosts } from "@/lib/blog";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const POSTS_PER_PAGE = 6;

const BlogIndexPage = () => {
    useSeo({
        title: "Fylora Blog | Guides & Tutorials on Document Privacy",
        description: "Read the latest tutorials, security updates, and guides on managing your PDF files securely using client-side tools.",
        url: "/blog",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    const currentPosts = blogPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <Layout>
            <div className="bg-muted/30 pt-12 pb-24 md:pt-20 md:pb-32 min-h-screen">
                <div className="container max-w-5xl mx-auto px-6 lg:px-8">

                    <div className="text-center mb-16 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                                Fylora Journal
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                Insights, guides, and tutorials on securing your documents and mastering your workflow.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {currentPosts.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group flex flex-col h-full bg-card rounded-3xl border border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-3xl">
                                    <div className="aspect-[16/10] bg-muted/40 relative overflow-hidden flex items-center justify-center border-b border-border/50 group-hover:bg-muted transition-colors">
                                        {post.featuredImage ? (
                                            <img
                                                src={post.featuredImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        ) : (
                                            <span className="p-4 bg-background/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                                <FileText className="w-12 h-12 text-primary opacity-60" />
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <time className="text-primary text-sm font-semibold tracking-wider mb-4 block uppercase opacity-90">{post.date}</time>
                                        <h2 className="font-display text-xl font-bold text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-grow">
                                            {post.metaDescription}
                                        </p>
                                        <div className="text-primary font-medium flex items-center mt-auto w-fit">
                                            Read Article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 pt-8 border-t border-border/40">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    setCurrentPage(p => Math.max(1, p - 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === 1}
                                className="rounded-full w-12 h-12"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <span className="font-medium text-muted-foreground px-4">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    setCurrentPage(p => Math.min(totalPages, p + 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === totalPages}
                                className="rounded-full w-12 h-12"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    );
};

export default BlogIndexPage;
