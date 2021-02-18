import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import Todo from './Todo';
import styles from '../../styles/Todos.module.css';
import globalStyles from '../../styles/GlobalStyles.module.css';

const Todos = () => {
  const { isPending, todos, error } = useContext(TodosContext);

  return (
    <div>
      <div className={styles.todos}>
        {isPending && (
          <div className={globalStyles.divprogress}>
            <div />
            <div />
            <div />
          </div>
        )}
        {error && <div>{error}</div>}
        {todos.length > 0
          ? todos.map(todo => (
              <Todo styles={styles} key={todo.id} todo={todo} />
            ))
          : !isPending && 'There is no todos. Free time!:)'}
      </div>
    </div>
  );
};

export default Todos;
