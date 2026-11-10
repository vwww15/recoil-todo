
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState } from './atoms.js';
import { incompleteCount, filteredTodoList } from './selectors.js';

export default function TodoList() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [filter, setFilter] = useState('all');

  const remaining = useRecoilValue(incompleteCount);
  const visibleTodos = useRecoilValue(filteredTodoList(filter));

  const completedCount = todos.filter((todo) => todo.done).length;

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  }

  function removeTodo(id) {
    setTodos((current) =>
      current.filter((todo) => todo.id !== id)
    );
  }

  function clearCompleted() {
    setTodos((current) =>
      current.filter((todo) => !todo.done)
    );
  }

  return (
    <section className="todo-list">
      <h2>Мої завдання</h2>

      <p className="todo-counter">
        Залишилось виконати: <strong>{remaining}</strong>
      </p>

      <div className="todo-filters">
        <button
          type="button"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Всі
        </button>

        <button
          type="button"
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Активні
        </button>

        <button
          type="button"
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Виконані
        </button>
      </div>

      {visibleTodos.length === 0 ? (
        <p className="empty-message">
          {todos.length === 0
            ? 'Список порожній. Додайте перше завдання!'
            : 'У цій категорії немає завдань.'}
        </p>
      ) : (
        <ul>
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.done ? 'completed' : ''}>
                  {todo.text}
                </span>
              </label>

              <button
                type="button"
                className="delete-button"
                onClick={() => removeTodo(todo.id)}
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="todo-actions">
        <span>Виконано: {completedCount}</span>

        <button
          type="button"
          className="clear-button"
          onClick={clearCompleted}
          disabled={completedCount === 0}
        >
          Очистити виконані
        </button>
      </div>
    </section>
  );
}
