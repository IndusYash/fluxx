import React from 'react';
import HackathonRegistrationForm from '@/components/hackathon/HackathonRegistrationForm';

const IdeathonRegister: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <HackathonRegistrationForm />
      </div>
    </div>
  );
};

export default IdeathonRegister;
