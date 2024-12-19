import React, { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskDetails = ({ id, onClose }) => {
  const { task, fetchTask } = useTaskContext();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const loadTask = async () => {
      try {
        await fetchTask(id);
      } catch (err) {
        setError("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };

    loadTask(); 
  }, [id, fetchTask]);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        onClick={handleModalClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        {loading && <p className="text-center">Loading task...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && task && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
            <p className="mb-2">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {task.status}
            </p>
            <p className="mb-2">
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
