import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tokenSetup = () => (axios.defaults.headers.common["Authorization"] = localStorage.getItem("token"));

export const postCourse = createAsyncThunk("postCourse", async (data) => {
  tokenSetup();
  return await axios
    .post(`/api/courses`, data)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const fetchCourses = createAsyncThunk("fetchCourses", async () => {
  tokenSetup();
  return await axios
    .get(`/api/courses`)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const deleteCourses = createAsyncThunk("deleteCourses", async (data) => {
  tokenSetup();
  return await axios
    .post(`/api/courses/delete`, data)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const updateCourse = createAsyncThunk("updateCourse", async (data) => {
  tokenSetup();
  return await axios
    .put(`/api/courses/${data._id}`, data)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const fetchCourse = createAsyncThunk("fetchCourse", async (courseId) => {
  tokenSetup();
  return await axios
    .get(`/api/courses/${courseId}`)
    .then((res) => res.data)
    .catch((err) => err?.response?.data);
});

export const deselectCourse = createAsyncThunk("deselectCourse", () => null);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    error: null,
    selectedCourse: null,
    postCourseResponse: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.data = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(postCourse.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postCourse.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.selectedCourse = action.payload.course;
        state.postCourseResponse = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(postCourse.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deleteCourses.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteCourses.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.selectedCourse = null;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteCourses.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(fetchCourse.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.selectedCourse = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchCourse.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(updateCourse.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.errors;
      } else {
        state.isError = false;
        state.selectedCourse = action.payload.course;
      }
      state.isLoading = false;
    });
    builder.addCase(updateCourse.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deselectCourse.fulfilled, (state, action) => {
      state.selectedCourse = null;
    });
    builder.addCase(deselectCourse.rejected, (state, action) => {
      state.selectedCourse = null;
    });
  },
});

export default courseSlice.reducer;
