import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL =
  "https://stage.api.sloovi.com/team?product=outreach&company_id=company_413ef22b6237417fb1fba7917f0f69e7";

export const getAssignedUser = createAsyncThunk("getAssignedUser", async () => {
  const response = await axios.get(USERS_URL, {
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTYwODg2NjYsIm5iZiI6MTY1NjA4ODY2NiwianRpIjoiYjMzOTY2YjgtNjM3NS00NGU0LWFjYTctMDVlYzZhMDU1MGY5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9._uIxO1PlOkOuvJmoeB8HLu3SFYm3juxPcOnJe4uWs9I",
    },
  });
  const data = response.data;
  const users = data.results.data;
  return users;
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAssignedUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAssignedUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "successful";
      })
      .addCase(getAssignedUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
