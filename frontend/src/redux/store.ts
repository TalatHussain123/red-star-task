import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.ts';
import todosReducer from './todosSlice.ts';

const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
