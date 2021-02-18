import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import useRequest from '../../hooks/useRequest';

const Todo = ({ todo: task }) => {
  const { deleteFromTodolist, checkTodo } = useContext(TodosContext);

  const { request: deleteTodo, isPending: pendingDelete } = useRequest({
    url: `/api/todos/${task.id}`,
    method: 'delete',
    onSuccess: ({ deletedId }) => deleteFromTodolist(deletedId)
  });

  const { request: check, isPending: pendingCheck } = useRequest({
    url: `/api/todos/${task.id}`,
    method: 'patch',
    onSuccess: ({ checkedId }) => checkTodo(checkedId)
  });

  return (
    <div className='todo'>
      <div
        className={`title ${task.done ? 'done' : ''} ${
          pendingCheck || pendingDelete ? 'progress' : ''
        }`}
        role='listitem'
        onClick={() => check()}
      >
        {task.title}
      </div>
      <div className='buttons'>
        <button
          type='button'
          onClick={() => deleteTodo()}
          disabled={pendingDelete}
        >
          del
        </button>
      </div>
    </div>
  );
};

export default Todo;
