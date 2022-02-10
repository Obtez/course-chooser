import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  role: 'student',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    }
  }
})

export const { setUser, setRole } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;