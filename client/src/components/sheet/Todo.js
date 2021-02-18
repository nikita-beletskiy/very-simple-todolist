import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import useRequest from '../../hooks/useRequest';
import globalStyles from '../../styles/GlobalStyles.module.css';

const Todo = ({ styles, todo: task }) => {
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
    <div className={styles.todo}>
      <div
        className={`${styles.title} ${task.done && styles.done} ${
          (pendingCheck || pendingDelete) && styles.progress
        }`}
        role='listitem'
        onClick={() => check()}
      >
        {task.title}
        <div className={styles.animbox}>
          {(pendingCheck || pendingDelete) && (
            <div className={globalStyles.divprogress}>
              <div />
              <div />
              <div />
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
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
