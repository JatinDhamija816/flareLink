import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

const TaskList: React.FC = () => {
  const { tasks, deleteTask, toggleTaskStatus } = useContext(TaskContext)!;

  const [searchText, setSearchText] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortOrder, setSortOrder] = useState<"highToLow" | "lowToHigh">(
    "highToLow"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.content.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus = !showCompleted || task.status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "highToLow") {
        return (
          priorityOrder[b.priority as "high" | "medium" | "low"] -
          priorityOrder[a.priority as "high" | "medium" | "low"]
        );
      } else {
        return (
          priorityOrder[a.priority as "high" | "medium" | "low"] -
          priorityOrder[b.priority as "high" | "medium" | "low"]
        );
      }
    });

  return (
    <div className="p-5 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        Task List
      </h2>
      <div className="flex justify-evenly">
        <div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 flex items-center justify-center"
          >
            <IoFilter /> <p className="px-2">Filter</p>
          </button>
          {isFilterOpen && (
            <div className=" absolute mt-1 bg-white border border-gray-400 rounded-md p-4 ">
              <label className="flex items-center space-x-2 text-gray-700 mb-3">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={() => setShowCompleted(!showCompleted)}
                  className="h-5 w-5"
                />
                <span>Show Completed Only</span>
              </label>

              <label className="block text-gray-700 mb-1">
                Sort by Priority:
              </label>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "highToLow" | "lowToHigh")
                }
                className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-black w-full"
              >
                <option value="highToLow">High to Low</option>
                <option value="lowToHigh">Low to High</option>
              </select>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-black"
        />
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">
          No tasks available. Click "Add Task" to create one.
        </p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">
          No tasks match the current criteria.
        </p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="md:max-w-screen-lg md:mx-auto bg-gray-800 text-white p-5 rounded-lg shadow-md flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{task.title}</h3>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  task.priority === "high"
                    ? "bg-red-500"
                    : task.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>

            <p className="text-gray-300">{task.content}</p>

            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className="flex items-center space-x-2"
              >
                {task.status ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaRegCircle className="text-gray-400" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    task.status ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {task.status ? "Completed" : "Pending"}
                </span>
              </button>

              <button
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
