import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import Todo from './Todo';
import LoadingSpinner from '../LoadingSpinner';

const Todos = () => {
  const { isPending, todos } = useContext(TodosContext);

  return (
    <div className='todos'>
      {isPending && <LoadingSpinner size='4rem' />}
      {todos.length > 0
        ? todos.map(todo => <Todo key={todo.id} todo={todo} />)
        : !isPending && <p>There is nothing to do. Free time!:)</p>}
    </div>
  );
};

export default Todos;
