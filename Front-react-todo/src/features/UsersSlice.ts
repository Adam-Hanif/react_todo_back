import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

type User = {
  _id: string | number;
  login: string;
  password: string;
};

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

export const fetchUsers = createAsyncThunk
  <User[],
    void,
    {
      state: RootState
    }>

  (
    "users/fetch",
    async (_, thunkAPI) => {
      try {
        const res = await fetch("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().application.token} `,
          },
        });
        const users = await res.json();
        if (users.err) {
          return thunkAPI.rejectWithValue(users.err);
        }
        return users;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
  );

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
