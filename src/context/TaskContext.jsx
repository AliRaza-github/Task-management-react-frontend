import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask, fetchTaskById } from "../api/taskApi";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
      setLoading(false);
    };
    getTasks();
  }, []);

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const editTask = async (id, updatedTask) => {
    const updated = await updateTask(id, updatedTask);

    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    if (task && task._id === id) {
      setTask(updated);
    }
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const fetchTask = async (id) => {
    if (!task || task._id !== id) {
      const fetchedTask = await fetchTaskById(id);
      setTask(fetchedTask);
    }
  };

  return <TaskContext.Provider value={{ tasks, loading, addTask, editTask, removeTask, task, fetchTask }}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);
