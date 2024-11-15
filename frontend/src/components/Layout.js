import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-full mx-auto px-0">{children}</div> {/* Adjust padding here */}
    </div>
  );
};


export default Layout;