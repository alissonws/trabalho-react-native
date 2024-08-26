import { AvailableTime } from '@/types/availableTime';
import { Sport } from '@/types/sport';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the TS type for the user slice's state
export interface UserState {
  name: string;
  sports: Sport[];
  availableTimes: AvailableTime[];
}

// Define the initial value for the slice state
const initialState: UserState = {
  name: '',
  sports: [],
  availableTimes: [],
};

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addSport: (state, action: PayloadAction<Sport>) => {
      const sportAlreadyExists = state.sports.filter(
        (sport) => sport.id === action.payload.id
      );

      if (sportAlreadyExists.length === 0) state.sports.push(action.payload);
    },
    removeSport: (state, action: PayloadAction<Sport>) => {
      state.sports = state.sports.filter(
        (sport) => sport.id !== action.payload.id
      );
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addAvailableTime: (state, action: PayloadAction<AvailableTime>) => {
      const newAvailableTimeConcat = [
        action.payload.weekDay,
        action.payload.fromHour,
        action.payload.toHour,
      ].concat();

      const timeAlreadyExists = state.availableTimes.filter(
        (availableTime) =>
          newAvailableTimeConcat ===
          [
            availableTime.weekDay,
            availableTime.fromHour,
            availableTime.toHour,
          ].concat()
      );

      if (!timeAlreadyExists) state.availableTimes.push(action.payload);
    },
    removeAvailableTime: (state, action: PayloadAction<AvailableTime>) => {
      const concatToExclude = [
        action.payload.weekDay,
        action.payload.fromHour,
        action.payload.toHour,
      ].concat();

      state.availableTimes = state.availableTimes.filter(
        (availableTime) =>
          concatToExclude !==
          [
            availableTime.weekDay,
            availableTime.fromHour,
            availableTime.toHour,
          ].concat()
      );
    },
  },
  selectors: {
    selectAvailableTimes: (userState) => userState.availableTimes,
    selectSports: (userState) => userState.sports,
  },
});

// Export the generated action creators for use in components
export const { addSport, removeSport, addAvailableTime, removeAvailableTime } =
  userSlice.actions;

// export const selectAvailableTimes = (state: RootState) =>
//   state.user.availableTimes;
// export const selectSports = (state: RootState) => state.user.sports;

// Export the slice reducer for use in the store configuration
export default userSlice.reducer;

export const selectSports = userSlice.selectors.selectSports;
export const selectAvailableTimes = userSlice.selectors.selectAvailableTimes;
