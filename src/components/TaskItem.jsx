import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import TaskDetails from "./TaskDetails";

const TaskItem = ({ task }) => {
  const { removeTask } = useTaskContext();
  const [editing, setEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    setShowDetails(true);
  };

  const handleCloseTaskDetails = () => {
    setShowDetails(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    removeTask(task._id);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border-2 border-red-600">
      <div className="flex justify-between ">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
          <button
            onClick={handleDetailsClick}
            className="px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-green-600 transition"
          >
            Details
          </button>
          <button
            onClick={handleEditClick}
            className="px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      {editing && <TaskForm task={task} onClose={() => setEditing(false)} />}
      {showDetails && (
        <TaskDetails id={task._id} onClose={handleCloseTaskDetails} />
      )}
    </div>
  );
};

export default TaskItem;