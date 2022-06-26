import { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import TaskEditForm from "./taskEditForm";

const TaskItem = ({ task }) => {
  const [formOpen, setFormOpen] = useState(false); // state to open and close edit form

  const closeForm = () => {
    setFormOpen(false);
  };

  const openForm = () => {
    setFormOpen(true);
  };

  if (formOpen) {
    return <TaskEditForm task={task} closeForm={closeForm} />;
  } else {
    return (
      <div className="w-72 p-2 flex justify-between items-center border-2">
        {/* Text */}
        <div>
          <h1 className="font-bold text-lg">{task.task_msg}</h1>
          <h3>{task.task_date}</h3>
        </div>

        {/* Icons */}
        <div className="flex items-center mt-3 text-teal-700">
          <button className="p-2 border-2">
            <FaEdit onClick={openForm} />
          </button>

          <button className="p-2 border-2">
            <FaCheck />
          </button>
        </div>
      </div>
    );
  }
};

export default TaskItem;
