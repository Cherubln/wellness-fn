import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "./authSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Group {
  _id: string;
  groupName: string;
  members: IUser[];
  admin: string;
}

interface GroupState {
  groups: Group[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  status: "idle",
  error: null,
};

// Thunks for each async operation
export const fetchGroups = createAsyncThunk(
  "groups/fetchAll",
  async (userId?: string) => {
    const response = await axios.get(
      `${apiUrl}/api/groups${userId ? `?user=${userId}` : ""}`
    );
    return response.data as Group[];
  }
);

export const fetchGroupById = createAsyncThunk(
  "groups/fetchById",
  async (groupId: string) => {
    const response = await axios.get(`${apiUrl}/api/groups/${groupId}`);
    return response.data as Group;
  }
);

export const createGroup = createAsyncThunk(
  "groups/create",
  async (group: { admin: string; members: string[]; groupName: string }) => {
    const response = await axios.post(`${apiUrl}/api/groups`, group);
    return response.data as Group[];
  }
);

export const updateGroup = createAsyncThunk(
  "groups/update",
  async ({ id, group }: { id: string; group: Partial<Group> }) => {
    const response = await axios.put(`${apiUrl}/api/groups/${id}`, group);
    return response.data as Group;
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/delete",
  async (groupId: string) => {
    await axios.delete(`${apiUrl}/api/groups/${groupId}`);
    return groupId;
  }
);

export const addMember = createAsyncThunk(
  "groups/addMember",
  async ({ groupId, memberId }: { groupId: string; memberId: string }) => {
    const response = await axios.put(
      `${apiUrl}/api/groups/${groupId}/add-member`,
      { memberId }
    );
    return response.data as Group;
  }
);

export const removeMember = createAsyncThunk(
  "groups/removeMember",
  async ({ groupId, memberId }: { groupId: string; memberId: string }) => {
    const response = await axios.put(
      `${apiUrl}/api/groups/${groupId}/remove-member`,
      { memberId }
    );
    return response.data as Group;
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch groups";
      })
      .addCase(fetchGroupById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = state.groups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        );
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch group";
      })
      .addCase(createGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create group";
      })
      .addCase(updateGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = state.groups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        );
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update group";
      })
      .addCase(deleteGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = state.groups.filter(
          (group) => group._id !== action.payload
        );
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete group";
      })
      .addCase(addMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = state.groups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        );
      })
      .addCase(addMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add member";
      })
      .addCase(removeMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = state.groups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        );
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to remove member";
      });
  },
});

export default groupSlice.reducer;
