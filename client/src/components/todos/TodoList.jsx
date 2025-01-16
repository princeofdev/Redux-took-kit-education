// src/components/todos/TodoList.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../features/todos/todoService';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const queryClient = useQueryClient();

  // Query for getting todos
  const { 
    data: todos = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getTodos
  });

  // Mutation for adding todo
  const addTodoMutation = useMutation({
    mutationFn: (text) => todoService.addTodo(text),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      setNewTodo('');
    }
  });

  // Mutation for toggling todo
  const toggleTodoMutation = useMutation({
    mutationFn: (id) => todoService.toggleTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  // Mutation for deleting todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodoMutation.mutate(newTodo.trim());
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error.message}</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Add new todo"
        />
        <button
          type="submit"
          disabled={addTodoMutation.isPending}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {addTodoMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between gap-2 p-2 border rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoMutation.mutate(todo.id)}
                disabled={toggleTodoMutation.isPending}
                className="form-checkbox h-5 w-5"
              />
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodoMutation.mutate(todo.id)}
              disabled={deleteTodoMutation.isPending}
              className="px-2 py-1 text-red-500 hover:bg-red-100 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;