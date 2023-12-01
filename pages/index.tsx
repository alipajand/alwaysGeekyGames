import React from 'react';
import { LoginForm } from '@/components';

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Login Page</h1>
        <LoginForm />
        <div className="text-gray-400 mt-6 text-sm px-1">
          Hint:
          <br />
          username: {'alipajand'} and password: {'123'}
        </div>
      </div>
    </div>
  );
}
