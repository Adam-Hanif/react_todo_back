import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface AuthCredentials {
  login: string;
  password: string;
}

interface AuthResponse {
  err: string | null;
  token: string;
  
}
interface ApplicationState {
  err: string | null;
  signingUp: boolean;
  signingIn: boolean;
  token: string | null;
}
const initialState: ApplicationState = {
  err: null,
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem("token"),
};
export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ login, password }: AuthCredentials, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const json: AuthResponse = await res.json();
      if (json.err) {
        return thunkAPI.rejectWithValue(json.err);
      }
      return json;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const authSignIn = createAsyncThunk(
  "auth/signin",
  async ({ login, password }: AuthCredentials, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const token: AuthResponse = await res.json();
      if (token.err) {
        return thunkAPI.rejectWithValue(token.err);
      }
      localStorage.setItem("token", token.token);
      return token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = true;
        state.err = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.err = action.payload as string;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = false;
        state.err = null;
      })
      .addCase(authSignIn.pending, (state) => {
        state.signingIn = true;
        state.err = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.signingIn = false;
        state.err = action.payload as string;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.signingIn = false;
        state.err = null;
        state.token = action.payload ;
      });
  },
});
export default applicationSlice.reducer;
