
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import ResumeList from '@/components/ResumeList';
import ResumeStats from '@/components/ResumeStats';
import QuickActions from '@/components/QuickActions';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume Dashboard</h1>
            <p className="text-muted-foreground">Manage your resumes and track your job applications</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ResumeStats />
              <ResumeList />
            </div>
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
