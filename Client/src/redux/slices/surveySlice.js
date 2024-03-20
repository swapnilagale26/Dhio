import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const tokenSetup = () => axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export const postSurvey = createAsyncThunk('postSurvey', async (data) => {
  tokenSetup();
  return await axios.post(`/api/survey`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const fetchSurveys = createAsyncThunk('fetchSurveys', async () => {
  tokenSetup();
  return await axios.get(`/api/survey`)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const fetchSurvey = createAsyncThunk('fetchSurvey', async (id) => {
  tokenSetup();
  return await axios.get(`/api/survey/${id}`)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const updateSurvey = createAsyncThunk('updateSurvey', async (data) => {
  tokenSetup();
  return await axios.put(`/api/survey/${data._id}`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const inviteForSurvey = createAsyncThunk('inviteForSurvey', async (data) => {
  tokenSetup();
  return await axios.put(`/api/survey/invite/${data.surveyId}`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});


const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    isLoading: false,
    tnaData: [],
    feedbackData: [],
    isError: false,
    error: null,
    selectedSurvey: null,

  },
  extraReducers: (builder) => {
    builder.addCase(fetchSurveys.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(fetchSurveys.fulfilled, (state, action) => {
      console.log(action.payload);
      const tnaData = Array.isArray(action?.payload) ? action?.payload?.filter(survey => survey.surveyType === 'TNA') : [];
      const feedbackData = Array.isArray(action?.payload) ? action?.payload?.filter(survey => survey.surveyType === 'FEEDBACK') : [];
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.tnaData = tnaData;
        state.feedbackData = feedbackData;
      }
      state.isLoading = false;
    })
    builder.addCase(fetchSurveys.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(postSurvey.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(postSurvey.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
      }
      state.isLoading = false;
    })
    builder.addCase(postSurvey.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(fetchSurvey.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.selectedSurvey = action.payload;
      }
      state.isLoading = false;
    })
    builder.addCase(fetchSurvey.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(fetchSurvey.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(updateSurvey.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(updateSurvey.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.selectedUser = action.payload;
      }
      state.isLoading = false;
    })
    builder.addCase(updateSurvey.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(inviteForSurvey.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(inviteForSurvey.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
      }
      state.isLoading = false;
    })
    builder.addCase(inviteForSurvey.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
  }
});

export default surveySlice.reducer; 
