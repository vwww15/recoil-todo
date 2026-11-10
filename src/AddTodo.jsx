
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from './atoms.js';

export default function AddTodo() {
  const [text, setText] = useState('');
  const setTodos = useSetRecoilState(todoListState);

  function addTodo(event) {
    event.preventDefault();

    const title = text.trim();
    if (!title) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: title,
      done: false
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setText('');
  }

  return (
    <form onSubmit={addTodo} className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Введіть нове завдання..."
        aria-label="Нове завдання"
      />

      <button type="submit">
        + Додати
      </button>
    </form>
  );
}
