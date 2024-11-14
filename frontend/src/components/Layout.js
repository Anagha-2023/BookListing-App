import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200"> {/* Background color here */}
      {children}
    </div>
  );
};

export default Layout;