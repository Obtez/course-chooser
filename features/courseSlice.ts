import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { CourseType as CourseState } from "../components/Form/CourseForm";

const initialState: CourseState[] = []

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseState[]>) => {
      state = action.payload;
    }
  }
})

export const { setCourses } = courseSlice.actions;
export const selectCourses = (state: RootState) => state.user;
export default courseSlice.reducer;