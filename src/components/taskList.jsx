import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import TaskForm from "./taskForm";
import TaskItem from "./taskItem";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isFormOpen, setIsFormOpen] = useState(false); // state to open or close Form

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="grid grid-cols-6 h-screen">
     
      <div className="col-span-5">
        <div className="m-10">
          {/* Top Bar */}
          <div className="w-72 p-2 flex justify-between items-center border-2 ">
            <h2>TASKS</h2>
            <button onClick={openForm}>
              <FaPlus />
            </button>
          </div>

          {/* Task List */}
          {isFormOpen ? <TaskForm closeForm={closeForm} /> : null}

          {/* Map Tasks from Redux State */}
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
