import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { BlogPost } from '@/components/admin/blog/types';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import BlogDialog from '@/components/blog/BlogDialog';

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-reveal');
      elements.forEach(el => observer.observe(el));
    }

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.animate-reveal');
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  // Load demo blog posts since we removed Supabase
  useEffect(() => {
    const demoPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Ultimate Guide to Deep Cleaning Your Home',
        excerpt: 'Learn the best practices for giving your home a thorough deep clean that will leave every surface sparkling.',
        content: '<p>A comprehensive guide to deep cleaning your home...</p>',
        author: 'Tutchonce Team',
        date: '2024-01-15',
        readingTime: '8 min read',
        image: '/lovable-uploads/c5442ef4-b436-4d8d-8bc2-c63c107e1d08.png',
        tags: ['cleaning', 'home', 'tips'],
        status: 'published',
        seoTitle: 'The Ultimate Guide to Deep Cleaning Your Home',
        seoDescription: 'Learn the best practices for giving your home a thorough deep clean',
        seoKeywords: 'home cleaning, deep cleaning, cleaning tips'
      },
      {
        id: '2',
        title: 'Commercial Cleaning Best Practices',
        excerpt: 'Discover how professional commercial cleaning can improve your workspace environment and employee productivity.',
        content: '<p>Commercial cleaning best practices...</p>',
        author: 'Tutchonce Team',
        date: '2024-01-10',
        readingTime: '6 min read',
        image: '/lovable-uploads/e36c2a0a-ff4e-4be4-bf6c-0366d214a280.png',
        tags: ['commercial', 'office', 'productivity'],
        status: 'published',
        seoTitle: 'Commercial Cleaning Best Practices',
        seoDescription: 'Professional commercial cleaning tips for better workplace environment',
        seoKeywords: 'commercial cleaning, office cleaning, workplace'
      }
    ];
    setBlogPosts(demoPosts);
  }, []);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setShowDialog(true);
  };

  return (
    <>
      <Helmet>
        <title>Blog - Tutchonce Cleaning Services</title>
        <meta name="description" content="Read our latest articles on cleaning tips, industry insights, and home maintenance advice from the experts at Tutchonce." />
        <meta name="keywords" content="cleaning blog, home cleaning tips, commercial cleaning advice, Nigeria cleaning services" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main ref={sectionRef}>
          <BlogHeader />
          <BlogList blogPosts={blogPosts} onOpenPost={handlePostClick} />
        </main>
        
        <Footer />
        
        <BlogDialog 
          selectedPost={selectedPost} 
          showDialog={showDialog} 
          setShowDialog={setShowDialog} 
        />
      </div>
    </>
  );
};

export default Blog;