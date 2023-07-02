import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

type Todo = {
  _id: string | number | void;
  text: string | void;
  favorite: boolean;
  loading?: boolean;
  loadOpen: boolean;
};

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null | unknown;
  loadOpen: boolean;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  loadOpen: false,
};

export const addTodo = createAsyncThunk<
  Todo,
  { text: string; favorite: boolean },
  { state: RootState }
>("add/todo", async ({ text, favorite }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().application.token}`,
      },

      body: JSON.stringify({ text, favorite }),
    });
    const todos = await res.json();
    return todos;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const favoriteTodo = createAsyncThunk<
  Todo,
  { id: string; favorite: boolean },
  { state: RootState }
>("favorite/todo", async ({ id, favorite }, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().application.token}`,
      },
      body: JSON.stringify({ favorite }),
    });
    const todos = await res.json();
    return todos;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchTodos = createAsyncThunk<
  Todo[],
  void,
  {
    rejectValue: string,
    state: RootState
  }

>("fetch/todos", async (data, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/", {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().application.token}`,
      },
    });

    const todos = await res.json();
    return todos;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteTodo = createAsyncThunk<
  number,
  number,
  {
    rejectValue: string,
    state: RootState
  }

>("delete/todo", async (id, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().application.token}`,
      },
    });
    return thunkAPI.fulfillWithValue(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addTodo.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => {
          state.loading = false;
          if (todo._id !== action.payload) {
            return todo;
          }
        });
      })
      .addCase(
        deleteTodo.pending,
        (state, action: PayloadAction<void, string, { arg: number }>) => {
          state.todos = state.todos.map((todo) => {
            if (todo._id === action.meta.arg) {
              todo.loading = true;
            }
            return todo;
          });
        }
      )
      .addCase(
        deleteTodo.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      // ----------------------------------------------------------------------------
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loadOpen = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loadOpen = true;
      })
      .addCase(
        fetchTodos.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.loadOpen = false;
          state.error = action.payload;
        }
      )
      // ----------------------------------------------------------------------------
      .addCase(favoriteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        favoriteTodo.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(favoriteTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          }
          return todo;
        });
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;
