import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const tokenSetup = () => axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export const fetchSurveyReports = createAsyncThunk('fetchSurveyReports', async (surveyIds) => {
  tokenSetup();
  return await axios.post(`/api/surveyReports`, surveyIds)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});

export const postSurveyReport = createAsyncThunk('postSurveyReport', async (data) => {
  tokenSetup();
  return await axios.post(`/api/surveyReports/save`, data)
    .then((res) => res.data)
    .catch(err => err?.response?.data);
});


const surveyReportsSlice = createSlice({
  name: 'surveyReports',
  initialState: {
    isLoading: false,
    reports: [],
    isError: false,
    error: null,
    selectedSurvey: null,

  },
  extraReducers: (builder) => {
    builder.addCase(fetchSurveyReports.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(fetchSurveyReports.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
        state.reports = action.payload;
      }
      state.isLoading = false;
    })
    builder.addCase(fetchSurveyReports.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
    builder.addCase(postSurveyReport.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    builder.addCase(postSurveyReport.fulfilled, (state, action) => {
      if(action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors; 
      } else {
        state.isError = false;
      }
      state.isLoading = false;
    })
    builder.addCase(postSurveyReport.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    })
  }
});

export default surveyReportsSlice.reducer; 
