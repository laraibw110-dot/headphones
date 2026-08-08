import React, { useState } from "react";
import { BookOpen, Clock, ArrowRight, Sparkles, X, Check } from "lucide-react";
import { BlogPost } from "../types";
import { BLOG_POSTS } from "../data/catalog";

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="hair-guide" className="py-12 md:py-20 px-4 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#E8D8C8] text-[#524131] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#8D765E]" />
            <span>The Hair & Ergonomics Journal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1E22]">
            Hair, Fit & Style <span className="italic font-light text-[#8D765E]">Guides</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6154]">
            Pro tips on wearing headphones with high buns, avoiding headband dent, and reducing temporal pressure.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-[#FDFBF7] rounded-3xl overflow-hidden border border-[#EADFCF] hover:border-[#8D765E] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="aspect-video bg-[#EADFCF] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8D765E] font-medium">
                    <span>{post.category}</span>
                    <span className="flex items-center gap-1 text-[#8D8276]">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif text-[#1E1E22] leading-snug">{post.title}</h3>
                  <p className="text-xs text-[#6B6154] line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>

                <button
                  onClick={() => setActivePost(post)}
                  className="pt-4 border-t border-[#EADFCF] text-xs font-semibold text-[#1E1E22] hover:text-[#8D765E] flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Full Article Reader Modal */}
        {activePost && (
          <div className="fixed inset-0 z-50 bg-[#1E1E22]/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FDFBF7] rounded-3xl border border-[#EADFCF] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto relative shadow-2xl animate-in fade-in duration-150">
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 text-[#1E1E22] hover:bg-[#F4ECE1] p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs text-[#8D765E] font-semibold uppercase tracking-wider">
                  {activePost.category} • {activePost.readTime}
                </span>
                <h2 className="text-2xl font-serif text-[#1E1E22]">{activePost.title}</h2>
              </div>

              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-56 object-cover rounded-2xl border border-[#EADFCF]"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-4 text-xs text-[#4A433B] leading-relaxed">
                {activePost.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Quick Key Takeaways */}
              <div className="bg-[#F4ECE1] p-4 rounded-2xl border border-[#D8C7B2] space-y-2">
                <strong className="text-xs font-bold text-[#1E1E22] block">Key Hairstylist Takeaways:</strong>
                <ul className="space-y-1.5 text-xs text-[#524B42]">
                  {activePost.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8D765E] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
