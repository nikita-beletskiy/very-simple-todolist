import { useContext } from 'react';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxBlankCircleFill,
  RiCloseCircleFill
} from 'react-icons/ri';
import { TodosContext } from '../../contexts/TodosContext';
import useRequest from '../../hooks/useRequest';

const Todo = ({ todo: task }) => {
  const { dispatch } = useContext(TodosContext);

  const { request: deleteTodo, isPending: pendingDelete } = useRequest({
    url: `/api/todos/${task.id}`,
    method: 'delete',
    onSuccess: ({ deletedId }) =>
      dispatch({ type: 'DELETE_TODO', id: deletedId })
  });

  const { request: check, isPending: pendingCheck } = useRequest({
    url: `/api/todos/${task.id}`,
    method: 'patch',
    onSuccess: ({ checkedId }) =>
      dispatch({ type: 'CHECK_TODO', id: checkedId })
  });

  return (
    <div
      className={`todo ${(pendingCheck || pendingDelete) && 'progress'} ${
        task.done && 'done'
      }`}
    >
      <div className='title' role='listitem' onClick={() => check()}>
        {task.title}
      </div>

      <div className='buttons'>
        <button
          className='check'
          type='button'
          onClick={() => check()}
          disabled={pendingDelete}
        >
          <RiCheckboxBlankCircleFill size='100%' />
          <RiCheckboxBlankCircleLine size='100%' />
        </button>
        <button
          className='trash'
          type='button'
          onClick={() => deleteTodo()}
          disabled={pendingDelete}
        >
          <RiCloseCircleFill size='100%' />
        </button>
      </div>
    </div>
  );
};

export default Todo;
