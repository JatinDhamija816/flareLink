import React, { useState } from "react";

interface TaskFormProps {
  onSubmit: (
    title: string,
    content: string,
    priority: string,
    status: boolean
  ) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("low");
  const [status] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content, priority, status);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label className="font-semibold text-xl">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md outline-none"
        required
      />

      <label className="font-semibold text-xl">Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md outline-none"
        required
      />

      <label className="font-semibold text-xl">Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md outline-none"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
