
import { selector, selectorFamily } from 'recoil';
import { todoListState } from './atoms.js';

export const incompleteCount = selector({
  key: 'incompleteCount',
  get: ({ get }) => {
    const todos = get(todoListState);
    return todos.filter((todo) => !todo.done).length;
  },
});

export const filteredTodoList = selectorFamily({
  key: 'filteredTodoList',
  get: (filter) => ({ get }) => {
    const todos = get(todoListState);

    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.done);

      case 'completed':
        return todos.filter((todo) => todo.done);

      default:
        return todos;
    }
  },
});
