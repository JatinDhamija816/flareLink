import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Task {
  id: string;
  title: string;
  content: string;
  priority: string;
  status: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (
    title: string,
    content: string,
    priority: string,
    status: boolean
  ) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = (
    title: string,
    content: string,
    priority: string,
    status: boolean
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      content,
      priority,
      status,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};
