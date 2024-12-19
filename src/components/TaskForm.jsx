import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTaskContext } from "../context/TaskContext";

// Helper functions for date conversion
const toLocalDate = (utcDate) => {
  if (!utcDate) return "";
  const date = new Date(utcDate);
  return date.toISOString().split("T")[0];
};

const toUTCDate = (localDate) => {
  if (!localDate) return null;
  const date = new Date(localDate);
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Title is required.")
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title must be less than 100 characters.")
    .matches(/^[a-zA-Z0-9\s]+$/, "Title cannot contain special characters."),
  description: yup.string().required("Description is required.").min(10, "Description must be at least 10 characters.").max(500, "Description must be less than 500 characters."),
  status: yup.string().oneOf(["Pending", "In Progress", "Completed"], "Invalid status selected.").required("Status is required."),
  dueDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : toUTCDate(originalValue)))
    .required("Due date is required.")
    .min(toUTCDate(new Date().toISOString().split("T")[0]), "Due date cannot be in the past.")
    .max(toUTCDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]), "Due date cannot be more than a year from today."),
});

const TaskForm = ({ task, onClose }) => {
  const { addTask, editTask } = useTaskContext();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "Pending",
      dueDate: task?.dueDate ? toLocalDate(task.dueDate) : "",
    },
  });

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      dueDate: toUTCDate(data.dueDate),
    };

    try {
      if (task) {
        await editTask(task._id, taskData);
      } else {
        await addTask(taskData);
      }
      onClose?.();
      reset();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      {/* Title */}
      <div className="mb-4">
        <Controller name="title" control={control} render={({ field }) => <input {...field} type="text" placeholder="Title" className={`w-full p-2 border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`} />} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <Controller name="description" control={control} render={({ field }) => <textarea {...field} placeholder="Description" className={`w-full p-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`} />} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Status */}
      <div className="mb-4">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          )}
        />
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <Controller name="dueDate" control={control} render={({ field }) => <input {...field} type="date" className={`w-full p-2 border rounded-md ${errors.dueDate ? "border-red-500" : "border-gray-300"}`} />} />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-300 text-white p-2 rounded-md hover:bg-blue-600 transition">
        {task ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;


