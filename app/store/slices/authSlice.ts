import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface IUser {
  _id?: string;
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
  _id?: string;
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
  user: IUser | IServiceProvider;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  status: "idle",
  error: null,
  user: {} as IUser | IServiceProvider,
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
        `${apiUrl}/api/users/signin`,
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
      const response = await axios.post(`${apiUrl}/api/users/signup`, userData);
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
      const endpoint = `${apiUrl}/api/service-providers/signup`;

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
      if (action.payload.user.role === "user") {
        (state.user as IUser)._id = action.payload.user._id;
        (state.user as IUser).email = action.payload.user.email;
        (state.user as IUser).fullname = action.payload.user.fullname;
        (state.user as IUser).username = action.payload.user.username;
        (state.user as IUser).groups = action.payload.user.groups;
        (state.user as IUser).gender = action.payload.user.gender;
        (state.user as IUser).phonenumber = action.payload.user.phonenumber;
        (state.user as IUser).points = action.payload.user.points;
        (state.user as IUser).role = action.payload.user.role;
        (state.user as IUser).profilePicture =
          action.payload.user.profilePicture;
      } else {
        (state.user as IServiceProvider)._id = action.payload.user._id;
        (state.user as IServiceProvider).name = action.payload.user.name;
        (state.user as IServiceProvider).email = action.payload.user.email;
        (state.user as IServiceProvider).logo = action.payload.user.logo;
        (state.user as IServiceProvider).phoneNumber =
          action.payload.user.phoneNumber;
        (state.user as IServiceProvider).services =
          action.payload.user.services;
        (state.user as IServiceProvider).role = action.payload.user.role;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = {} as IUser | IServiceProvider;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isAuthenticated = false;
        state.token = null;
        state.user = {} as IUser | IServiceProvider;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          const tokenData = jwtDecode<IServiceProvider | IUser>(
            action.payload.token
          );
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.token = action.payload.token;
          // add user state
          if (tokenData.role === "user") {
            state.user!._id = tokenData._id;
            state.user!.email = tokenData.email;
            (state.user as IUser).fullname = tokenData.fullname;
            (state.user as IUser).username = tokenData.username;
            (state.user as IUser).groups = tokenData.groups;
            (state.user as IUser).gender = tokenData.gender;
            (state.user as IUser).phonenumber = tokenData.phonenumber;
            (state.user as IUser).points = tokenData.points;
            (state.user as IUser).role = tokenData.role;
            (state.user as IUser).profilePicture = tokenData.profilePicture;
          } else {
            (state.user as IServiceProvider)._id = tokenData._id;
            (state.user as IServiceProvider).name = tokenData.name;
            (state.user as IServiceProvider).email = tokenData.email;
            (state.user as IServiceProvider).logo = tokenData.logo;
            (state.user as IServiceProvider).phoneNumber =
              tokenData.phoneNumber;
            (state.user as IServiceProvider).services = tokenData.services;
            (state.user as IServiceProvider).role = tokenData.role;
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
        state.isAuthenticated = false;
        state.token = null;
        state.user = {} as IUser | IServiceProvider;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          const tokenData = jwtDecode<IUser>(action.payload.token);
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.token = action.payload.token;
          //  add user state here

          (state.user as IUser)._id = tokenData._id;
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
        state.isAuthenticated = false;
        state.token = null;
        state.user = {} as IUser | IServiceProvider;
      })
      .addCase(
        serviceProviderSignUp.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          const tokenData = jwtDecode<IServiceProvider>(action.payload.token);
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.token = action.payload.token;
          //  add user state here

          (state.user as IServiceProvider)._id = tokenData._id;
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
