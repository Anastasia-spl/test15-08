import { configureStore } from '@reduxjs/toolkit';
import { tableReducer } from './table';

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export { store };
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;