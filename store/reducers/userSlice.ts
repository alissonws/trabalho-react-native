import { AvailableTime } from '@/types/availableTime';
import { Sport } from '@/types/sport';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the TS type for the user slice's state
export interface UserState {
  personalInfo: {
    name: string;
  };
  auth: {
    jwt: string;
  };
  sports: Sport[];
  availableTimes: AvailableTime[];
}

// Define the initial value for the slice state
const initialState: UserState = {
  personalInfo: {
    name: '',
  },
  auth: {
    jwt: '',
  },
  sports: [],
  availableTimes: [],
};

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const userSlice = createSlice({
  name: 'user',
  initialState,
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
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.auth.jwt = action.payload;
    },
    clearAuth: (state) => {
      state.auth.jwt = '';
    },
  },
  selectors: {
    selectAvailableTimes: (userState) => userState.availableTimes,
    selectSports: (userState) => userState.sports,
    selectJwtToken: (userState) => userState.auth.jwt,
    selectIsLoggedIn: (userState) => !!userState.auth.jwt,
  },
});

export const { 
  addSport, 
  removeSport, 
  addAvailableTime, 
  removeAvailableTime,
  setJwtToken,
  clearAuth
} = userSlice.actions;

export default userSlice.reducer;

export const selectSports = userSlice.selectors.selectSports;
export const selectAvailableTimes = userSlice.selectors.selectAvailableTimes;
export const selectJwtToken = userSlice.selectors.selectJwtToken;
export const selectIsLoggedIn = userSlice.selectors.selectIsLoggedIn;

import { API_URL } from '@/config';

// API calls using createAsyncThunk with native fetch
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { username: string; email: string; password: string }, { dispatch }) => {
    const response = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    dispatch(setJwtToken(data.jwt));
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { identifier: string; password: string }, { dispatch }) => {
    console.log('sending request')
    const response = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    console.log('data', data)
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    dispatch(setJwtToken(data.jwt));
    return data;
  }
);
