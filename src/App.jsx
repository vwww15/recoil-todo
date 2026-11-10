
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';

export default function App() {
  return (
    <div className="app">
      <div className="todo-container">
        <header className="app-header">
          <p>REACT + RECOIL</p>
          <h1>Мій список справ</h1>
          <span>Організовуй завдання та відстежуй прогрес</span>
        </header>

        <AddTodo />
        <TodoList />

        <footer className="app-footer">
          Лабораторна робота — Recoil
        </footer>
      </div>
    </div>
  );
}
