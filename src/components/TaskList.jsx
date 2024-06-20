// import React from 'react';
// import { Link } from 'react-router-dom';

// const TaskList = ({ tasks, onDelete, onView }) => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>
//       {tasks.length === 0 ? (
//         <p>No tasks available</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
//           {tasks.map(task => (
//             <div key={task.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
//               <p className="text-gray-700 mb-2">{task.description}</p>
//               <div className="flex space-x-2 mt-2">
//                 <Link 
//                   to={`/tasks/${task.id}`} 
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
//                   onClick={() => onView(task.id)}
//                 >
//                   View
//                 </Link>
//                 <Link 
//                   to={`/update-task/${task.id}`} 
//                   className="tfocus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
//                 >
//                   Update
//                 </Link>
//                 <button
//                   onClick={() => onDelete(task.id)}
//                   className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onDelete, onView }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleView = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    setSelectedTask(task);
    onView(taskId);
  };

  const handleClose = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleView(task.id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  View
                </button>
                <Link 
                  to={`/update-task/${task.id}`} 
                  className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Detailed Task View */}
      {selectedTask && (
        <div className="fixed inset-0 overflow-y-auto z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 max-w-3xl mx-auto rounded-lg shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedTask.title}</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-4">{selectedTask.description}</p>
            <div className="flex space-x-2">
              <Link 
                to={`/update-task/${selectedTask.id}`} 
                className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Update
              </Link>
              <button
                onClick={() => onDelete(selectedTask.id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

