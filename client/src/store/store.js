import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/reducers.js';

export const store = configureStore({
  reducer: authReducer
})