import { ServiceType, sessionType } from "@/app/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export interface Service {
//   _id: string;
//   activityName: string;
//   availability: string;
//   description: string;
//   location: string[];
//   phoneContact: string;
//   category: string;
//   provider: {
//     _id: string;
//     name: string;
//     whatsappLink?: string;
//     instagramLink?: string;
//   };
//   images: string[]; // Added images field
//   price?: number;
// }

interface ServiceState {
  services: ServiceType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  status: "idle",
  error: null,
};

// Thunks for each async operation
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (providerId?: string) => {
    const url = providerId
      ? `${apiUrl}/api/services?provider=${providerId}`
      : `${apiUrl}/api/services`;
    const response = await axios.get(url);
    return response.data as ServiceType[];
  }
);

export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async (serviceId: string) => {
    const response = await axios.get(`${apiUrl}/api/services/${serviceId}`);
    return response.data as ServiceType;
  }
);

export const createService = createAsyncThunk(
  "services/create",
  async (service: {
    activityName: string;
    category: string;
    description?: string;
    images?: string[]; // Added images field
    price?: number;
    priceType: string;
    additionalInfo: string;
    location: string[];
    address: string;
    provider: string;
    sessionData: sessionType;
  }) => {
    const response = await axios.post(`${apiUrl}/api/services`, service);
    return response.data as ServiceType;
  }
);

export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, service }: { id: string; service: Partial<ServiceType> }) => {
    const response = await axios.put(`${apiUrl}/api/services/${id}`, service);
    return response.data as ServiceType;
  }
);

export const deleteService = createAsyncThunk(
  "services/delete",
  async (serviceId: string) => {
    await axios.delete(`${apiUrl}/api/services/${serviceId}`);
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
