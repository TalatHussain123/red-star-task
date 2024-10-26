import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todosSlice.ts';
import { Todo } from '../redux/type.ts';
import { AppDispatch } from '../redux/store';

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const token = localStorage.getItem('token');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text) {
      const newTodo: Todo = {
        _id: Date.now(),
        text,
        completed: false,
      };
      dispatch(addTodoAsync({ todo: newTodo, token }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
