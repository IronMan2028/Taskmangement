import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';
import TaskUpdate from './components/TaskUpdate';
import Footer from './components/Footer';
// import 'App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://anurajpariya.pythonanywhere.com/api/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async task => {
    try {
      const response = await axios.post('https://anurajpariya.pythonanywhere.com/api/tasks/', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async id => {
    try {
      await axios.delete(`https://anurajpariya.pythonanywhere.com/api/tasks/${id}/`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleViewTask = async id => {
    try {
      const response = await axios.get(`https://anurajpariya.pythonanywhere.com/api/tasks/${id}/`);
      setSelectedTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-green-200">
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<TaskList tasks={tasks} onDelete={handleDeleteTask} onView={handleViewTask} />} />
              <Route path="/add-task" element={<TaskForm onSubmit={handleAddTask} />} />
              <Route path="/tasks/:id" element={selectedTask ? <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} /> : <div>Loading...</div>} />
              <Route path="/update-task/:id" element={<TaskUpdate />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
