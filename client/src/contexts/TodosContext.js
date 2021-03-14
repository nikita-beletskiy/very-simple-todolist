import { createContext, useState } from 'react';
import useRequest from '../hooks/useRequest';

export const TodosContext = createContext();

const TodosContextProvider = props => {
  const [todos, setTodos] = useState([]);

  const { isPending } = useRequest({
    url: '/api/todos',
    withEffect: true,
    onSuccess: data => setTodos(data)
  });

  const addNewTodo = todo => setTodos([...todos, todo]);

  const deleteFromTodolist = id =>
    setTodos(todos.filter(todo => todo.id !== id));

  const checkTodo = id =>
    setTodos(
      todos.map(todo =>
        todo.id === id ? (todo = { ...todo, done: !todo.done }) : todo
      )
    );

  return (
    <TodosContext.Provider
      value={{
        isPending,
        todos,
        addNewTodo,
        deleteFromTodolist,
        checkTodo
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
