import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import '../../styles/Todos.css';
import Todo from './Todo';

const Todos = () => {
  const { isPending, todos, error } = useContext(TodosContext);

  return (
    <div className='todos-wrapper'>
      <div className='todos'>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {todos.length > 0
          ? todos.map(todo => <Todo key={todo.id} todo={todo} />)
          : !isPending && 'There is no todos. Free time!:)'}
      </div>
    </div>
  );
};

export default Todos;
