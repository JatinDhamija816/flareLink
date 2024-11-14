import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const TaskList: React.FC = () => {
  const { tasks, deleteTask, toggleTaskStatus } = useContext(TaskContext)!;

  return (
    <div className="p-5 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        Task List
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">
          No tasks available. Click "Add Task" to get started.
        </p>
      ) : (
        tasks.map((task) => (
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
                {task.status === true ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaRegCircle className="text-gray-400" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    task.status === true ? "text-green-400" : "text-yellow-400"
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
