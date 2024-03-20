import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import moduleReducer from './slices/moduleSlice';
import surveyReportsReducer from './slices/surveyReportsSlice';
import surveyReducer from './slices/surveySlice';
import tenancyReducer from './slices/tenancySlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    tenancyReducer,
    userReducer,
    courseReducer,
    moduleReducer,
    surveyReducer,
    surveyReportsReducer
  },
})