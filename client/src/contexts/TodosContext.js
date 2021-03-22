import { createContext, useReducer } from 'react';
import useRequest from '../hooks/useRequest';

export const TodosContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INITIAL':
      return [...action.data];
    case 'ADD_TODO':
      return [...state, action.newTodo];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'CHECK_TODO':
      return state.map(todo =>
        todo.id === action.id ? (todo = { ...todo, done: !todo.done }) : todo
      );
    default:
      return state;
  }
};

const TodosContextProvider = props => {
  const [todos, dispatch] = useReducer(reducer, []);

  const { isPending } = useRequest({
    url: '/api/todos',
    withEffect: true,
    onSuccess: data => dispatch({ type: 'SET_INITIAL', data })
  });

  return (
    <TodosContext.Provider
      value={{
        isPending,
        todos,
        dispatch
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
