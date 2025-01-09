import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Service {
  _id: string;
  activityName: string;
  availability: string;
  description: string;
  location: string;
  phoneContact: string;
  category: string;
  provider: string;
}

interface ServiceState {
  services: Service[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  status: "idle",
  error: null,
};

// Thunks for each async operation
export const fetchServices = createAsyncThunk("services/fetchAll", async () => {
  const response = await axios.get("http://localhost:5000/api/services");
  return response.data as Service[];
});

export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async (serviceId: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/services/${serviceId}`
    );
    return response.data as Service;
  }
);

export const createService = createAsyncThunk(
  "services/create",
  async (service: Omit<Service, "_id">) => {
    const response = await axios.post(
      "http://localhost:5000/api/services",
      service
    );
    return response.data as Service;
  }
);

export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, service }: { id: string; service: Partial<Service> }) => {
    const response = await axios.put(
      `http://localhost:5000/api/services/${id}`,
      service
    );
    return response.data as Service;
  }
);

export const deleteService = createAsyncThunk(
  "services/delete",
  async (serviceId: string) => {
    await axios.delete(`http://localhost:5000/api/services/${serviceId}`);
    return serviceId;
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch services";
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        );
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch service";
      })
      .addCase(createService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create service";
      })
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update service";
      })
      .addCase(deleteService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete service";
      });
  },
});

export default serviceSlice.reducer;
