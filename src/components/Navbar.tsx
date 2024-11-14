import { useContext, useState } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { TaskContext } from "../context/TaskContext";

const Navbar: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { addTask } = useContext(TaskContext)!;

  const handleAddTaskClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTaskSubmit = (
    title: string,
    content: string,
    priority: string,
    status: boolean
  ) => {
    addTask(title, content, priority, status);
    handleCloseModal();
  };

  return (
    <div className="bg-gray-800  flex justify-between py-5 px-5 items-center">
      <div className="text-xl font-serif italic text-white">FlareLink</div>
      <button
        onClick={handleAddTaskClick}
        className="text-white text-xl hover:bg-gray-500 hover:shadow hover:shadow-white px-3 rounded-md"
      >
        Add Task
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskForm onSubmit={handleTaskSubmit} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Navbar;
