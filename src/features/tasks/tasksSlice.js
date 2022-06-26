import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TASKS_URL =
  "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7";

const headers = {
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTYwODg2NjYsIm5iZiI6MTY1NjA4ODY2NiwianRpIjoiYjMzOTY2YjgtNjM3NS00NGU0LWFjYTctMDVlYzZhMDU1MGY5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9._uIxO1PlOkOuvJmoeB8HLu3SFYm3juxPcOnJe4uWs9I",
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(TASKS_URL, {
    headers: headers,
  });
  const tasks = response.data;
  return tasks.results;
});

export const addNewTask = createAsyncThunk("tasks/addNewTask", async (task) => {
  const response = await axios.post(TASKS_URL, task, {
    headers: headers,
  });
  return response.data;
});

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (id, editedTask) => {
    const response = await axios.put(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
      editedTask,
      {
        headers: headers,
      }
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const response = await axios.delete(
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
    {
      headers: headers,
    }
  );
  return response.data;
});

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default tasksSlice.reducer;
