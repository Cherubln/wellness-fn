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
  hasScanned?: string[];
}

export interface IServiceProvider {
  _id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  services: string[];
  logo?: string;
  role: "service_provider";
  qrCode: {
    _id: string;
    name: string;
    image: string;
    updatedAt: string;
    owner: string;
  };
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

// Async thunk for Google sign-in
export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/google`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        console.log({ error });

        return rejectWithValue({ message: "An unknown error occurred" });
      }
    }
  }
);

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
// Async thunk for getting a user by ID
export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/${userId}`);
      return response.data;
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

export const scanForPoints = createAsyncThunk(
  "auth/scan",
  async (
    { qrCodeID, userID }: { qrCodeID: string; userID: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/qrcodes/${qrCodeID}?userId=${userID}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "An unknown error occurred" });
      }
    }
  }
);

// Async thunk for creating a QR code
export const createQRCode = createAsyncThunk(
  "auth/createQRCode",
  async (qrCodeData: { name: string; owner: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/qrcodes/create`,
        qrCodeData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "An unknown error occurred" });
      }
    }
  }
);

// Async thunk for updating a QR code
export const updateQRCode = createAsyncThunk(
  "auth/updateQRCode",
  async (
    {
      qrCodeId,
      qrCodeData,
    }: { qrCodeId: string; qrCodeData: { name: string; owner: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/qrcodes/${qrCodeId}`,
        qrCodeData
      );
      return response.data;
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
        user: IUser | IServiceProvider;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      // add user state
      const tokenData = action.payload.user;
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
        (state.user as IServiceProvider).phoneNumber = tokenData.phoneNumber;
        (state.user as IServiceProvider).services = tokenData.services;
        (state.user as IServiceProvider).role = tokenData.role;
        (state.user as IServiceProvider).qrCode = tokenData.qrCode;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.status = "idle";
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
            (state.user as IServiceProvider).qrCode = tokenData.qrCode;
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
      .addCase(googleSignIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        googleSignIn.fulfilled,
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
            (state.user as IServiceProvider).qrCode = tokenData.qrCode;
          }
        }
      )
      .addCase(
        googleSignIn.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = "failed";
          state.error = (action.payload as { message: string }).message;
        }
      )

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
          (state.user as IServiceProvider).qrCode = tokenData.qrCode;
        }
      )
      .addCase(
        serviceProviderSignUp.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = "failed";
          state.error = (action.payload as { message: string }).message;
        }
      )
      // Scan for points
      .addCase(scanForPoints.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        scanForPoints.fulfilled,
        (state, action: PayloadAction<{ points: number }>) => {
          state.status = "succeeded";

          (state.user as IUser).points! += action.payload.points;
        }
      )
      .addCase(scanForPoints.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as { message: string }).message;
      })
      // Get User
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getUserById.fulfilled,
        (state, action: PayloadAction<IUser | IServiceProvider>) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(
        getUserById.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = "failed";
          state.error = (action.payload as { message: string }).message;
        }
      )
      // Create QR Code
      .addCase(createQRCode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createQRCode.fulfilled,
        (
          state,
          action: PayloadAction<{
            _id: string;
            name: string;
            image: string;
            updatedAt: string;
          }>
        ) => {
          state.status = "succeeded";
          // Handle the created QR code data if needed
          (state.user as IServiceProvider).qrCode.image = action.payload.image;
          (state.user as IServiceProvider).qrCode.name = action.payload.name;
          (state.user as IServiceProvider).qrCode.updatedAt =
            action.payload.updatedAt;
          (state.user as IServiceProvider).qrCode._id = action.payload._id;
        }
      )
      .addCase(
        createQRCode.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = "failed";
          state.error = (action.payload as { message: string }).message;
        }
      )
      // Update QR Code
      .addCase(updateQRCode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateQRCode.fulfilled,
        (
          state,
          action: PayloadAction<{
            name: string;
            image: string;
            updatedAt: string;
          }>
        ) => {
          state.status = "succeeded";
          // Handle the updated QR code data if needed
          (state.user as IServiceProvider).qrCode.image = action.payload.image;
          (state.user as IServiceProvider).qrCode.name = action.payload.name;
          (state.user as IServiceProvider).qrCode.updatedAt =
            action.payload.updatedAt;
        }
      )
      .addCase(
        updateQRCode.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = "failed";
          state.error = (action.payload as { message: string }).message;
        }
      );
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
