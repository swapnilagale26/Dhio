import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const tokenSetup = () => axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export const fetchTenancy = createAsyncThunk('fetchTenancy', async (tenancyId) => {
  tokenSetup();
  return await await axios.get(`/api/tenancy/${tenancyId}`)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const fetchTenancies = createAsyncThunk('fetchTenancies', async () => {
  tokenSetup();
  return await await axios.get(`/api/tenancy`)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});


// to save new tency in database
export const postTenancy = createAsyncThunk('postTenancy', async (data) => {
  tokenSetup();
  return await axios.post(`/api/tenancy`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const deleteTenancyCall = createAsyncThunk('deleteTenancy', async (tenancyId) => {
  tokenSetup();
  return await axios.delete(`/api/tenancy/${tenancyId}`)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});


// update the tency
export const updateTenancy = createAsyncThunk('updateTenancy', async (data) => {
  tokenSetup();
  return await axios.put(`/api/tenancy/${data._id}`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const bulkDeleteTenancies = createAsyncThunk('bulkDeleteTenancies', async (data) => {
  tokenSetup();
  return await axios.post(`/api/tenancy/bulk-delete`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const bulkUpdateTenancies = createAsyncThunk('bulkUpdateTenancies', async (data) => {
  tokenSetup();
  return await axios.post(`/api/tenancy/bulk-update`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const deselectTenancy = createAsyncThunk('deselectTenancy', () => null)

const tenancySlice = createSlice({
  name: 'tenancy',
  initialState: {
   isLoading: false,
   data: [],
   isError: false,
   error: null,
   selectedTenancy: null
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTenancies.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(fetchTenancies.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.data = action.payload;
      }
      state.isLoading = false;
    })
    builder.addCase(fetchTenancies.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(postTenancy.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(postTenancy.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.data = [...state.data];
      }
      state.isLoading = false;
    })
    builder.addCase(postTenancy.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(deleteTenancyCall.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(deleteTenancyCall.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.selectedTenancy = null;
      }
      state.isLoading = false;
    })
    builder.addCase(deleteTenancyCall.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(fetchTenancy.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(fetchTenancy.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.selectedTenancy = action.payload;
      }
      state.isLoading = false;
    })
    builder.addCase(fetchTenancy.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(updateTenancy.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(updateTenancy.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.selectedTenancy = action.payload;
      }
      state.isLoading = false;
    })
    builder.addCase(updateTenancy.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(bulkUpdateTenancies.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(bulkUpdateTenancies.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
      }
      state.isLoading = false;
    })
    builder.addCase(bulkUpdateTenancies.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(bulkDeleteTenancies.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(bulkDeleteTenancies.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
      }
      state.isLoading = false;
    })
    builder.addCase(bulkDeleteTenancies.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(deselectTenancy.fulfilled, (state, action) => {
      state.selectedTenancy = null;
    })
    builder.addCase(deselectTenancy.rejected, (state, action) => {
      state.selectedTenancy = null;
    })
  }
});

export default tenancySlice.reducer; 