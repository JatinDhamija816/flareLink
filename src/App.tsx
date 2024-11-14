import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <TaskProvider>
      <Navbar />
      <TaskList />
    </TaskProvider>
  );
};

export default App;
