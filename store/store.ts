import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/userSlice';
import courseReducer from 'features/courseSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;