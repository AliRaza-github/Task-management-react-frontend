import axios from 'axios';

// const API_URL = 'http://localhost:5000/tasks';
const API_URL = 'https://task-management-backend-node.vercel.app/tasks/';



export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const fetchTaskById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

