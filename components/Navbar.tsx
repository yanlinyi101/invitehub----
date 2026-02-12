
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fas fa-key text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              InviteHub
            </span>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-slate-500 font-medium">群友邀请码共享平台</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
