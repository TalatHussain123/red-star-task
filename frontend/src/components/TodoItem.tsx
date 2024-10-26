import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, toggleTodo, editTodoAsync } from '../redux/todosSlice.ts';
import { AppDispatch } from '../redux/store.ts';

const TodoItem = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.text);
    const dispatch: AppDispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(todo.id));
    };

    const handleEdit = () => {
        if (updatedText.trim()) {
            const updatedTodo = { ...todo, text: updatedText };
            const token = localStorage.getItem('token');
            dispatch(editTodoAsync({ todo: updatedTodo, token }));
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        dispatch(deleteTodoAsync({ id: todo._id, token }));
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <button onClick={handleEdit}>Save</button>
                </>
            ) : (
                <>
                    <span onClick={handleToggle}>{todo.text}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;
