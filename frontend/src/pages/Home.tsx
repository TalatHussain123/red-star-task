import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from '../components/TodoForm.tsx';
import TodoItem from '../components/TodoItem.tsx';
import { Todo } from '../redux/type';
import { AppDispatch } from '../redux/store.ts';
import { fetchTodos } from '../redux/todosSlice.ts';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: { todos: { todos: Todo[] } }) => state.todos.todos);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserTodos = async () => {
      if (token) {
        dispatch(fetchTodos(token));
      }
    };

    fetchUserTodos();
  }, [token, dispatch]);

  return (
    <div className="home-container">
      <h1>Your Todos</h1>
      <div className="todo-form-container">
        <TodoForm />
      </div>
      <div className="todo-items">
        {todos.map((todo: Todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
