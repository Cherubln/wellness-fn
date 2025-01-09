import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface IUser {
  id?: string;
  email: string;
  fullname: string;
  username: string;
  phonenumber?: string;
  profilePicture?: string;
  gender?: string;
  status?: string;
  groups?: string[];
  role: "user";
  points?: number;
}

export interface IServiceProvider {
  id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  services: string[];
  logo?: string;
  role: "service_provider";
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user: IUser | IServiceProvider | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  status: "idle",
  error: null,
  user: null,
};

// Async thunk for sign-in
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      return { token: response.data.token };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "An unknown error occurred" });
      }
    }
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    userData: {
      fullname: string;
      email: string;
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        userData
      );
      localStorage.setItem("token", response.data.token);
      return { token: response.data.token };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "An unknown error occurred" });
      }
    }
  }
);

// Async thunk for service provider sign-up
export const serviceProviderSignUp = createAsyncThunk(
  "auth/signUpProvider",
  async (
    userData: {
      name: string;
      phoneNumber: string;
      services: string[];
      email: string;
      password: string;
      logo: string;
      role: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const endpoint = "http://localhost:5000/api/service-providers/signup";
      const response = await axios.post(endpoint, userData);
      localStorage.setItem("token", response.data.token);
      return { token: response.data.token };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "An unknown error occurred" });
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        token: string | null;
        user: IServiceProvider | IUser;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      //  add user state
      if ("gender" in state.user! && "gender" in action.payload.user) {
        state.user.id = action.payload.user.id;
        state.user.email = action.payload.user.email;
        state.user.fullname = action.payload.user.fullname;
        state.user.username = action.payload.user.username;
        state.user.groups = action.payload.user.groups;
        state.user.gender = action.payload.user.gender;
        state.user.phonenumber = action.payload.user.phonenumber;
        state.user.points = action.payload.user.points;
        state.user.role = action.payload.user.role;
        state.user.profilePicture = action.payload.user.profilePicture;
      } else if ("name" in state.user! && "name" in action.payload.user) {
        state.user.id = action.payload.user.id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.logo = action.payload.user.logo;
        state.user.phoneNumber = action.payload.user.phoneNumber;
        state.user.services = action.payload.user.services;
        state.user.role = action.payload.user.role;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          const tokenData = jwtDecode<IServiceProvider | IUser>(
            action.payload.token
          );
          console.log(tokenData);

          state.status = "succeeded";
          state.isAuthenticated = true;
          state.token = action.payload.token;
          // add user state
          if ("gender" in tokenData && "gender" in state.user!) {
            state.user!.id = tokenData.id;
            state.user!.email = tokenData.email;
            state.user!.fullname = tokenData.fullname;
            state.user!.username = tokenData.username;
            state.user!.groups = tokenData.groups;
            state.user!.gender = tokenData.gender;
            state.user!.phonenumber = tokenData.phonenumber;
            state.user!.points = tokenData.points;
            state.user!.role = tokenData.role;
            state.user!.profilePicture = tokenData.profilePicture;
          } else if ("name" in state.user! && "name" in tokenData) {
            state.user.id = tokenData.id;
            state.user.name = tokenData.name;
            state.user.email = tokenData.email;
            state.user.logo = tokenData.logo;
            state.user.phoneNumber = tokenData.phoneNumber;
            state.user.services = tokenData.services;
            state.user.role = tokenData.role;
          }
        }
      )
      .addCase(signIn.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "failed";
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          const tokenData = jwtDecode<IUser>(action.payload.token);
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.token = action.payload.token;
          //  add user state here

          (state.user as IUser).id = tokenData.id;
          (state.user as IUser).email = tokenData.email;
          (state.user as IUser).fullname = tokenData.fullname;
          (state.user as IUser).username = tokenData.username;
          (state.user as IUser).groups = tokenData.groups;
          (state.user as IUser).gender = tokenData.gender;
          (state.user as IUser).phonenumber = tokenData.phonenumber;
          (state.user as IUser).points = tokenData.points;
          (state.user as IUser).role = tokenData.role;
          (state.user as IUser).profilePicture = tokenData.profilePicture;
        }
      )
      .addCase(signupUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "failed";
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(serviceProviderSignUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        serviceProviderSignUp.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          const tokenData = jwtDecode<IServiceProvider>(action.payload.token);
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.token = action.payload.token;
          //  add user state here

          (state.user as IServiceProvider).id = tokenData.id;
          (state.user as IServiceProvider).email = tokenData.email;
          (state.user as IServiceProvider).name = tokenData.name;
          (state.user as IServiceProvider).phoneNumber = tokenData.phoneNumber;
          (state.user as IServiceProvider).role = tokenData.role;
          (state.user as IServiceProvider).logo = tokenData.logo;
          (state.user as IServiceProvider).services = tokenData.services;
        }
      )
      .addCase(
        serviceProviderSignUp.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = "failed";
          state.error = (action.payload as { message: string }).message;
        }
      );
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
