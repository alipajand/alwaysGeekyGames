import React from 'react';
import { LoginForm } from '@/components';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Login Page</h1>
        <LoginForm />
        <div className="text-gray-400 mt-6 text-sm px-1">
          <p>
            <strong>Hint:</strong>
          </p>
          <p>
            <span className="font-bold">Username:</span> alipajand
            <br />
            <span className="font-bold">Password:</span> 123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
