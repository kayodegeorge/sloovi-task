import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, fetchTasks } from "../features/tasks/tasksSlice";

const TaskEditForm = ({ closeForm, task }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [user, setUser] = useState(task.assigned_user);
  const [description, setDescription] = useState(task.task_msg);
  const [date, setDate] = useState(task.task_date);
  const [time, setTime] = useState(task.task_time);

  const onUserChange = (e) => {
    setUser(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  const onTimeChange = (e) => {
    const unformatted_time = e.target.value; // input time string
    const arr = unformatted_time.split(":"); // splitting the string by colon
    const formatted_time = arr[0] * 3600 + arr[1] * 60; // time as an integer
    setTime(formatted_time);
  };

  const time_zone = new Date().getTimezoneOffset() * 60; // timezone as an integer
  const is_completed = 0;

  const id = task.id;
  const edited_task = {
    assigned_user: user,
    task_date: date,
    task_time: time,
    is_completed,
    time_zone,
    task_msg: description,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({ id, edited_task }));
    closeForm();
    dispatch(fetchTasks());
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTask(task.id));
    closeForm();
    dispatch(fetchTasks());
  };

  return (
    <div>
      <form className="flex flex-col w-72 h-64 p-2 border-2">
        <label>Task Description</label>
        <input
          className="border-2"
          type="text"
          name="description"
          defaultValue={task.task_msg}
          onChange={onDescriptionChange}
        />
        <div className="flex justify-between mt-4">
          <div>
            <label htmlFor="">Date</label>
            <input
              className="border-2"
              type="date"
              name="date"
              defaultValue={task.task_date}
              onChange={onDateChange}
            />
          </div>
          <div>
            <label htmlFor="">Time</label>
            <input
              className="border-2 w-28"
              type="time"
              placeholder="TIme"
              onChange={onTimeChange}
            />
          </div>
        </div>
        <label className="mt-4">Assign User</label>
        <select onChange={onUserChange} className="border-2">
          {users.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="flex justify-between mt-2 gap-1">
          <button onClick={handleDelete}>
            <FaTrashAlt />
          </button>
          <div>
            <button
              className="w-20 p-2 rounded-sm"
              type="button"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              className="w-20 p-2 bg-green-300 rounded-sm"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskEditForm;