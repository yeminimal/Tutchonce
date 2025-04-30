import React, { useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: 'renovation',
    title: 'Renovation Cleaning',
    description: 'Specialized cleaning during and after renovation projects to manage dust and debris.',
    image: '/lovable-uploads/b910274f-19f2-4c38-a2e8-0be968c64921.png',
  },
  {
    icon: 'janitorial',
    title: 'Janitorial Services',
    description: 'Regular janitorial services for businesses and commercial properties.',
    image: '/lovable-uploads/e0b762b5-4d17-4227-91ea-f21abf6a519d.png',
  },
  {
    icon: 'custom',
    title: 'Custom Image Card',
    description: 'This is an example of a custom image card using the specified file.',
    image: '/lovable-uploads/IMG-20250331-WA0041.jpg', // New Image Card
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.animate-reveal');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-clean-50 text-brand-primary rounded-full text-sm font-medium mb-6 animate-reveal">
            Our Services
          </span>
          <h2 className="text-4xl font-bold animate-reveal text-brand-primary" style={{ transitionDelay: '100ms' }}>
            Professional Cleaning Services for Every Need
          </h2>
          <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
            We offer a variety of cleaning services to keep your home and office looking their best across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              image={service.image}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
