import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tokenSetup = () => (axios.defaults.headers.common["Authorization"] = localStorage.getItem("token"));
export const fetchUser = createAsyncThunk("fetchUser", async (userId) => {
  tokenSetup();
  return await axios
    .get(`/api/user/${userId}`)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const fetchProfile = createAsyncThunk("fetchProfile", async (token) => {
  tokenSetup();
  return await axios
    .get(`/api/user/getProfile${token ? `/${token}` : ""}`)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  tokenSetup();
  return await axios
    .get(`/api/user`)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const fetchUsersByRole = createAsyncThunk("fetchUsersByRole", async (role) => {
  tokenSetup();
  return await axios
    .post(`/api/user/usersByRole`, { role })
    .then((res) => ({ [role]: res.data }))
    .catch((err) => err?.response?.data);
});

export const postUser = createAsyncThunk("postUser", async (data) => {
  tokenSetup();
  return await axios
    .post(`/api/user`, data)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const deleteUserCall = createAsyncThunk("deleteUserCall", async (userId) => {
  tokenSetup();
  return await axios
    .delete(`/api/user/${userId}`)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const updateUser = createAsyncThunk("updateUser", async (data) => {
  tokenSetup();
  return await axios
    .put(`/api/user/${data._id}`, data)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const bulkDeleteUsers = createAsyncThunk("bulkDeleteUsers", async (data) => {
  tokenSetup();
  return await axios
    .post(`/api/user/bulk-delete`, data)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const bulkUpdateUsers = createAsyncThunk("bulkUpdateUsers", async (data) => {
  tokenSetup();
  return await axios
    .post(`/api/user/bulk-update`, data)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const deselectUser = createAsyncThunk("deselectUser", () => null);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    error: null,
    selectedUser: null,
    byRole: null,
  },
  reducers: {
    initStateUser: (state) => {
      state.isLoading = false;
      state.data = [];
      state.isError = false;
      state.error = null;
      state.selectedUser = null;
      state.byRole = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.data = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(postUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.data = [...state.data];
      }
      state.isLoading = false;
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deleteUserCall.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteUserCall.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.selectedUser = null;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteUserCall.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.selectedUser = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.currentUser = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.selectedUser = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deselectUser.fulfilled, (state, action) => {
      state.selectedUser = null;
    });
    builder.addCase(deselectUser.rejected, (state, action) => {
      state.selectedUser = null;
    });
    builder.addCase(fetchUsersByRole.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchUsersByRole.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.byRole = { ...action.payload };
      }
      state.isLoading = false;
    });
    builder.addCase(fetchUsersByRole.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
export const { initStateUser } = userSlice.actions;
