import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, fetchTasks } from "../features/tasks/tasksSlice";

const TaskForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(0);

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
    const unformatted_time = e.target.value;
    const arr = unformatted_time.split(":");
    const formatted_time = arr[0] * 3600 + arr[1] * 60;
    setTime(formatted_time);
  };

  const time_zone = new Date().getTimezoneOffset() * 60;
  const is_completed = 0;
  const task = {
    assigned_user: user,
    task_date: date,
    task_time: time,
    is_completed,
    time_zone,
    task_msg: description,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewTask(task));
    closeForm();
    dispatch(fetchTasks());
  };

  return (
    <div>
      <form className="flex flex-col w-72 h-64 p-2 border-2"
      style={{backgroundColor:"#DFF6FF"}}>
        <label htmlFor="description">Task Description</label>
        <input
          className="border-2 border-solid border-blue-200"
          id="description"
          type="text"
          onChange={onDescriptionChange}
        />
        <div className="flex justify-between mt-4">
          <div>
            <label htmlFor="date">Date</label>
            <input
              className="border-2"
              id="date"
              type="date"
              onChange={onDateChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              className="border-2 w-28"
              id="time"
              type="time"
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
        <div className="flex justify-end mt-2 gap-2">
          <button
            className="w-20 p-2 rounded-sm"
            type="button"
            onClick={closeForm}
          >
            Cancel
          </button>
          <button
            className="w-20 p-1 text-white border-solid border-3 rounded-sm"
            type="submit"
            onClick={handleSubmit}
            style={{backgroundColor:'#14C38E'}}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
