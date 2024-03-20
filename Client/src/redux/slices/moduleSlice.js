import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const tokenSetup = () => axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export const createModule = createAsyncThunk('createModule', async (data) => {
  tokenSetup();
  return await axios.post(`/api/module`, data,  { headers: {
              'Content-Type': 'multipart/form-data'
            }})
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const updateModule = createAsyncThunk('updateModule', async (data) => {
  tokenSetup();
  return await axios.put(`/api/module/${data._id}`, data,  { headers: {
              'Content-Type': 'multipart/form-data'
            }})
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const fetchModulesById = createAsyncThunk('fetchModulesById', async (moduleIds) => {
  tokenSetup();
  return await axios.post(`/api/module/modulesById`, moduleIds)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

const moduleSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    error: null,
    selectedModuleSaved: false,
    selectedModule: null,
    modulesById: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createModule.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(createModule.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.selectedModuleSaved = true;
        state.selectedModule = action.payload.module;
      }
      state.isLoading = false;
    })
    builder.addCase(createModule.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
     builder.addCase(updateModule.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(updateModule.fulfilled, (state, action) => {
      console.log(action.payload);
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.selectedModuleSaved = true;
        state.selectedModule = action.payload;
        state.modulesById = state.modulesById?.map(mod => mod._id === action.payload.module._id ? action.payload.module : mod) || [];
      }
      state.isLoading = false;
    })
    builder.addCase(updateModule.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(fetchModulesById.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.modulesById = [...action.payload];
      }
      state.isLoading = false;
    })
  }
});

export default moduleSlice.reducer; 
