export interface Todo {
    _id: number;
    text: string;
    completed: boolean;
}

export interface AuthState {
    token: string | null;
}