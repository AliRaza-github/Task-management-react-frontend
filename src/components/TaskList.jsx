import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, loading } = useTaskContext();
  const [filter, setFilter] = useState({
    status: "",
    dueDate: "",
  });
  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((task) => {
    let matches = true;

    if (filter.status) {
      matches = matches && task.status === filter.status;
    }

    if (filter.dueDate) {
      matches = matches && new Date(task.dueDate).toISOString().split("T")[0] === filter.dueDate;
    }

    return matches;
  });

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading tasks...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="flex justify-between mb-4">
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })} className="p-2 border border-gray-300 rounded-md">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input type="date" value={filter.dueDate} onChange={(e) => setFilter({ ...filter, dueDate: e.target.value })} className="p-2 border border-gray-300 rounded-md" />
      </div>

      {filteredTasks.length > 0 ? filteredTasks.map((task) => <TaskItem key={task._id} task={task} id={task._id}/>) : <p className="text-center text-gray-500">No tasks match the selected filters.</p>}
    </div>
  );
};

export default TaskList;


