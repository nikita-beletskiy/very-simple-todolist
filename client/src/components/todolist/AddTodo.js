import { useContext, useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';
import { TodosContext } from '../../contexts/TodosContext';
import useRequest from '../../hooks/useRequest';

const AddTodo = () => {
  const [todo, setTodo] = useState('');
  const { dispatch } = useContext(TodosContext);

  const { request: addTodo, isPending } = useRequest({
    url: '/api/todos',
    method: 'post',
    body: { title: todo },
    onSuccess: newTodo => {
      dispatch({ type: 'ADD_TODO', newTodo });
      setTodo('');
    }
  });

  const handleSubmit = event => {
    event.preventDefault();

    addTodo();
  };

  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='I need to...'
          required
          autoComplete='off'
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
        <button type='submit' disabled={isPending}>
          <RiAddCircleLine size='100%' />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
