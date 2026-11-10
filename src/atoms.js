
import { atom } from 'recoil';

const STORAGE_KEY = 'recoil-todos';

export const todoListState = atom({
  key: 'todoListState',
  default: [],

  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // Відновлення збережених завдань
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
          const todos = JSON.parse(saved);

          if (Array.isArray(todos)) {
            setSelf(todos);
          }
        }
      } catch {
        console.warn('Не вдалося завантажити завдання');
      }

      // Автоматичне збереження змін
      onSet((newTodos) => {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(newTodos)
          );
        } catch {
          console.warn('Не вдалося зберегти завдання');
        }
      });
    }
  ]
});
