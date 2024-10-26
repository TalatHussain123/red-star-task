import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './type.ts';
import api from '../services/api.ts';

interface TodosState {
    todos: Todo[];
}

const initialState: TodosState = {
    todos: [],
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (token: string) => {
    const response = await api.get('/todos', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as Todo[];
});

export const addTodoAsync = createAsyncThunk(
    'todos/addTodo',
    async ({ todo, token }: { todo: Todo; token: string | null }, { rejectWithValue }) => {
        if (!token) {
            return rejectWithValue('No token provided');
        }

        try {
            const response = await api.post('/todos', todo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error adding todo");
        }
    }
);

export const editTodoAsync = createAsyncThunk(
    'todos/editTodo',
    async ({ todo, token }: { todo: Todo; token: string | null }, { rejectWithValue }) => {
        if (!token) {
            return rejectWithValue('No token provided');
        }

        try {
            const response = await api.put(`/todos/${todo._id}`, todo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error updating todo");
        }
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async ({ id, token }: { id: number; token: string | null }, { rejectWithValue }) => {
        if (!token) {
            return rejectWithValue('No token provided');
        }

        try {
            await api.delete(`/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error deleting todo");
        }
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        toggleTodo: (state, action: PayloadAction<number>) => {
            const index = state.todos.findIndex(todo => todo._id === action.payload);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.todos = action.payload;
            })
            .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
            .addCase(editTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.todos.findIndex(todo => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<number>) => {
                state.todos = state.todos.filter(todo => todo._id !== action.payload);
            });
    },
});

export const { toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;

