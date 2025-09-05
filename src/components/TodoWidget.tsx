import React, { useState } from 'react';
import { Widget } from './Widget';

interface TodoWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoWidget: React.FC<TodoWidgetProps> = ({ title, onRemove, number }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Review dashboard metrics', completed: false },
    { id: 2, text: 'Update user documentation', completed: true },
    { id: 3, text: 'Plan team meeting', completed: false },
    { id: 4, text: 'Analyze performance data', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <form onSubmit={addTodo} style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
      </form>
      
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, maxHeight: '180px' }}>
        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ accentColor: '#667eea' }}
            />
            <span
              style={{
                flex: 1,
                fontSize: '14px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : '#333',
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#999',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
      </div>
    </Widget>
  );
};
