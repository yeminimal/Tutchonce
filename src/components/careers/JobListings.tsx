import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { CareerPost } from '@/components/admin/careers/types';

interface JobListingsProps {
  jobs: CareerPost[];
}

const JobListings: React.FC<JobListingsProps> = ({ jobs }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">
            Current Openings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our team and help us provide exceptional cleaning services across Nigeria
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-2xl shadow-card p-8 animate-reveal card-hover"
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="inline-block px-3 py-1 bg-brand-light text-brand-primary text-sm font-medium rounded-full mr-3">
                          {job.type}
                        </span>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                          {job.status === 'active' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-brand-primary mb-3">
                        {job.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-brand-primary" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-brand-primary" />
                          <span>{job.type}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center">
                            <DollarSign size={16} className="mr-2 text-brand-primary" />
                            <span>{job.salary}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Button 
                        className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-3"
                        onClick={() => {
                          // For demo purposes, just show an alert
                          alert(`Apply for ${job.title} - Send your CV to careers@tutchonce.com`);
                        }}
                      >
                        Apply Now <ChevronRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-card p-12 text-center">
              <h3 className="text-2xl font-semibold text-brand-primary mb-4">
                No Open Positions
              </h3>
              <p className="text-muted-foreground mb-6">
                We're not currently hiring, but we're always looking for talented individuals to join our team.
              </p>
              <Button 
                variant="outline" 
                className="border-brand-primary text-brand-primary hover:bg-brand-light"
                onClick={() => {
                  window.location.href = 'mailto:careers@tutchonce.com?subject=General Application';
                }}
              >
                Send Us Your CV
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;