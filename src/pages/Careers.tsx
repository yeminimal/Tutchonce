import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { CareerPost } from '@/components/admin/careers/types';
import CareerHero from '@/components/careers/CareerHero';
import CareerBenefits from '@/components/careers/CareerBenefits';
import JobListings from '@/components/careers/JobListings';


const Careers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [jobs, setJobs] = useState<CareerPost[]>([]);

  // Load demo jobs since we removed Supabase
  useEffect(() => {
    const demoJobs: CareerPost[] = [
      {
        id: '1',
        title: 'Senior Cleaning Technician',
        description: 'Join our team as a Senior Cleaning Technician and lead cleaning operations.',
        location: 'Lagos, Nigeria',
        type: 'Full-time',
        salary: '₦150,000 - ₦200,000',
        requirements: 'Minimum 3 years experience in professional cleaning',
        qualifications: 'Certificate in cleaning services preferred',
        benefits: 'Health insurance, performance bonuses',
        applicationProcess: 'Send CV to careers@tutchonce.com',
        date: '2024-01-10',
        status: 'active'
      }
    ];
    setJobs(demoJobs);
  }, []);

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

  // Your UI goes here!
  return (
    <>
      <Helmet>
        <title>Careers | Tutchonce</title>
      </Helmet>
      <Navbar />
      <div ref={sectionRef}>
        <CareerHero />
        <CareerBenefits />
        <JobListings jobs={jobs} />
      </div>
      <Footer />
    </>
  );
};

export default Careers;
