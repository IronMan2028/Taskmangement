import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          Task Management
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white font-bold">
            Home
          </Link>
          <Link to="/add-task" className="text-white font-bold">
            Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
